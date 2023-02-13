import { filterSolcOutputErrors } from "./utils/filterSolcOutputErrors";

import { SolidityVersion } from "@/api/ctx/contracts/verify/enums/SolidityVersion";
import { VerificationStatus } from "@/api/ctx/contracts/verify/enums/VerificationStatus";
import { StandardJSONInput } from "@/api/ctx/contracts/verify/types/StandardJSONInput";
import { findContractPath } from "@/api/ctx/contracts/verify/utils/findContractPath";
import { loadSolc } from "@/api/ctx/contracts/verify/utils/loadSolc";
import { verifyBytecode } from "@/api/ctx/contracts/verify/utils/verifyBytecode";

type Verify = (
  contractName: string,
  solidityVersion: SolidityVersion,
  onChainBytecode: string,
  input: StandardJSONInput
) => Promise<{
  status: VerificationStatus;
  errors: any[];
  warnings: any[];
}>;

// verify compiles the contract and compares the bytecode with the on-chain bytecode
export const verify: Verify = async (
  contractName,
  solidityVersion,
  onChainBytecode,
  input
) => {
  // initial status is unverified
  const contractPath = findContractPath(input, contractName);
  if (!contractPath) {
    return {
      status: VerificationStatus.Unverified,
      errors: ["Contract not found"],
      warnings: [],
    };
  }

  const solc = await loadSolc(solidityVersion);
  // @ts-ignore
  const output = await JSON.parse(solc.compile(JSON.stringify(input)));
  const errors = filterSolcOutputErrors(output, "error");
  const warnings = filterSolcOutputErrors(output, "warning");

  if (errors.length > 0) {
    return { status: VerificationStatus.Unverified, errors, warnings };
  }

  const { evm } = output.contracts[contractPath][contractName];
  const contractBytecode = `0x${evm.deployedBytecode.object}`;

  const status = verifyBytecode(onChainBytecode, contractBytecode);

  return { status, errors, warnings };
};
