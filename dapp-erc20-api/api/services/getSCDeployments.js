const pool = require('../config').pool;

const readContractDeployments = (request, response) => {
  pool.query(`SELECT * FROM contractdeployments ORDER BY timestamp DESC
  LIMIT 10;`, (error, results) => {
    if (error) {
        response.status(400).send(error);
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
    readContractDeployments
}
