import { ContractVerificationStatus } from "@/enums/ContractVerificationStatus";
import { contactMetaChm } from "@/schema/entities/contact-meta.chm";
import fs from "fs";
import { nanoid } from "nanoid";
import { NextApiRequest } from "next";

import { OperationStatus } from "@/types/ApiResponse";

import { verify } from "@/api/contracts/verify";
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
  const {
    solidityVersion,
    contractName,
    network,
    contractsZipCID,
    optimise,
    isPublic,
  } = processRequestBody(req);

  const contract = await getContractById(ctx, network, contractId as string);
  if (!contract) {
    throw new Error("Contract not found");
  }

  const contractMeta = await getContractMetaByAddress(
    ctx,
    network,
    contract["contractAddress"]
  );

  if (contractMeta) {
    throw new Error("Contract meta already exists");
  }

  // download and read contracts
  const filePath = `${nanoid()}.zip`;
  await downloadFile(ctx, contractsZipCID, filePath);
  const contracts = await readContractsFromZip(filePath);
  const onChainBytecode = await ctx.lotus.chain[network].ethGetCode(
    contract["ethAddress"],
    "latest"
  );

  // remove downloaded contracts
  fs.rmSync(filePath);

  const input = newSolcStandardInput(contracts, {
    optimizer: { enabled: optimise, runs: 200 },
  });

  const verificationResult = await verify(
    contractName,
    solidityVersion,
    onChainBytecode,
    input
  );

  if (verificationResult.status !== ContractVerificationStatus.Unverified) {
    const meta = await uploadMetadata(ctx, verificationResult);
    const insertResult = await ctx.database.ch.data.chain[network].create(
      contactMetaChm,
      {
        contractAddress: contract.contractAddress,
        abiCid: meta.abiCid,
        mainCid: meta.mainCid,
        binCid: meta.binCid,
        fileMap: {},
        name: contractName,
        compilerVersion: solidityVersion,
        sigCid: "", // TODO: What is this?
        isPublic: isPublic,
        owner: contract.ownerAddress,
      },
      ["contractAddress", contract.contractAddress]
    );

    if (insertResult === OperationStatus.Error) throw "";
  }

  return verificationResult;
};
