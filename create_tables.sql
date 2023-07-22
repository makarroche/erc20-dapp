-- Creation of contractDeployments table
CREATE TABLE contractdeployments (
  transactionhash TEXT NOT NULL,
  _address TEXT NOT NULL,
  explorerurl TEXT NOT NULL,
  timeofEntry BIGINT NOT NULL,
  PRIMARY KEY (transactionhash)
);

-- Creation of mintActions table
CREATE TABLE mintactions (
  transactionhash TEXT NOT NULL,
  amount BIGINT NOT NULL,
  recipientAddress TEXT NOT NULL,
  explorerurl TEXT NOT NULL,
  timeofEntry BIGINT NOT NULL, 
  PRIMARY KEY (transactionhash)
);

-- Creation of burnActions table
CREATE TABLE burnactions (
  transactionhash TEXT NOT NULL,
  amount BIGINT NOT NULL,
  explorerurl TEXT NOT NULL,
  timeofEntry BIGINT NOT NULL,
  PRIMARY KEY (transactionhash)
);


