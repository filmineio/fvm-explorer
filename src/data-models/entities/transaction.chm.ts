import { Entity } from "@/enums/Entity";
import { CHModel } from "@/schema/types/CHModel";

import { Transaction } from "@/types/data/Transaction";

export const transactionChm: CHModel<Transaction> = {
  kind: Entity.Transaction,
  table: "messages",
  block: { kind: "string" },
  cid: { kind: "string" },
  from: { kind: "string" },
  gasFeeCap: { kind: "string" },
  gasLimit: { kind: "number" },
  gasPremium: { kind: "string" },
  height: { kind: "number" },
  messageRctEventsRoot: { kind: "string" },
  messageRctExitCode: { kind: "number" },
  messageRctGasUsed: { kind: "number" },
  messageRctReturn: { kind: "string" },
  method: { kind: "number" },
  nonce: { kind: "string" },
  numberOfEvents: { kind: "string" },
  params: { kind: "string" },
  robustFrom: { kind: "string" },
  robustTo: { kind: "string" },
  subCallOf: { kind: "string" },
  timestamp: { kind: "number" },
  to: { kind: "string" },
  value: { kind: "number" },
  version: { kind: "number" },
};