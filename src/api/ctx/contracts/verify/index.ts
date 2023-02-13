import { ApiCtx } from "@/api/ctx/apiCtx";
import { VerificationRequest } from "@/api/ctx/contracts/verify/types/VerificationRequest";
import { loadSolc } from "@/api/ctx/contracts/verify/utils/loadSolc";

export const verify = async (ctx: ApiCtx, req: VerificationRequest) => {
  // TODO: Replace types
  var input = {
    language: "Solidity",
    sources: {
      "test.sol": {
        content: req.contractSource,
      },
    },
    settings: {
      outputSelection: {
        "*": {
          "*": ["*"],
        },
      },
    },
  };
  const solc = await loadSolc(req.solidityVersion);
  // @ts-ignore
  return await JSON.parse(solc.compile(JSON.stringify(input)));
};
