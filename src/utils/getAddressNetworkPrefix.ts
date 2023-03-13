import { Network } from "@/enums/Network";

export const getNetworkPrefix = (network: Network): string => {
  switch (network) {
    case Network.Mainnet:
      return "f";
    case Network.HyperSpace:
      return "t";
    default:
      return "t";
  }
};
