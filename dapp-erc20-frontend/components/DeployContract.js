import { Button } from "../lib/mui.js";
import { avalancheFuji } from "@wagmi/core/chains";
import {
  createWalletClient,
  custom,
  encodeAbiParameters,
  parseAbiParameters,
} from "viem";
import { bytecode } from "@/contract/bytecode";
import { useEffect, useState } from "react";
import { useWaitForTransaction } from "wagmi";
import ErrorBox from "./ErrorBox.js";
import { sendTransactionInfotoDB } from "@/api/apiCalls";
const DeployContract = ({
  name,
  symbol,
  setContractAddress,
  setDeployedContract,
  setStored,
}) => {
  const errorMessage =
    "There was an error deploying your contract. Please try again!";
  const baseExplorerUrl = "https://testnet.snowtrace.io/tx/";
  const [hash, setHash] = useState();
  const [error, setError] = useState(false);
  const { data, isError, isLoading } = useWaitForTransaction({
    hash: hash,
  });
  

  useEffect(() => {
    if (data?.status === "success") {
      setDeployedContract(true);
      setContractAddress(data?.contractAddress);
    }
  }, [data]);

  const client = createWalletClient({
    chain: avalancheFuji,
    transport: custom(window.ethereum),
  });

  const handleDeployAndSendToDB = async () => {
    if ((name, symbol)) {
      setError(false);
      setStored(false);
      const [address] = await client.requestAddresses();

      const encodedData = encodeAbiParameters(
        parseAbiParameters("string argument1, string argument2"),
        [name, symbol]
      );
      try {
        const hash = await client.sendTransaction({
          account: address,
          data: bytecode.concat(encodedData.substring(2)),
        });
        setHash(hash);
        const transactionInfo = {
          transactionHash: hash,
          _address: address,
          explorerURL: `${baseExplorerUrl}${hash}`,
          timeofEntry: `${Date.now()}`,
        };
        sendTransactionDataToPostgress(transactionInfo);
      } catch (error) {
        <ErrorBox errorMessage={errorMessage}></ErrorBox>;
      }
    } else {
      setError(true);
    }
  };

  const sendTransactionDataToPostgress = async (transactionInfo) => {
    const storedStatus = await sendTransactionInfotoDB(
      "contractDeployments",
      transactionInfo
    );
    if (storedStatus === error) {
      console.log(error);
    } else {
      setStored(storedStatus);
    }
  };

  return (
    <div>
      <Button
        className="mb-5 mt-4"
        variant="primary"
        disabled={!data && isLoading}
        onClick={() => handleDeployAndSendToDB()}
      >
        {" "}
        Deploy Token Contract!
      </Button>
      {error && (
        <ErrorBox errorMessage="Please fill token name and symbol for your contract deployment"></ErrorBox>
      )}
    </div>
  );
};

export default DeployContract;
