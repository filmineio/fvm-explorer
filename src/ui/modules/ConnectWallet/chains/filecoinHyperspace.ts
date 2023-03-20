export const filecoinHyperspaceTestnet = {
  name: "Filecoin - Hyperspace testnet",
  chain: "FIL",
  icon: {
    url: "https://filecoin-io.ipns.dweb.link/images/filecoin-logo.svg",
    height: 512,
    width: 512,
    format: "svg",
    sizes: [512, 256, 128, 64, 32, 16],
  },
  rpc: [
    "https://rpc.ankr.com/filecoin_testnet",
    "https://api.hyperspace.node.glif.io/rpc/v1",
    "https://filecoin-hyperspace.chainstacklabs.com/rpc/v1",
    "https://api.hyperspace.node.glif.io/rpc/v1",
    "https://api.hyperspace.node.glif.io/rpc/v1",
  ],
  features: [],
  faucets: [],
  nativeCurrency: {
    name: "Filecoin",
    symbol: "tFIL",
    decimals: 18,
  },
  infoURL: "https://filecoin.org",
  shortName: "fil",
  chainId: 3141,
  networkId: 3141,
  slip44: 60,
  ens: {
    registry: "0x0000000000000000000000000000000000000000",
  },
  explorers: [
    {
      name: "filmine",
      url: "https://explorer.filmine.io",
      standard: "",
    },
  ],
  testnet: true,
  slug: "filecoin",
};

