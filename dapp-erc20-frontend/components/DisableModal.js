import { useEffect, useState } from "react";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";

const DisableModal = ({ wrongChain }) => {
  const [show, setShow] = useState();

  useEffect(() => {
    setShow(wrongChain);
  }, [wrongChain]);

  return (
    <>
      <Modal show={show} backdrop="static" keyboard={false}>
        <Modal.Header closeButton>
          <Modal.Title className="text-danger">
            You are switching networks..
          </Modal.Title>
        </Modal.Header>
        <Modal.Body className="text-dark">
          Please keep your Metamask connected to the AvalancheFuji network so
          the app is happy (:
        </Modal.Body>
      </Modal>
    </>
  );
};

export default DisableModal;
