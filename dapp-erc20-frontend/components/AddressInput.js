"use client";
import { Button } from "../lib/mui.js";

const AddressInput = ({
  buttonName,
  inputText,
  setReceieverAddress,
  setTokenAmount,
  isMint,
  write,
  isLoading,
  data,
}) => {
  return (
    <>
      <label className="mb-3">{inputText}</label>
      <div className="input-group w-50 mb-5">
        {isMint && (
          <input
            type="text"
            className="form-control"
            placeholder="Address"
            onChange={(event) => setReceieverAddress(event.target.value)}
            required
          />
        )}
        <input
          type="text"
          className="form-control"
          placeholder="Token Amount"
          onChange={(event) => setTokenAmount(event.target.value)}
          required
        />
        <Button
          variant="primary"
          type = "submit"
          disabled={!data && isLoading}
          onClick={() => write?.()}
        >
          {buttonName}
        </Button>
      </div>
    </>
  );
};

export default AddressInput;
