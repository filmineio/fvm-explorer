import { ContractVerificationStatus } from "@/enums/ContractVerificationStatus";
import { extractMetadata } from "@/api/contracts/verify/utils/extractMetadata";

export const verifyBytecode = (
  onChainBytecode: string,
  contractBytecode: string
): ContractVerificationStatus => {
  const { strippedBytecode, metadataBytecode } =
    extractMetadata(contractBytecode);

  const {
    strippedBytecode: strippedOnChainBytecode,
    metadataBytecode: onChainMetadataBytecode,
  } = extractMetadata(onChainBytecode);

  if (
    strippedBytecode === strippedOnChainBytecode &&
    metadataBytecode === onChainMetadataBytecode
  ) {
    return ContractVerificationStatus.Full;
  } else if (strippedBytecode === strippedOnChainBytecode) {
    return ContractVerificationStatus.Partial;
  }

  return ContractVerificationStatus.Unverified;
};
