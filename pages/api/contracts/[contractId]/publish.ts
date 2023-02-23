import { Entity } from "@/enums/Entity";
import { Network } from "@/enums/Network";
import { contactMetaChm } from "@/schema/entities/contact-meta.chm";
import { NextApiRequest, NextApiResponse } from "next";

import { OperationStatus } from "@/types/ApiResponse";
import { Contract } from "@/types/data/Contract";

import { getCtx } from "@/api/ctx/apiCtx";
import { identifyUser } from "@/api/utils/identifyUser";

import { standardizeResponse } from "@/utils/standardizeResponse";

export default async (req: NextApiRequest, res: NextApiResponse) => {
  const contractId = req.query.contractId as string;
  const body: Record<"network", Network> = req.body;
  const ctx = await getCtx();
  const user = await identifyUser(ctx, req);

  if (user === OperationStatus.Error) return res.status(401).end();

  try {
    const [contract]: (Contract & Record<"total", number>)[] =
      await ctx.database.ch.data.chain[body.network].query({
        fieldName: Entity.Contract,
        selection: ["contractId", "contractAddress"],
        query: [
          {
            ContractId: {
              is: contractId,
            },
          },
        ],
        order: ["ContractId", "ASC"],
        pagination: {
          limit: 1,
          offset: 0,
        },
        final: true,
      });

    if (!contract)
      return res.status(404).json({ exception: "ENTITY_NOT_FOUND" });

    const result = await ctx.database.ch.data.chain[body.network].update(
      contactMetaChm,
      {
        contractAddress: { is: contract.contractAddress },
        owner: { is: user.email },
      },
      {
        isPublic: true,
      },
      "contractAddress"
    );

    if (result === OperationStatus.Error)
      return res.status(400).json({ exception: "OPERATION_FAILED" });

    return res.status(200).json(standardizeResponse(result));
  } catch (e) {
    console.log(e);
    return res.status(400).json({ exception: e });
  }
};
