import { Network } from "@/enums/Network";
import axios from "axios";

const BASE_EXT_URL = (nwk: Network) => {
  switch (nwk) {
    case Network.HyperSpace:
      return `https://${nwk}.filfox.info/api/v1/`;
    case Network.Mainnet:
      return `https://filfox.info/api/v1/`;
    default:
      return `https://${nwk}.filfox.info/api/v1/`;
  }
};
export const get = async <T>(nwk: Network, path: string, def: T) => {
  try {
    const d = await axios.get(`${BASE_EXT_URL(nwk)}${path}`);
    return d.data as T;
  } catch (e) {
    console.dir(e, { depth: 2 });
    return def;
  }
};
