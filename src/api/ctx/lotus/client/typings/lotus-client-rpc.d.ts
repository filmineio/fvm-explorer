import { Cid, LotusRPC } from "@filecoin-shipyard/lotus-client-rpc";

export class LotusClient extends LotusRPC {
  stateEncodeParams<T>(
    address: Cid,
    methodNum: number,
    bytes: T
  ): Promise<string>;
  ethGetCode(address: string, blkOpt: string): Promise<string>;
}
