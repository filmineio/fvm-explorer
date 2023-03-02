import fs from "fs";
import { Writable } from "stream";

// downloadFile downloads single file from web3.storage
export const downloadFile = async (
  cid: string,
  filePath: string,
  fileName?: string
): Promise<string> => {
  // NOTE: Downloads file from w3s.link instead of using web3.storage client
  const url = fileName
    ? `https://w3s.link/ipfs/${cid}/${fileName}`
    : `https://w3s.link/ipfs/${cid}`;

  const response = await fetch(url);
  if (!response?.ok) {
    throw new Error("Failed to fetch file from web3.storage");
  }

  const blob = await response.blob();

  // TODO: Make this limit configurable (currently 100MB)
  if (blob.size > 1e8) {
    throw new Error("File too large");
  }

  // save to disk
  const writer = Writable.toWeb(fs.createWriteStream(filePath));
  await blob.stream().pipeTo(writer);

  return filePath;
};
