REST API that communicates with erc20 frontend
Run with: node server.js

Endpoints
--------------

POST /contractDeployments 

body: 
{ 
  "transactionHash": "0x1234",
  "_address": "15",
  "explorerURL": "http://hello.com" 
}

POST /mintActions 

body: 
{ 
  "transactionHash": "0x678",
  "amount": "15",
  "recipientAddress": "0x123",
  "explorerURL": "http://goodbye.com" 
}

POST /burnActions

{ 
  "transactionHash": "0x9018",
  "amount": "15",
  "explorerURL": "http://blockchain.com" 
}

GET /contractDeployments

GET /mintActions

GET /burnActions 