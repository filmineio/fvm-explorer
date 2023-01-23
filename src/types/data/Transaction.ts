export type StateTransition = {
  from: string;
  to: string;
  currentBls: number;
  nextBls: number;
};

export type Transaction = {
  cid: string;
  height: number;
  block: string;
  messageRctReturn: string;
  messageRctExitCode: number;
  messageRctGasUsed: number;
  messageRctEventsRoot: string;
  subCallOf: string;
  from: string;
  to: string;
  robustFrom: string;
  robustTo: string;
  gasLimit: number;
  gasFeeCap: string;
  gasPremium: string;
  method: number;
  params: string;
  value: number;
  timestamp: number;
  nonce: number;
  stateTransition?: StateTransition;
  version?: number;
  numberOfEvents: number;
};
