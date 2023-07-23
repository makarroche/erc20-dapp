const axios = require("axios");

//URL or postgres database
const url = "http://localhost:5005/";

const getTransactionInfoFromDB = async (endpoint) => {
  try {
    const response = await axios.get(`${url}${endpoint}`);
    return response;
  } catch (error) {
    return error;
  }
};

const sendTransactionInfotoDB = async (endpoint, transactionInfo) => {
  try {
    const response = await axios.post(`${url}${endpoint}`, transactionInfo);
    return response;
  } catch (error) {
    return error;
  }
};

export { getTransactionInfoFromDB, sendTransactionInfotoDB };
