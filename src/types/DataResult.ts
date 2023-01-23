import { Entity } from "@/enums/Entity";

import { ResultWithTotal } from "@/types/ResultWithTotal";
import { Block } from "@/types/data/Block";
import { Contract } from "@/types/data/Contract";
import { Project } from "@/types/data/Project";
import { Transaction } from "@/types/data/Transaction";

export type ContractResults = {
  kind: Entity.Contract;
} & ResultWithTotal<Contract>;

export type BlockResults = {
  kind: Entity.Block;
} & ResultWithTotal<Block>;

export type TransactionResults = {
  kind: Entity.Transaction;
} & ResultWithTotal<Transaction>;

export type ProjectResults = {
  kind: Entity.Project;
} & ResultWithTotal<Project>;

export type SelectedEntity = DataResult;

export type DataResult =
  | ContractResults
  | BlockResults
  | TransactionResults
  | ProjectResults;