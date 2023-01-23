import { Network } from "../enums/Network";

export const standardizeResponse = <
  T extends unknown & Record<"total", number>
>(
  data: T[],
  network?: Network
) => {
  return {
    network,
    total: data[0]?.total || 0,
    rows: data.map(({ total, ...rest }) => rest),
  };
};