import fs from "fs";
import { Writable } from "stream";

import { ApiCtx } from "@/api/ctx/apiCtx";

// downloadFile downloads single file from web3.storage
export const downloadFile = async (
  ctx: ApiCtx,
  cid: string,
  filePath: string
): Promise<string> => {
  const response = await ctx.web3storage.get(cid);
  const responseFiles = await response?.files();

  if (!responseFiles) {
    throw new Error("No files found in response");
  }

  if (responseFiles.length === 0) {
    throw new Error("No files found in response");
  }

  // assume we only have one file uploaded to web3.storage per cid
  if (responseFiles.length > 1) {
    throw new Error("Too many files found in response");
  }

  const blob = responseFiles[0];

  // TODO: Make this limit configurable (currently 100MB)
  if (blob.size > 1e8) {
    throw new Error("File too large");
  }

  // save to disk
  const writer = Writable.toWeb(fs.createWriteStream(filePath));
  await blob.stream().pipeTo(writer);

  return filePath;
};
