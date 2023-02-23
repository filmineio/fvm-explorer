import { Entity } from "@/enums/Entity";
import { Network } from "@/enums/Network";
import { NextApiRequest, NextApiResponse } from "next";

import { OperationStatus } from "@/types/ApiResponse";

import { getCtx } from "@/api/ctx/apiCtx";
import { identifyUser } from "@/api/utils/identifyUser";

import { standardizeResponse } from "@/utils/standardizeResponse";

export default async (req: NextApiRequest, res: NextApiResponse) => {
  const ctx = await getCtx();
  const user = await identifyUser(ctx, req);
  const body: Record<"network", Network> &
    Record<"contractAddresses", string[]> = req.body;

  if (user === OperationStatus.Error) return res.status(401).end();

  try {
    const result = await ctx.database.ch.data.chain[body.network].query({
      fieldName: Entity.ContractMeta,
      selection: [
        "contractAddress",
        "abiCid",
        "mainCid",
        "name",
        "compilerVersion",
        "fileMap",
        "sigCid",
        "binCid",
        "isPublic",
        "owner",
      ],
      query: [
        {
          ContractAddress: {
            in: body.contractAddresses,
          },
          Owner: {
            is: user.email,
          },
          IsPublic: {
            is: false,
          },
        },
        {
          ContractAddress: {
            in: body.contractAddresses,
          },
          IsPublic: {
            is: true,
          },
        },
      ],
      order: ["contractAddress", "ASC"],
      pagination: {
        limit: body.contractAddresses.length,
        offset: 0,
      },
    });

    return res.status(200).json(standardizeResponse(result));
  } catch (e) {
    return res.status(400).json({ exception: e });
  }
};
