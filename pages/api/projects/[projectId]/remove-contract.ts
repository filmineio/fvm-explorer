import { projectChm } from "@/schema/entities/project.chm";
import { NextApiRequest, NextApiResponse } from "next";

import { OperationStatus } from "@/types/ApiResponse";

import { getCtx } from "@/api/ctx/apiCtx";

import { standardizeResponse } from "@/utils/standardizeResponse";
import { Contract } from "@/types/data/Contract";
import { Entity } from "@/enums/Entity";
import { Network } from "@/enums/Network";
import { omit } from "ramda";


export default async (req: NextApiRequest, res: NextApiResponse) => {
  const projectId = req.query.projectId as string;
  const ctx = await getCtx();
  // const data = await identifyUser(ctx, req);
  //
  // if (data === OperationStatus.Error) return res.status(401).end();

  const data = { email: "stankovic.srdjo@gmail.com" }

  const body: Pick<Contract, "contractAddress"> & Record<"network", Network> = req.body;

  if (!body.contractAddress?.trim() || !body.network?.trim())
    return res.status(400).json({ exception: "INVALID_REQUEST_BODY" });

  try {
    const [ project ] = await ctx.database.ch.data.users.query(
      {
        fieldName: Entity.Project,
        selection: [
          "contracts"
        ],
        query: [
          {
            Id: {
              is: projectId,
            }
          }
        ],
        order: [
          "Id", "ASC"
        ],
        pagination: {
          limit: 1,
          offset: 0,
        }
      }
    );

    if (!project) return res.status(404).json({ exception: "ENTITY_NOT_FOUND" });

    const result = await ctx.database.ch.data.users.update(
      projectChm,
      {
        id: { is: projectId },
        owner: { is: data.email },
      },
      {
        contracts: JSON.parse(project.contracts as never as string).filter((c: string) => c !== body.contractAddress)
      },
      "id"
    );

    if (result === OperationStatus.Error) throw "";

    return res.status(200).json(standardizeResponse(result));
  } catch (e) {
    return res.status(400).json({ exception: "UPDATE_FAILED" });
  }
};