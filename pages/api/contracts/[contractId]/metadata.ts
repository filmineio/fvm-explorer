import { Entity } from "@/enums/Entity";
import { Network } from "@/enums/Network";
import { NextApiRequest, NextApiResponse } from "next";
import { omit } from "ramda";

import { OperationStatus } from "@/types/ApiResponse";
import { Contract } from "@/types/data/Contract";
import { ContractMeta } from "@/types/data/ContractMeta";

import { getCtx } from "@/api/ctx/apiCtx";
import { identifyUser } from "@/api/utils/identifyUser";

export default async (req: NextApiRequest, res: NextApiResponse) => {
  const contractId = req.query.contractId as string;
  const network = req.query.network as Network;
  const ctx = await getCtx();
  const user = await identifyUser(ctx, req);

  if (user === OperationStatus.Error) return res.status(401).end();

  try {
    const [contract]: (Contract & Record<"total", number>)[] =
      await ctx.database.ch.data.chain[network].query({
        fieldName: Entity.Contract,
        selection: ["contractId", "contractAddress"],
        query: [
          {
            contractId: {
              is: contractId,
            },
          },
        ],
        order: ["contractId", "ASC"],
        pagination: {
          limit: 1,
          offset: 0,
        },
        final: true,
      });

    if (!contract)
      return res.status(404).json({ exception: "ENTITY_NOT_FOUND" });

    const [contractMeta]: (ContractMeta & Record<"total", number>)[] =
      await ctx.database.ch.data.chain[network].query({
        fieldName: Entity.ContractMeta,
        selection: [],
        query: [
          {
            contractAddress: {
              is: contract.contractAddress,
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
              is: contract.contractAddress,
            },
            isPublic: {
              is: true,
            },
          },
        ],
        order: ["contractAddress", "ASC"],
        pagination: {
          limit: 1,
          offset: 0,
        },
        final: true,
      });

    if (!contractMeta)
      return res.status(404).json({ exception: "ENTITY_NOT_FOUND" });

    return res.status(200).json(omit(["total"], contractMeta));
  } catch (e) {
    console.log(e);
    return res.status(400).json({ exception: e });
  }
};
