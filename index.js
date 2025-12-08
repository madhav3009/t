const express = require('express');
const app = express();
const PORT = process.env.PORT || 3000;
const {client} = require('./connect.js')

app.use(express.json());


app.get('/posts', async (req, res) => {
  try {
    // Simple query to check DB connection
    const { rows: posts } = await client.query("SELECT * FROM posts");

    res.status(200).json({
      status: 'ok',
      db: 'connected',
      timestamp: new Date().toISOString(),
      posts
    });
  } catch (error) {
    console.error("DB health check failed:", error.message);

    res.status(500).json({
      status: 'error',
      db: 'disconnected',
      error: error.message,
      timestamp: new Date().toISOString()
    });
  }
});



app.use(express.json()); // Make sure body parser is enabled

app.post('/posts', async (req, res) => {
  try {
    const { name, age } = req.body;

    const result = await client.query(
      "INSERT INTO posts(name, age) VALUES($1, $2) RETURNING *",
      [name, age]
    );

    res.status(201).json({
      status: 'ok',
      db: 'connected',
      timestamp: new Date().toISOString(),
      post: result.rows[0]
    });
  } catch (error) {
    console.error("DB query failed:", error.message);

    res.status(500).json({
      status: 'error',
      db: 'disconnected',
      error: error.message,
      timestamp: new Date().toISOString()
    });
  }
});



// Start server
app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
