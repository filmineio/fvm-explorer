import { Entity } from "@/enums/Entity";
import { Network } from "@/enums/Network";
import { projectChm } from "@/schema/entities/project.chm";
import { NextApiRequest, NextApiResponse } from "next";
import { omit } from "ramda";

import { OperationStatus } from "@/types/ApiResponse";
import { Contract } from "@/types/data/Contract";
import { ProjectContract } from "@/types/data/ProjectContract";

import { getCtx } from "@/api/ctx/apiCtx";
import { identifyUser } from "@/api/utils/identifyUser";

import { standardizeResponse } from "@/utils/standardizeResponse";

export default async (req: NextApiRequest, res: NextApiResponse) => {
  const projectId = req.query.projectId as string;
  const ctx = await getCtx();
  const data = await identifyUser(ctx, req);

  if (data === OperationStatus.Error) return res.status(401).end();

  const body: Pick<Contract, "contractAddress"> & Record<"network", Network> =
    req.body;

  if (!body.contractAddress?.trim() || !body.network?.trim())
    return res.status(400).json({ exception: "INVALID_REQUEST_BODY" });

  try {
    const [project] = await ctx.database.ch.data.users.query({
      fieldName: Entity.Project,
      selection: ["id", "name", "owner", "contracts"],
      query: [
        {
          Id: {
            is: projectId,
          },
          Owner: {
            is: data.email,
          },
        },
      ],
      order: ["Id", "ASC"],
      pagination: {
        limit: 1,
        offset: 0,
      },
      final: true,
    });

    if (!project)
      return res.status(404).json({ exception: "ENTITY_NOT_FOUND" });

    const result = await ctx.database.ch.data.users.update(
      projectChm,
      {
        id: { is: projectId },
        owner: { is: data.email },
      },
      {
        ...omit(["total"], project),
        contracts: JSON.parse(project.contracts as string).filter(
          (c: ProjectContract) =>
            c.contractAddress !== body.contractAddress &&
            c.network !== body.network
        ),
      },
      "id"
    );

    if (result === OperationStatus.Error) throw "";

    return res.status(200).json(standardizeResponse(result));
  } catch (e) {
    return res.status(400).json({ exception: "UPDATE_FAILED" });
  }
};
