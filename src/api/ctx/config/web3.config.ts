export type Web3StorageConfig = {
  token: string;
};

const web3StorageConfig: (env?: typeof process.env) => Web3StorageConfig = (
  env = process.env
) => ({
  token: process.env.NEXT_PUBLIC_WEB3_STORAGE_TOKEN as string,
});

export default web3StorageConfig;
