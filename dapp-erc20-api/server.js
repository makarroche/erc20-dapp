// Import services
const {writeContractDeployments } = require("./api/services/postSCDeployments.js");
const {writeMintActions } = require("./api/services/postMintActions.js");
const {writeBurnActions } = require("./api/services/postBurnActions.js");
const {readContractDeployments } = require("./api/services/getSCDeployments.js");
const {readMintActions } = require("./api/services/getMintActions.js");
const {readBurnActions } = require("./api/services/getBurnActions.js");

// Setup express and body parser
const express = require("express");
var cors = require('cors');
const app = express();
const port = 5005;

let bodyParser = require('body-parser');
app.use(
    cors(),
    bodyParser.urlencoded({
        extended: true
    })
);
app.use(bodyParser.json());

app.get("/", (request, response) => {
    response.send("Server running!");
});

app.post("/contractDeployments", writeContractDeployments);

app.post("/mintActions", writeMintActions);

app.post("/burnActions", writeBurnActions);

app.get("/contractDeployments", readContractDeployments);

app.get("/mintActions", readMintActions);

app.get("/burnActions", readBurnActions);

app.listen(port, () => {
    console.log("Listen on the port 5005...");
});

