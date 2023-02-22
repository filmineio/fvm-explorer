export type Web3StorageConfig = {
  token: string;
};

const web3StorageConfig: Web3StorageConfig = {
  token: process.env.WEB3_STORAGE_TOKEN as string,
};

export default web3StorageConfig;