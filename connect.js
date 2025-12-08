require("dotenv").config();
const { Client } = require("pg");

const client = new Client({
  user: process.env.PG_USER,
  host: process.env.PG_HOST,
  database: process.env.PG_DATABASE,
  password: process.env.PG_PASSWORD,
  port: process.env.PG_PORT,
  ssl: {
    rejectUnauthorized: false
  }
});

client.connect()
  .then(() => console.log("connected to pg"))
  .catch((err) => console.log("can't connect to pg" + err));

module.exports = { client };
