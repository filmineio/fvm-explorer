import { filterSolcOutputErrors } from "./utils/filterSolcOutputErrors";

import { SolidityVersion } from "@/api/ctx/contracts/verify/enums/SolidityVersion";
import { VerificationStatus } from "@/api/ctx/contracts/verify/enums/VerificationStatus";
import { StandardJSONInput } from "@/api/ctx/contracts/verify/types/StandardJSONInput";
import { extractMetadata } from "@/api/ctx/contracts/verify/utils/extractMetadata";
import { findContractPath } from "@/api/ctx/contracts/verify/utils/findContractPath";
import { loadSolc } from "@/api/ctx/contracts/verify/utils/loadSolc";

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

export const verify: Verify = async (
  contractName,
  solidityVersion,
  onChainBytecode,
  input
) => {
  // initial status is unverified
  let status = VerificationStatus.Unverified;

  const contractPath = findContractPath(input, contractName);
  if (!contractPath) {
    return {
      status,
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
    return { status, errors, warnings };
  }

  const { evm } = output.contracts[contractPath][contractName];
  const deployedBytecode = `0x${evm.deployedBytecode.object}`;

  const { strippedBytecode, metadataBytecode } =
    extractMetadata(deployedBytecode);

  const {
    strippedBytecode: strippedOnChainBytecode,
    metadataBytecode: onChainMetadataBytecode,
  } = extractMetadata(onChainBytecode);

  if (
    strippedBytecode === strippedOnChainBytecode &&
    metadataBytecode === onChainMetadataBytecode
  ) {
    status = VerificationStatus.Full;
  } else if (strippedBytecode === strippedOnChainBytecode) {
    status = VerificationStatus.Partial;
  }

  return { status, errors, warnings };
};
