import { useState } from "react";
import { Alert } from "react-bootstrap";

function SuccessToast({ transactionType }) {
  return (
    <Alert className="text-center " variant="success" dismissible>
      {transactionType}
    </Alert>
  );
}

export default SuccessToast;
