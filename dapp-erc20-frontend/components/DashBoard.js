"use client";

import { useEffect, useState } from "react";
import { useAccount } from "wagmi";
import { Col, ListGroup, Row, Button } from "../lib/mui.js";
import DeployContract from "./DeployContract.js";
import { useBalance } from "wagmi";

const DashBoard = ({
  setDeployedContract,
  deployedContract,
  contractAddress,
  setContractAddress,
  setStored,
}) => {
  const [name, setName] = useState();
  const [symbol, setSymbol] = useState();
  const [balance, setBalance] = useState();
  const { address, isConnected } = useAccount();
  const { data, isError, isLoading, status } = useBalance({
    address: address,
    token: contractAddress,
    watch: true,
  });

  useEffect(() => {
    if (status === "success") {
      setBalance(data?.formatted * Math.pow(10, 18));
    }
  }, [data?.formatted]);

  return (
    <>
      {address && (
        <>
          <Row className="text-center">
            <Col sm={6} xs={12}>
              <div className="d-flex justify-content-end">
                <div className="w-50">
                  <ListGroup className="fw-bold list-group-item-secondary">
                    <ListGroup.Item>Token Name</ListGroup.Item>
                    <ListGroup.Item>Token Symbol</ListGroup.Item>
                    {deployedContract && (
                      <>
                        <ListGroup.Item>Token Contract Address</ListGroup.Item>
                        <ListGroup.Item>User Balance</ListGroup.Item>{" "}
                      </>
                    )}
                  </ListGroup>
                </div>
              </div>
            </Col>
            <Col sm={6} xs={12}>
              <div className="d-flex justify-content-start">
                <div className="w-50">
                  <input
                    type="text"
                    className="form-control mb-1"
                    placeholder="My Token"
                    onChange={(event) => setName(event.target.value)}
                    maxLength="5"
                  />
                  <input
                    type="text"
                    className="form-control mb-1"
                    placeholder="TKN"
                    onChange={(event) => setSymbol(event.target.value)}
                    maxLength="5"
                  />
                  {deployedContract && (
                    <>
                      <input
                        type="text"
                        className="form-control mb-1"
                        placeholder="0x1234..."
                        value={contractAddress}
                        disabled
                      />
                      <input
                        type="text"
                        className="form-control mb-1"
                        placeholder="0"
                        value={balance}
                        disabled
                      />
                    </>
                  )}
                </div>
              </div>
            </Col>
          </Row>
          <Row className="text-center">
            <Col>
              <div>
                <DeployContract
                  name={name}
                  symbol={symbol}
                  setContractAddress={setContractAddress}
                  balance={setBalance}
                  setDeployedContract={setDeployedContract}
                  setStored={setStored}
                ></DeployContract>
              </div>
            </Col>
          </Row>
        </>
      )}
    </>
  );
};

export default DashBoard;
