const pool = require('../config').pool;

const writeContractDeployments = (request, response) => {
  const {transactionHash, _address, explorerURL, timestamp} = request.body;
    pool.query(`INSERT INTO contractdeployments (transactionHash, _address, explorerURL, timeofEntry) VALUES ('${transactionHash}', '${_address}', '${explorerURL}', ${timestamp});`, (error, results) => {
      if (error) {
        console.log(error);
        //throw error; 
    }
    })
    response.status(200).send('Contract Deployment added to database!');
}

module.exports = {
  writeContractDeployments
}
