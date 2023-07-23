import { useEffect, useState } from "react";
import { useContractWrite } from "wagmi";
import AddressInput from "@/components/AddressInput";
import { Col, Row } from "react-bootstrap";
import SuccessToast from "@/components/SuccessToast.js";
import ErrorBox from "./ErrorBox";
import { sendTransactionInfotoDB } from "@/api/apiCalls";
import { useAccount } from "wagmi";

const Minter = ({ contractAddress, setStored }) => {
  const errorMessage =
    "Tokens were not minted correctly, make sure you have enough gas and please try again!";
  const mintTokensText = "Input the user's address and token amount";
  const baseExplorerUrl = "https://testnet.snowtrace.io/tx/";
  const contractABI = require("../contract/abi.json");
  const [receiverAddress, setReceieverAddress] = useState();
  const { isConnected } = useAccount();
  const [tokenAmount, setTokenAmount] = useState();
  const [error, setError] = useState();
  const [successfullyMinted, setSuccessfullyMinted] = useState(false);
  const { data, isError, isLoading, write } = useContractWrite({
    address: contractAddress,
    abi: contractABI,
    functionName: "safeMint",
    args: [receiverAddress, tokenAmount],
  });

  useEffect(() => {
    if (!isLoading && data) {
      setSuccessfullyMinted(true);
      const transactionInfo = {
        transactionHash: data?.hash,
        amount: tokenAmount,
        recipientAddress: receiverAddress,
        explorerURL: `${baseExplorerUrl}${data?.hash}`,
        timeofEntry: `${Date.now()}`,
      };
      sendTransactionDataToPostgress(transactionInfo);
    } else if (isError) {
      setError(true);
    }
  }, [data]);

  const sendTransactionDataToPostgress = async (transactionInfo) => {
    const storedStatus = await sendTransactionInfotoDB(
      "mintActions",
      transactionInfo
    );
    if (storedStatus === "Bad request") {
      console.log(error);
    } else {
      setStored(storedStatus);
    }
  };

  return (
    <>
      {isConnected && (
        <Row>
          <h2 className="mb-3">Minter ✨</h2>
          <Col>
            {error && <ErrorBox errorMessage={errorMessage}></ErrorBox>}
            {successfullyMinted && (
              <SuccessToast
                transactionType={`Tokens minted successfully to address ${receiverAddress}`}
              ></SuccessToast>
            )}
            <AddressInput
              buttonName="Mint Tokens!"
              inputText={mintTokensText}
              isMint={true}
              setReceieverAddress={setReceieverAddress}
              setTokenAmount={setTokenAmount}
              write={write}
              isLoading={isLoading}
              data={data}
            ></AddressInput>
          </Col>
        </Row>
      )}
    </>
  );
};

export default Minter;
