import { File } from "web3.storage";

import { VerificationResult } from "@/api/contracts/verify/types/VerificationResult";
import { ApiCtx } from "@/api/ctx/apiCtx";

type UploadMetadata = (
  ctx: ApiCtx,
  result: VerificationResult
) => Promise<{ abiCid: string; binCid: string; mainCid: string }>;

// uploadMetadata uploads verification result metadata
export const uploadMetadata: UploadMetadata = async (ctx, result) => {
  const abiBlob = new Blob([JSON.stringify(result.abi)], {
    type: "application/json",
  });
  const binBlob = new Blob([result.contractBytecode]);
  const contractBlob = new Blob([result.contractCode]);

  const files = [
    new File([abiBlob], "abi.json"),
    new File([binBlob], "bin"),
    new File([contractBlob], "main.sol"),
  ];
  const cid = await ctx.web3storage.put(files);

  return {
    abiCid: `${cid}/abi.json`,
    binCid: `${cid}/bin`,
    mainCid: `${cid}/main.sol`,
  };
};
