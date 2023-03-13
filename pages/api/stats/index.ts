// TODO Implement followind
import { Network } from "@/enums/Network";
import { Stats } from "@/enums/Stats";
import { NextApiRequest, NextApiResponse } from "next";
import { hasPath } from "ramda";

import { ApiCtx, getCtx } from "@/api/ctx/apiCtx";
import { get } from "@/api/stats/external/get";
import { getEthOverview } from "@/api/stats/internal/getEthOverview";
import { getLastCalled } from "@/api/stats/internal/getLastCalled";
import { getLatestTipSets } from "@/api/stats/internal/getLatestTipSets";

import { isEnum } from "@/utils/isEnum";


const __CACHE: Record<string, unknown> = {};

const ALL_STATS = Object.values(Stats);

const resolveSingle = (ctx: ApiCtx, ntwk: Network) => async (stat: Stats) => {
  switch (stat) {
    case Stats.RichList:
      return (
        await get(ntwk, "rich-list?pageSize=10&page=0", { richList: [] })
      ).richList.slice(0, 5);
    case Stats.Overview:
      return get(ntwk, "overview", {});
    case Stats.TopMiners:
      return (
        await get(ntwk, "miner/top-miners/power?count=20", { miners: [] })
      ).miners.slice(0, 5);
    case Stats.LatestCalledContracts:
      return getLastCalled(ntwk, ctx);
    case Stats.LatestTipSets:
      return getLatestTipSets(ntwk, ctx);
    case Stats.EthOverview:
      return getEthOverview(ntwk, ctx);
  }
};

const resolveStats = async (nwk: Network, ctx: ApiCtx, stats: Stats[]) => {
  const resolver = resolveSingle(ctx, nwk);

  const data = await Promise.all(stats.map(resolver));

  return Object.fromEntries(stats.map((v, i) => [v, data[i]]));
};

export default async (req: NextApiRequest, res: NextApiResponse) => {
  const network: Network = req.query.network as Network;

  if (!isEnum(Network, network)) {
    return res.status(400).json({ exception: "INVALID_NETWORK" });
  }

  let stats: Stats[] = (req.query.stats as string).split(",") as Stats[];
  const invalid = stats.filter((s) => !isEnum(Stats, s));

  if (invalid.length) {
    return res.status(400).json({
      exception: "INVALID_STATISTICS_REQUESTED",
      message: `Requested invalid statistics: ${invalid.join(
        ", "
      )}, available statistics: ${ALL_STATS}`,
    });
  }

  if (!stats.length) {
    console.log("Empty stats list defaulting to full list");
    stats = ALL_STATS;
  }

  const ctx = await getCtx();
  const statsKey = stats.join(".");

  if (hasPath([statsKey], __CACHE)) {
    console.log("Cache Found");
    return res.status(200).json(__CACHE[statsKey]);
  }

  const all = await resolveStats(network, ctx, stats);
  __CACHE[statsKey] = all;

  res.status(200).json(all);
};