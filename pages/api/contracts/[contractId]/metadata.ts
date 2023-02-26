import { Entity } from "@/enums/Entity";
import { Network } from "@/enums/Network";
import { CHMFieldQuery } from "@/schema/types/CHMQuery";
import { NextApiRequest, NextApiResponse } from "next";

import { OperationStatus } from "@/types/ApiResponse";
import { ContractMeta } from "@/types/data/ContractMeta";

import { getCtx } from "@/api/ctx/apiCtx";
import { identifyUser } from "@/api/utils/identifyUser";

import { standardizeResponse } from "@/utils/standardizeResponse";


export default async (req: NextApiRequest, res: NextApiResponse) => {
  const contractId = req.query.contractId as string;
  const network = req.query.network as Network;
  const ctx = await getCtx();
  const user = await identifyUser(ctx, req);
  const query: Record<string, CHMFieldQuery>[] = [
    {
      contractAddress: {
        is: contractId,
      },
      isPublic: {
        is: true,
      },
    },
  ];
  if (user !== OperationStatus.Error) {
    query.push({
      contractAddress: {
        is: contractId,
      },
      owner: {
        is: user.email,
      },
      isPublic: {
        is: false,
      },
    });
  }

  try {
    const response: (ContractMeta & Record<"total", number>)[] =
      await ctx.database.ch.data.chain[network].query({
        fieldName: Entity.ContractMeta,
        selection: [],
        query: query,
        order: ["contractAddress", "ASC"],
        pagination: {
          limit: 1,
          offset: 0,
        },
        final: true,
      });

    return res.status(200).json(standardizeResponse(response));
  } catch (e) {
    console.log(e);
    return res.status(400).json({ exception: e });
  }
};