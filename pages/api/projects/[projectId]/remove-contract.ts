import { Entity } from "@/enums/Entity";
import { Network } from "@/enums/Network";
import { NextApiRequest, NextApiResponse } from "next";

import { OperationStatus } from "@/types/ApiResponse";
import { Contract } from "@/types/data/Contract";
import { Project } from "@/types/data/Project";
import { ProjectContract } from "@/types/data/ProjectContract";

import { getCtx } from "@/api/ctx/apiCtx";
import { getModel } from "@/api/ctx/database/clickhouse/utils/getModel";
import { identifyUser } from "@/api/utils/identifyUser";

import { parse } from "@/utils/parse";
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

  const [project] = await ctx.database.ch.data.users.query<Project>({
    fieldName: Entity.Project,
    selection: [],
    query: [
      {
        id: {
          is: projectId,
        },
        owner: {
          is: data.email,
        },
      },
    ],
    order: ["id", "ASC"],
    pagination: {
      limit: 1,
      offset: 0,
    },
    final: true,
  });

  if (!project) return res.status(404).json({ exception: "ENTITY_NOT_FOUND" });

  const projectContracts: ProjectContract[] = parse(
    project.contracts as never,
    []
  );

  try {
    await ctx.database.ch.data.users.raw(
      `ALTER TABLE ${
        getModel(Entity.Project).table
      } UPDATE Contracts='${JSON.stringify(
        projectContracts.filter(
          (c) =>
            c.contractAddress !== body.contractAddress &&
            c.network !== body.network
        )
      )}' where Id='${projectId}' AND Owner='${data.email}'`
    );

    return res.status(200).json(standardizeResponse([{ total: 1 }]));
  } catch (e) {
    console.dir(e, { depth: 2 });
    return res.status(400).json({ exception: "UPDATE_FAILED" });
  }
};