import { contactMetaChm } from "@/schema/entities/contact-meta.chm";
import { MagicUserMetadata } from "magic-sdk";

import { OperationStatus } from "@/types/ApiResponse";
import { Contract } from "@/types/data/Contract";

import { VerificationRequest } from "@/api/contracts/verify/types/VerificationRequest";
import { ApiCtx } from "@/api/ctx/apiCtx";

type CreateContractMetadata = (
  ctx: ApiCtx,
  meta: Record<"abiCid" | "binCid" | "mainCid" | "sigCid", string>,
  contract: Contract,
  verificationRequest: VerificationRequest,
  user: MagicUserMetadata
) => Promise<void>;

export const createContractMetadata: CreateContractMetadata = async (
  ctx,
  meta,
  contract,
  verificationRequest,
  user
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
      sigCid: meta.sigCid,
      fileMap: {},
      name: verificationRequest.contractName,
      compilerVersion: verificationRequest.solidityVersion,
      isPublic: verificationRequest.isPublic,
      owner: user.email as string,
    },
    ["contractAddress", contract.contractAddress]
  );

  if (insertResult === OperationStatus.Error) throw "";
};
