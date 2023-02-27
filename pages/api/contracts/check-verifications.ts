import { Entity } from "@/enums/Entity";
import { Network } from "@/enums/Network";
import { NextApiRequest, NextApiResponse } from "next";

import { OperationStatus } from "@/types/ApiResponse";

import { getCtx } from "@/api/ctx/apiCtx";
import { identifyUser } from "@/api/utils/identifyUser";

import { standardizeResponse } from "@/utils/standardizeResponse";

export default async (req: NextApiRequest, res: NextApiResponse) => {
  const ctx = await getCtx();
  const network = req.query.network as Network;
  const contractAddresses = ((req.query.contractAddresses as string) || "")
    .split(",")
    .filter((x) => x !== "");

  if (!network || contractAddresses.length === 0)
    return res.status(400).json({ exception: "INVALID_REQUEST_PARAMS" });

  const user = await identifyUser(ctx, req);

  if (user === OperationStatus.Error) return res.status(401).end();

  try {
    const result = await ctx.database.ch.data.chain[network].query({
      fieldName: Entity.ContractMeta,
      selection: [],
      query: [
        {
          contractAddress: {
            in: contractAddresses,
          },
          owner: {
            is: user.email,
          },
          isPublic: {
            is: false,
          },
        },
        {
          contractAddress: {
            in: contractAddresses,
          },
          isPublic: {
            is: true,
          },
        },
      ],
      order: ["contractAddress", "ASC"],
      pagination: {
        limit: contractAddresses.length,
        offset: 0,
      },
      final: true,
    });

    return res.status(200).json(standardizeResponse(result));
  } catch (e) {
    console.log(e);
    return res.status(400).json({ exception: e });
  }
};
