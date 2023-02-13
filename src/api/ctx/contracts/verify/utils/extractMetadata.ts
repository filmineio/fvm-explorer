type ExtractMetadata = (runtimeBytecode: string) => {
  strippedBytecode: string;
  metadataBytecode: string;
};

export const extractMetadata: ExtractMetadata = (runtimeBytecode: string) => {
  const regex = /a264(?:(?!a264).)*0033/;
  const match = runtimeBytecode.match(regex);

  if (!match) {
    return {
      strippedBytecode: runtimeBytecode,
      metadataBytecode: "",
    };
  }

  const metadataBytecode = match[0];
  const strippedBytecode = runtimeBytecode.replace(metadataBytecode, "");

  return {
    strippedBytecode,
    metadataBytecode,
  };
};
