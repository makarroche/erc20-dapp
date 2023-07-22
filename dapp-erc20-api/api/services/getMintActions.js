const pool = require('../config').pool;

const readMintActions = (request, response) => {
  pool.query(`SELECT * FROM mintactions ORDER BY timestamp DESC
  LIMIT 10;`, (error, results) => {
    if (error) {
        response.status(400).send('Bad request');
    }
    if (results == null) {
        response.status(404).send("No rows yet");
    }
    else {
        response.status(200).send(results);
    }
  })
}

module.exports = {
    readMintActions
}
