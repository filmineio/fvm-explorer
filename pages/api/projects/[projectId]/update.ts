import { Entity } from "@/enums/Entity";
import { NextApiRequest, NextApiResponse } from "next";

import { OperationStatus } from "@/types/ApiResponse";
import { Project } from "@/types/data/Project";

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

  const body: Pick<Project, "name"> = parse(req.body, { name: "" });

  if (!projectId || !projectId.trim())
    return res.status(400).json({ exception: "INVALID_REQUEST_BODY" });

  try {
    await ctx.database.ch.data.users.raw(
      `ALTER TABLE ${getModel(Entity.Project).table} UPDATE Name='${
        body.name
      }' where Id='${projectId}' AND Owner='${data.email}'`
    );

    return res.status(200).json(standardizeResponse([{ total: 1 }]));
  } catch (e) {
    return res.status(400).json({ exception: "UPDATE_FAILED" });
  }
};