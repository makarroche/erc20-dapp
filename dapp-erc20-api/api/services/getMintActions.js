const pool = require("../config").pool;

const readMintActions = (request, response) => {
  pool.query(
    `SELECT * FROM mintactions ORDER BY timeofEntry DESC
  LIMIT 10;`,
    (error, results) => {
      if (error) {
        console.log(error);
        throw error;
      }
      response.status(200).send(results);
    }
  );
 
};

module.exports = {
  readMintActions,
};
