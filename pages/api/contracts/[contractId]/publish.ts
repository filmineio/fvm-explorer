import { Entity } from "@/enums/Entity";
import { Network } from "@/enums/Network";
import { NextApiRequest, NextApiResponse } from "next";

import { OperationStatus } from "@/types/ApiResponse";

import { getCtx } from "@/api/ctx/apiCtx";
import { getModel } from "@/api/ctx/database/clickhouse/utils/getModel";
import { identifyUser } from "@/api/utils/identifyUser";

import { standardizeResponse } from "@/utils/standardizeResponse";


export default async (req: NextApiRequest, res: NextApiResponse) => {
  const contractId = req.query.contractId as string;
  const body: Record<"network", Network> = req.body;
  const ctx = await getCtx();
  const user = await identifyUser(ctx, req);

  if (user === OperationStatus.Error) return res.status(401).end();

  try {
    await ctx.database.ch.data.users.raw(
      `ALTER TABLE ${
        getModel(Entity.ContractMeta).table
      } UPDATE IsPublic=true where ContractAddress='${contractId}' AND Owner='${
        user.email
      }' AND IsPublic=false`
    );

    const result = await ctx.database.ch.data.chain[body.network].query({
      query: [
        {
          contractAddress: {
            is: contractId,
          },
          owner: {
            is: user.email,
          },
          isPublic: {
            is: true,
          },
        },
      ],
      fieldName: Entity.ContractMeta,
      selection: [],
      order: ["contractAddress", "ASC"],
      pagination: {
        limit: 1,
        offset: 0,
      },
    });

    return res.status(200).json(standardizeResponse(result));
  } catch (e) {
    console.log(e);
    return res.status(400).json({ exception: e });
  }
};