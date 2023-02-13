import { VerificationStatus } from "@/api/ctx/contracts/verify/enums/VerificationStatus";
import { extractMetadata } from "@/api/ctx/contracts/verify/utils/extractMetadata";

export const verifyBytecode = (
  onChainBytecode: string,
  contractBytecode: string
): VerificationStatus => {
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
    return VerificationStatus.Full;
  } else if (strippedBytecode === strippedOnChainBytecode) {
    return VerificationStatus.Partial;
  }

  return VerificationStatus.Unverified;
};
