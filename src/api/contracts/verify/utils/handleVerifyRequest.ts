import { ContractVerificationStatus } from "@/enums/ContractVerificationStatus";
import fs from "fs";
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

export const handle = async (ctx: ApiCtx, req: NextApiRequest) => {
  const { contractId } = req.query;
  const verReq = processRequestBody(req);

  const contract = await getContractById(
    ctx,
    verReq.network,
    contractId as string
  );
  if (!contract) {
    throw new Error("Contract not found");
  }

  const contractMeta = await getContractMetaByAddress(
    ctx,
    verReq.network,
    contract["contractAddress"]
  );

  if (contractMeta) {
    throw new Error("Contract meta already exists");
  }

  // download and read contracts
  const filePath = `${nanoid()}.zip`;
  await downloadFile(ctx, verReq.contractsZipCID, filePath);
  const contracts = await readContractsFromZip(filePath);
  const onChainBytecode = await ctx.lotus.chain[verReq.network].ethGetCode(
    contract["ethAddress"],
    "latest"
  );

  // remove downloaded contracts
  fs.rmSync(filePath);

  const input = newSolcStandardInput(contracts, {
    optimizer: { enabled: verReq.optimise, runs: 200 },
  });

  const verificationResult = await verify(
    verReq.contractName,
    verReq.solidityVersion,
    onChainBytecode,
    input
  );

  if (verificationResult.status !== ContractVerificationStatus.Unverified) {
    const meta = await uploadMetadata(ctx, verificationResult);
    await createContractMetadata(ctx, meta, contract, verReq);
  }

  return verificationResult;
};
