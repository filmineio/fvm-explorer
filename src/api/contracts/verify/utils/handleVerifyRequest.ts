import fs from "fs";
import { nanoid } from "nanoid";
import { NextApiRequest } from "next";

import { verify } from "@/api/contracts/verify";
import { downloadFile } from "@/api/contracts/verify/utils/downloadFile";
import { newSolcStandardInput } from "@/api/contracts/verify/utils/newSolcStandardInput";
import { processRequestBody } from "@/api/contracts/verify/utils/processRequestBody";
import { readContractsFromZip } from "@/api/contracts/verify/utils/readContractsFromZip";
import { ApiCtx } from "@/api/ctx/apiCtx";

export const handle = async (ctx: ApiCtx, req: NextApiRequest) => {
  // const { contractId } = req.query;
  const { solidityVersion, contractName, network, contractsZipCID } =
    processRequestBody(req);

  // const result = await getContractById(ctx, network, contractId);

  // download and read contracts
  const filePath = `${nanoid()}.zip`;
  await downloadFile(ctx, contractsZipCID, filePath);
  const contracts = await readContractsFromZip(filePath);
  console.log(ctx.lotus.chain[network])
  const onChainBytecode = await ctx.lotus.chain[network].ethGetCode(
    "0x414069F7DA42BAF094b529c85d9cD994a120abc8",
    "latest"
  );

  console.log(onChainBytecode);
  // remove downloaded contracts
  fs.rmSync(filePath);

  const input = newSolcStandardInput(contracts, {});

  return verify(contractName, solidityVersion, onChainBytecode, input);
};
