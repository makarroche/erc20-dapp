const pool = require('../config').pool;

const writeBurnActions = (request, response) => {
  const {transactionHash , amount, explorerURL, timestamp} = request.body;
  pool.query(`INSERT INTO burnactions (transactionHash, amount, explorerURL,timeofEntry) VALUES ('${transactionHash}', ${amount},'${explorerURL}',${timestamp});`, (error, results) => {
    if (error) {
      console.log(error);
      //throw error; 
  }
  })
  response.status(200).send('Burn actions added to database');
}

module.exports = {
  writeBurnActions
}
