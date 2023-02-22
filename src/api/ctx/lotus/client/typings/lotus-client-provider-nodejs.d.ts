declare module '@filecoin-shipyard/lotus-client-provider-nodejs' {
  class NodejsProvider {
    constructor(endpoint: string, options: Record<string, unknown>);
  }

  export { NodejsProvider };
}
