import fs from "fs";
import { nanoid } from "nanoid";
import { NextApiRequest } from "next";

import { ApiCtx } from "@/api/ctx/apiCtx";
import { verify } from "@/api/ctx/contracts/verify";
import { downloadFile } from "@/api/ctx/contracts/verify/utils/downloadFile";
import { processRequestBody } from "@/api/ctx/contracts/verify/utils/processRequestBody";
import { readContractsFromZip } from "@/api/ctx/contracts/verify/utils/readContractsFromZip";

export const handle = async (ctx: ApiCtx, req: NextApiRequest) => {
  const verificationRequest = processRequestBody(req);
  const { solidityVersion, contractName } = verificationRequest;
  const filePath = `${nanoid()}.zip`;
  await downloadFile(ctx, verificationRequest.contractsZipCID, filePath);
  const contracts = await readContractsFromZip(filePath);
  const onChainBytecode = ``;
  // remove downloaded contracts
  fs.rmSync(filePath);

  const input = {
    language: "Solidity",
    sources: contracts,
    settings: {
      outputSelection: {
        "*": {
          "*": ["*"],
        },
      },
    },
  };

  return verify(contractName, solidityVersion, onChainBytecode, input);
};
