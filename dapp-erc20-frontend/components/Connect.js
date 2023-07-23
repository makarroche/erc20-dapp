import { useAccount, useConnect, useDisconnect, useEnsName } from "wagmi";
import { InjectedConnector } from "wagmi/connectors/injected";
import { useNetwork } from "wagmi";
import { useEffect, useState } from "react";
import DisableModal from "@/components/DisableModal";

const Connect = () => {
  const { address, isConnected } = useAccount();
  const { data: ensName } = useEnsName({ address });
  const { disconnect } = useDisconnect();
  const { connect, error } = useConnect({
    connector: new InjectedConnector(),
  });

  const { chain } = useNetwork();

  const [wrongChain, setWrongChain] = useState(false);

  useEffect(() => {
    checkNetwork();
  }, [chain]);

  const checkNetwork = () => {
    if (chain?.name != "Avalanche Fuji") {
      setWrongChain(true);
    } else {
      setWrongChain(false);
    }
  };

  if (isConnected)
    return (
      <div>
        Connected address:{" "}
        <span className="connectedSuccessfully">{ensName ?? address} </span>
        <button className="btn btn-outline-secondary" onClick={disconnect}>
          Disconnect
        </button>
        {chain && (
          <div>
            Network: <span className="connectedNetwork">{chain.name}</span>
          </div>
        )}
        <DisableModal wrongChain={wrongChain}></DisableModal>
        {error && <div>{error.message}</div>}
      </div>
    );

  return (
    <>
      <button
        className="btn btn-outline-primary mb-5"
        variant="primary"
        onClick={() => connect()}
      >
        Connect Wallet
      </button>
    </>
  );
};

export default Connect;
