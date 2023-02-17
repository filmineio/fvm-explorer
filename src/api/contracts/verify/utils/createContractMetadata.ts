import { contactMetaChm } from "@/schema/entities/contact-meta.chm";

import { OperationStatus } from "@/types/ApiResponse";
import { Contract } from "@/types/data/Contract";

import { VerificationRequest } from "@/api/contracts/verify/types/VerificationRequest";
import { ApiCtx } from "@/api/ctx/apiCtx";

export const createContractMetadata = async (
  ctx: ApiCtx,
  meta: { abiCid: string; binCid: string; mainCid: string },
  contract: Contract,
  verificationRequest: VerificationRequest
) => {
  const insertResult = await ctx.database.ch.data.chain[
    verificationRequest.network
  ].create(
    contactMetaChm,
    {
      contractAddress: contract.contractAddress,
      abiCid: meta.abiCid,
      mainCid: meta.mainCid,
      binCid: meta.binCid,
      fileMap: {},
      name: verificationRequest.contractName,
      compilerVersion: verificationRequest.solidityVersion,
      sigCid: "",
      isPublic: verificationRequest.isPublic,
      owner: contract.ownerAddress,
    },
    ["contractAddress", contract.contractAddress]
  );

  if (insertResult === OperationStatus.Error) throw "";
};
