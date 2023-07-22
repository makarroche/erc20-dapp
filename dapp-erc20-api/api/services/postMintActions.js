const pool = require('../config').pool;

const writeMintActions = (request, response) => {
  const {transactionHash, amount, recipientAddress , explorerURL,timestamp} = request.body;
  pool.query(`INSERT INTO mintactions (transactionHash, amount, recipientAddress , explorerURL,timeofEntry) VALUES ('${transactionHash}', ${amount}, '${recipientAddress}', '${explorerURL}', ${timestamp});`, (error, results) => {
    if (error) {
      console.log(error);
      //throw error; 
  }
  })
  response.status(200).send('Mint actions added to database');
}

module.exports = {
  writeMintActions
}
