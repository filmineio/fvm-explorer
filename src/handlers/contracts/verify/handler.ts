import { ContractVerificationStatus } from "@/enums/ContractVerificationStatus";
import { v4 } from "@lukeed/uuid";
import { Request, Response } from "express";
import fs from "fs";
import { createContractMetadata } from "src/handlers/contracts/verify/utils/createContractMetadata";
import { downloadFile } from "src/handlers/contracts/verify/utils/downloadFile";
import { getContractById } from "src/handlers/contracts/verify/utils/getContractById";
import { getContractMetaByAddress } from "src/handlers/contracts/verify/utils/getContractMetaByAddress";
import { newSolcStandardInput } from "src/handlers/contracts/verify/utils/newSolcStandardInput";
import { processRequestBody } from "src/handlers/contracts/verify/utils/processRequestBody";
import { readContractsFromZip } from "src/handlers/contracts/verify/utils/readContractsFromZip";
import { uploadMetadata } from "src/handlers/contracts/verify/utils/uploadMetadata";
import { verify } from "src/handlers/contracts/verify/verify";

import { OperationStatus } from "@/types/ApiResponse";

import { ApiCtx } from "@/api/ctx/apiCtx";
import { identifyUser } from "@/api/utils/identifyUser";

export const handle = async (ctx: ApiCtx, req: Request, res: Response) => {
  try {
    const user = await identifyUser(ctx, req);

    if (user === OperationStatus.Error) return res.status(401).end();

    const { contractId } = req.params;
    const verifyReq = processRequestBody(req);

    console.log(verifyReq);
    console.log(contractId);

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
      contract["contractAddress"]
    );

    if (contractMeta) {
      throw new Error("Contract meta already exists");
    }

    // download and read contracts
    const filePath = `/tmp/${Buffer.from(v4()).toString("hex")}`;
    await downloadFile(ctx, verifyReq.contractsZipCID, filePath);
    const contracts = await readContractsFromZip(filePath);
    const onChainBytecode = await ctx.lotus.chain[verifyReq.network].ethGetCode(
      contract["ethAddress"],
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

    return res.json(verificationResult);
  } catch (e) {
    return res.status(400).json({ exception: e });
  }
};
