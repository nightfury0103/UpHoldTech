const { Pool } = require("pg");
const axios = require("axios");

const pool = new Pool({
  user: "postgres",
  host: "localhost",
  password: "postgres",
  database: "postgres",
  port: "5432",
});

const getPrice = (req, res) => {
  const pair = req.query.pair;
  axios
    .get(`https://api.uphold.com/v0/ticker/${pair}`)
    .then((data) => {
      res.send(JSON.stringify(data.data));
    })
    .catch((error) => {
      console.log(error.message);
    });
};

const getAssets = (req, res) => {
  axios
    .get(`https://api.uphold.com/v0/assets`)
    .then((data) => {
      const coins = [];
      for (let coin of data.data) {
        coins.push(coin.code);
      }
      res.send(coins);
    })
    .catch((error) => {
      console.log(error.message);
    });
};

const createAlertInfo = async (req, res) => {
  try {
    const { timestamp, time, diffRate, curRate, pair, interval, pop } =
      req.body;
    const response = await pool.query(
      "INSERT INTO alerts (timestamp, time, diffrate, currate, pair, interval, pop) VALUES ($1, $2, $3, $4, $5, $6, $7)",
      [timestamp, time, diffRate, curRate, pair, interval, pop]
    );

    res.json({
      message: "A alert info was created",
      body: {
        alert: { timestamp, time, diffrate, currate, pair, interval, pop },
      },
    });
  } catch (err) {
    res.json(err);
  }
};

module.exports = {
  getPrice,
  getAssets,
  createAlertInfo,
};
