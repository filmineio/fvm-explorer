export type ContractMeta = {
  contractAddress: string;
  abiCid: string;
  mainCid: string;
  name: string;
  compilerVersion: string;
  fileMap: Record<string, string>;
  sigCid: string;
  binCid: string;
  isPublic: boolean;
  owner: string;
};
