import { NextApiRequest } from "next";

import { Maybe } from "@/types/Maybe";


export type AuthUtils = {
  extractAuthToken: (req: NextApiRequest) => Maybe<string>;
};
export const authUtils: AuthUtils = {
  extractAuthToken: (req) => {
    const token_header = req.headers.authorization;
    if (!token_header) {
      return null;
    }
    return token_header.split("Bearer").pop()?.trim();
  },
};