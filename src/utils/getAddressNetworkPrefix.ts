import { Network } from "@/enums/Network";

export const getNetworkPrefix = (network: Network): string => {
  switch (network) {
    case Network.Wallaby:
      return "t";
    case Network.HyperSpace:
      return "t";
    default:
      return "t";
  }
};
