import { ContractVerificationStatus } from "@/enums/ContractVerificationStatus";
import { createContractMetadata } from "@/handlers/contracts/verify/utils/createContractMetadata";
import { downloadFile } from "@/handlers/contracts/verify/utils/downloadFile";
import { getContractByAddress } from "@/handlers/contracts/verify/utils/getContractByAddress";
import { getContractMetaByAddress } from "@/handlers/contracts/verify/utils/getContractMetaByAddress";
import { newSolcStandardInput } from "@/handlers/contracts/verify/utils/newSolcStandardInput";
import { processRequestBody } from "@/handlers/contracts/verify/utils/processRequestBody";
import { readContractsFromZip } from "@/handlers/contracts/verify/utils/readContractsFromZip";
import { uploadMetadata } from "@/handlers/contracts/verify/utils/uploadMetadata";
import { verify } from "@/handlers/contracts/verify/utils/verify";
import { v4 } from "@lukeed/uuid";
import { Request, Response } from "express";
import fs from "fs";

import { OperationStatus } from "@/types/ApiResponse";

import { ApiCtx } from "@/api/ctx/apiCtx";
import { identifyUser } from "@/api/utils/identifyUser";

export const handle = async (ctx: ApiCtx, req: Request, res: Response) => {
  try {
    const user = await identifyUser(ctx, req);

    if (user === OperationStatus.Error) return res.status(401).end();

    const { contractAddress } = req.params;

    if (!contractAddress || !contractAddress.trim())
      return res.status(400).json({ exception: "INVALID_REQUEST_PARAMS" });

    const verifyReq = processRequestBody(req);
    const contract = await getContractByAddress(
      ctx,
      verifyReq.network,
      (contractAddress as string).toLowerCase()
    );
    if (!contract) {
      return res.status(404).json({ exception: "ENTITY_NOT_FOUND" });
    }

    const contractMeta = await getContractMetaByAddress(
      ctx,
      verifyReq.network,
      contractAddress
    );

    if (contractMeta) {
      return res.status(400).json({ exception: "CONTRACT_META_EXISTS" });
    }

    // download and read contracts
    const filePath = `/tmp/${Buffer.from(v4()).toString("hex")}.zip`;
    await downloadFile(verifyReq.contractsZipCID, filePath, "contracts.zip");
    const contracts = await readContractsFromZip(filePath);
    const onChainBytecode = await ctx.lotus[verifyReq.network].ethGetCode(
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
      onChainBytecode,
      input
    );

    if (verificationResult.status !== ContractVerificationStatus.Unverified) {
      const meta = await uploadMetadata(ctx, verificationResult);
      await createContractMetadata(
        ctx,
        meta,
        contract,
        verifyReq,
        verificationResult.solidityVersion,
        user
      );
    }

    if (verificationResult.errors.length > 0) {
      return res.status(400).json({
        ...verificationResult,
        exception: "CONTRACT_VERIFICATION_FAILED",
      });
    }

    return res.json(verificationResult);
  } catch (e) {
    console.error(e);
    return res.status(400).json({ exception: e });
  }
};
