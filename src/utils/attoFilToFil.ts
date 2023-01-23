import BigNumber from "bignumber.js";

import { Transaction } from "@/types/data/Transaction";

export const attoFilToFil = (transaction: Transaction) => {
  return BigNumber(transaction.value).shiftedBy(-18);
};