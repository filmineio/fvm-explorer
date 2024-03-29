import { parseSolidityVersion } from "./parseSolidityVersion";
import { ContractVerificationStatus } from "@/enums/ContractVerificationStatus";
import { SolcStandardJSONInput } from "@/handlers/contracts/verify/types/SolcStandardJSONInput";
import { VerificationResult } from "@/handlers/contracts/verify/types/VerificationResult";
import { filterSolcOutputErrors } from "@/handlers/contracts/verify/utils/filterSolcOutputErrors";
import { findContractPath } from "@/handlers/contracts/verify/utils/findContractPath";
import { loadSolc } from "@/handlers/contracts/verify/utils/loadSolc";
import { verifyBytecode } from "@/handlers/contracts/verify/utils/verifyBytecode";

type Verify = (
  contractName: string,
  onChainBytecode: string,
  input: SolcStandardJSONInput
) => Promise<VerificationResult>;

// verify compiles the contract and compares the bytecode with the on-chain bytecode
export const verify: Verify = async (contractName, onChainBytecode, input) => {
  // initial status is unverified
  const contractPath = findContractPath(input, contractName);
  if (!contractPath) {
    return {
      status: ContractVerificationStatus.Unverified,
      errors: ["Contract not found"],
      warnings: [],
      contractCode: "",
      contractBytecode: "",
      solidityVersion: "unknown",
      abi: {},
      solcOutput: {},
    };
  }

  const contractCode = input.sources[contractPath].content;
  const solidityVersion = parseSolidityVersion(contractCode);
  if (!solidityVersion) {
    return {
      status: ContractVerificationStatus.Unverified,
      errors: ["Failed to load solidity version. ${solidityVersion}"],
      warnings: [],
      contractCode: "",
      solidityVersion: "unknown",
      contractBytecode: "",
      abi: {},
      solcOutput: {},
    };
  }

  const solc = await loadSolc(solidityVersion);
  // @ts-ignore
  const solcOutput = await JSON.parse(solc.compile(JSON.stringify(input)));
  const errors = filterSolcOutputErrors(solcOutput, "error");
  const warnings = filterSolcOutputErrors(solcOutput, "warning");

  if (errors.length > 0) {
    return {
      status: ContractVerificationStatus.Unverified,
      errors,
      warnings,
      solidityVersion,
      contractCode,
      contractBytecode: "",
    };
  }

  const { evm, abi } = solcOutput.contracts[contractPath][contractName];
  const contractBytecode = `0x${evm.deployedBytecode.object}`;

  const status = verifyBytecode(onChainBytecode, contractBytecode);

  return {
    status,
    errors,
    warnings,
    contractCode,
    solidityVersion,
    contractBytecode,
    abi,
    solcOutput,
  };
};
