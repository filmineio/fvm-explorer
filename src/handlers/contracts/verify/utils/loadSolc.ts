const solc = require("solc");

export const loadSolc = async (version: string): Promise<unknown> => {
  return new Promise((resolve, reject) => {
    solc.loadRemoteVersion(version, (err: any, solcSnapshot: unknown) => {
      if (err) {
        reject(err);
      }
      resolve(solcSnapshot);
    });
  });
};
