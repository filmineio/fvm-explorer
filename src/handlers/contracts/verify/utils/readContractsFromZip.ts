import fs from "fs";
import path from "path";
import unzipper from "unzipper";

// Read contracts from a zip archive
export const readContractsFromZip = async (filePath: string) => {
  const contracts: { [contractPath: string]: { content: string } } = {};

  const unzipStream = unzipper.Parse();
  const unzipFinish = new Promise((resolve) =>
    unzipStream.on("finish", resolve)
  );

  fs.createReadStream(filePath)
    .pipe(unzipStream)
    .on("entry", async (entry: unzipper.Entry) => {
      if (path.extname(entry.path) !== ".sol") {
        entry.autodrain();
        return;
      } else {
        const content = (await entry.buffer()).toString("utf8");

        contracts[entry.path] = { content };
      }
    });

  await unzipFinish;

  return contracts;
};
