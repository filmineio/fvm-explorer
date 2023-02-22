declare module '@filecoin-shipyard/lotus-client-schema' {
  type Schema = Record<string, Record>
  type Mainnet = { fullNode: { methods:  Schema } };
  const mainnet: Mainnet;

  export { mainnet };
}
