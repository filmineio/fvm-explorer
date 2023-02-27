import { ContractVerificationStatus } from "@/enums/ContractVerificationStatus";
import fs from "fs";
import { MagicUserMetadata } from "magic-sdk";
import { nanoid } from "nanoid";
import { NextApiRequest } from "next";

import { verify } from "@/api/contracts/verify";
import { createContractMetadata } from "@/api/contracts/verify/utils/createContractMetadata";
import { downloadFile } from "@/api/contracts/verify/utils/downloadFile";
import { getContractById } from "@/api/contracts/verify/utils/getContractById";
import { getContractMetaByAddress } from "@/api/contracts/verify/utils/getContractMetaByAddress";
import { newSolcStandardInput } from "@/api/contracts/verify/utils/newSolcStandardInput";
import { processRequestBody } from "@/api/contracts/verify/utils/processRequestBody";
import { readContractsFromZip } from "@/api/contracts/verify/utils/readContractsFromZip";
import { uploadMetadata } from "@/api/contracts/verify/utils/uploadMetadata";
import { ApiCtx } from "@/api/ctx/apiCtx";

export const handle = async (
  ctx: ApiCtx,
  req: NextApiRequest,
  user: MagicUserMetadata
) => {
  const { contractId } = req.query;
  const verifyReq = processRequestBody(req);

  const contract = await getContractById(
    ctx,
    verifyReq.network,
    contractId as string
  );
  if (!contract) {
    throw new Error("Contract not found");
  }

  const contractMeta = await getContractMetaByAddress(
    ctx,
    verifyReq.network,
    contract.contractAddress
  );

  if (contractMeta) {
    throw new Error("Contract meta already exists");
  }

  // download and read contracts
  const filePath = `${nanoid()}.zip`;
  await downloadFile(ctx, verifyReq.contractsZipCID, filePath);
  const contracts = await readContractsFromZip(filePath);
  const onChainBytecode = await ctx.lotus.chain[verifyReq.network].ethGetCode(
    contract.ethAddress,
    "latest"
  );

  // remove downloaded contracts
  fs.rmSync(filePath);

  const input = newSolcStandardInput(contracts, {
    optimizer: { enabled: verifyReq.optimise, runs: 200 },
  });

  const verificationResult = await verify(
    verifyReq.contractName,
    verifyReq.solidityVersion,
    onChainBytecode,
    input
  );

  if (verificationResult.status !== ContractVerificationStatus.Unverified) {
    const meta = await uploadMetadata(ctx, verificationResult);
    await createContractMetadata(ctx, meta, contract, verifyReq, user);
  }

  return verificationResult;
};
