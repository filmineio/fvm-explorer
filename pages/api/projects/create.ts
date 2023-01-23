import { projectChm } from "@/schema/entities/project.chm";
import { v4 } from "@lukeed/uuid";
import { NextApiRequest, NextApiResponse } from "next";

import { OperationStatus } from "@/types/ApiResponse";
import { Project } from "@/types/data/Project";

import { getCtx } from "@/api/ctx/apiCtx";
import { identifyUser } from "@/api/utils/identifyUser";

import { standardizeResponse } from "@/utils/standardizeResponse";


export default async (req: NextApiRequest, res: NextApiResponse) => {
  const ctx = await getCtx();
  const data = await identifyUser(ctx, req);

  if (data === OperationStatus.Error) return res.status(401).end();

  const body: Pick<Project, "name"> = req.body;

  if (!body.name?.trim())
    return res.status(400).json({ exception: "INVALID_REQUEST_BODY" });

  const newProjectId = Buffer.from(v4()).toString("hex");

  try {
    const result = await ctx.database.ch.data.users.create(
      projectChm,
      {
        name: body.name,
        owner: data.email as string,
        contracts: JSON.stringify({}) as any,
      },
      ["id", newProjectId]
    );

    if (result === OperationStatus.Error) throw "";
    return res.status(200).json(standardizeResponse(result));
  } catch (e) {
    return res.status(400).json({ exception: "CREATION_FAILED" });
  }
};