import { File } from "web3.storage";

import { VerificationResult } from "src/handlers/contracts/verify/types/VerificationResult";
import { ApiCtx } from "@/api/ctx/apiCtx";

type UploadMetadata = (
  ctx: ApiCtx,
  result: VerificationResult
) => Promise<Record<"abiCid" | "binCid" | "mainCid" | "sigCid", string>>;

// uploadMetadata uploads verification result metadata
export const uploadMetadata: UploadMetadata = async (ctx, result) => {
  console.log(result);
  const abiBlob = new Blob([JSON.stringify(result.abi)], {
    type: "application/json",
  });
  const sigBlob = new Blob([JSON.stringify(result.solcOutput)], {
    type: "application/json",
  });
  const binBlob = new Blob([result.contractBytecode]);
  const contractBlob = new Blob([result.contractCode]);

  const files = [
    new File([abiBlob], "abi.json"),
    new File([sigBlob], "sig.json"),
    new File([binBlob], "bin"),
    new File([contractBlob], "main.sol"),
  ];
  const cid = await ctx.web3storage.put(files);

  return {
    abiCid: `${cid}/abi.json`,
    sigCid: `${cid}/sig.json`,
    binCid: `${cid}/bin`,
    mainCid: `${cid}/main.sol`,
  };
};
