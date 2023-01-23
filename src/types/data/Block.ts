import { CID } from "@/types/Cid";

type BlockTicket = {
  VRFProof: string;
};

type ElectionProof = {
  WinCount: number;
  VRFProof?: string;
};

type BeaconEntry = {
  Round: number;
  Data: string;
};

type WinPoStProof = {
  PoStProof: number;
  ProofBytes: string;
};

type BLSAggregate = {
  Type: number;
  Data: string;
};

type BlockSig = {
  Type: number;
  Data: string;
};

export type BlockInner = {
  Miner: string;
  Ticket: BlockTicket;
  ElectionProof: ElectionProof;
  BeaconEntries?: BeaconEntry[];
  WinPoStProof?: WinPoStProof[];
  Parents: CID[];
  ParentWeight: string;
  Height: number;
  ParentStateRoot: CID;
  ParentMessageReceipts: CID;
  Messages: CID;
  BLSAggregate?: BLSAggregate;
  Timestamp: number;
  BlockSig?: BlockSig;
  ForkSignaling: number;
  ParentBaseFee: string;
};
export type Block = {
  cid: string;
  block: BlockInner;
  height: number;
  timestamp: number;
  miner: string;
};
