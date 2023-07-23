import { useEffect, useState } from "react";
import { useAccount, useContractWrite } from "wagmi";
import AddressInput from "@/components/AddressInput";
import { Col, Row } from "react-bootstrap";
import ErrorBox from "./ErrorBox";
import SuccessToast from "@/components/SuccessToast.js";
import { sendTransactionInfotoDB } from "@/api/apiCalls";

const Burner = ({ contractAddress, setStored }) => {
  const contractABI = require("../contract/abi.json");
  const errorMessage =
    "Tokens were not burnt correctly, make sure you have enough gas and please try again!";
  const burnTokensText = "Input your token amount";
  const baseExplorerUrl = "https://testnet.snowtrace.io/tx/";
  const [tokenAmount, setTokenAmount] = useState("");
  const [error, setError] = useState();
  const { isConnected } = useAccount();

  const [successfullyBurnt, setSuccessfullyBurnt] = useState(false);

  const { data, isError, isLoading, write } = useContractWrite({
    address: contractAddress,
    abi: contractABI,
    functionName: "safeBurn",
    args: [tokenAmount],
  });

  useEffect(() => {
    if (!isLoading && data) {
      setSuccessfullyBurnt(true);
      const transactionInfo = {
        transactionHash: data?.hash,
        amount: tokenAmount,
        explorerURL: `${baseExplorerUrl}${data?.hash}`,
        timestamp: `${Date.now()}`,
      };
      sendTransactionDataToPostgress(transactionInfo);
    } else if (isError) {
      setError(true);
    }
  }, [data]);

  const sendTransactionDataToPostgress = async (transactionInfo) => {
    const storedStatus = await sendTransactionInfotoDB(
      "burnActions",
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
          <h2 className="mb-3"> Burner 🔥</h2>
          <Col>
            {error && <ErrorBox errorMessage={errorMessage}></ErrorBox>}
            {successfullyBurnt && (
              <SuccessToast
                transactionType={`Your tokens were burnt succesfully`}
              ></SuccessToast>
            )}
            <AddressInput
              buttonName="Burn Tokens!"
              inputText={burnTokensText}
              setTokenAmount={setTokenAmount}
              isMint={false}
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

export default Burner;
