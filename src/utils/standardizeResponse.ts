import { Network } from "../enums/Network";
import { omit } from "ramda";

export const standardizeResponse = <
  T extends unknown & Record<"total", number>
>(
  data: T[],
  network?: Network
) => {
  return {
    network,
    total: data[0]?.total || data?.length,
    rows: data.map((v) => {
      if (v.total) {
        return omit(["total"], v);
      }
      return v;
    }),
  };
};