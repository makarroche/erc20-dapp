"use client";

import { Col, Row, Container } from "../lib/mui.js";
import { useEffect, useState } from "react";
import SuccessToast from "@/components/SuccessToast.js";
import Minter from "@/components/Minter.js";
import Burner from "@/components/Burner.js";
import Dashboard from "@/components/DashBoard";
import Connect from "@/components/Connect";
import { getTransactionInfoFromDB } from "../api/apiCalls.js";

import { WagmiConfig, createConfig, configureChains, useAccount } from "wagmi";
import { alchemyProvider } from "../lib/provider.js";
import { avalancheFuji } from "@wagmi/core/chains";
import { publicProvider } from "wagmi/providers/public";
import DBTables from "@/components/DBTables.js";

const defaultChains = [avalancheFuji];

// Configure chains & providers with the Alchemy provider.
const { publicClient, webSocketPublicClient } = configureChains(defaultChains, [
  alchemyProvider({ apiKey: process.env.NEXT_PUBLIC_ALCHEMY_API_KEY }),
  publicProvider(),
]);

const config = createConfig({
  autoConnect: true,
  publicClient,
  webSocketPublicClient,
});

export default function Home() {
  const sucessfulContractDeployment =
    "Your contract was successfully deployed to the AvalancheFuji Blockchain!";
  const dbContractDeployment = {
    title: "Contract Deployment",
    columns: ["transactionHash", "_address", "explorerUrl"],
  };
  const dbMintActions = {
    title: "Mint Actions",
    columns: ["transactionHash", "amount", "recipientAddress", "explorerUrl"],
  };
  const dbBurnActions = {
    title: "Burn Actions",
    columns: ["transactionHash", "amount", "explorerURL"],
  };
  const [deployedContract, setDeployedContract] = useState(false);
  const [contractAddress, setContractAddress] = useState("");
  const [resultsContractDeployments, setResultsContractDeployments] =
    useState();
  const [resultsMintActions, setResultsMintActions] = useState();
  const [resultsBurnActions, setResultsBurnActions] = useState();
  const [storeCD, setStoredCD] = useState(false);
  const [storeMA, setStoredMA] = useState(false);
  const [storeBA, setStoredBA] = useState(false);

  useEffect(() => {
    getDataFromDB("contractdeployments", setResultsContractDeployments);
  }, [storeCD]);

  useEffect(() => {
    getDataFromDB("mintactions", setResultsMintActions);
  }, [storeMA]);

  useEffect(() => {
    getDataFromDB("burnactions", setResultsBurnActions);
  }, [storeBA]);

  const getDataFromDB = async (table, setter) => {
    const tableDBData = await getTransactionInfoFromDB(table);
    setter(tableDBData?.data);
  };

  return (
    <WagmiConfig config={config}>
      <Container
        fluid
        className="p-5 bg-dark text-white"
        style={{ minHeight: "100vh" }}
      >
        <Row>
          {deployedContract && (
            <div>
              {" "}
              <SuccessToast
                transactionType={sucessfulContractDeployment}
              ></SuccessToast>
            </div>
          )}
        </Row>
        <Row className="text-center">
          <Col sm={6} xs={12}>
            <h2 className="mb-5">
              My ERC20 <span className="">Minter and Burner</span>
            </h2>
          </Col>
          <Col sm={6} xs={12}>
            <Connect></Connect>
          </Col>
        </Row>
        <Dashboard
          setDeployedContract={setDeployedContract}
          deployedContract={deployedContract}
          setContractAddress={setContractAddress}
          contractAddress={contractAddress}
          setResultsContractDeployments={setResultsContractDeployments}
          setStored={setStoredCD}
        ></Dashboard>
        {deployedContract && (
          <>
            <Minter
              contractAddress={contractAddress}
              setResultsMintActions={setResultsMintActions}
              setStored={setStoredMA}
            ></Minter>
            <Burner
              contractAddress={contractAddress}
              setResultsBurnActions={setResultsBurnActions}
              setStored={setStoredBA}
            ></Burner>
          </>
        )}
        <Row>
          {deployedContract && (
            <DBTables
              dbDetails={dbContractDeployment}
              dbResults={resultsContractDeployments}
            ></DBTables>
          )}
          {deployedContract && (
            <DBTables
              dbDetails={dbMintActions}
              dbResults={resultsMintActions}
            ></DBTables>
          )}
          {deployedContract && (
            <DBTables
              dbDetails={dbBurnActions}
              dbResults={resultsBurnActions}
            ></DBTables>
          )}
        </Row>
      </Container>
    </WagmiConfig>
  );
}
