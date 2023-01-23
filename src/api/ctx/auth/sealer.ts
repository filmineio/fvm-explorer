import Iron from "@hapi/iron";

import { AuthConfig } from "@/api/ctx/config/auth.config";

export type Sealer = {
  seal: <D>(data: D) => Promise<string>;
  unseal: <D>(data: string) => Promise<D>;
};

export const initSealer = (config: AuthConfig): Sealer => {
  const seal = async <D>(data: D) => {
    return Iron.seal(data, config.encryptionSecret, Iron.defaults);
  };
  const unseal = async <D>(data: string): Promise<D> => {
    return Iron.unseal(data, config.encryptionSecret, Iron.defaults);
  };

  return { seal, unseal };
};
