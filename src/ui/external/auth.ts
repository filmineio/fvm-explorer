import { uiCtx } from "../ctx/uiCtx";
import { MagicUserMetadata } from "magic-sdk";

import { useStore } from "@/ui/state/Store";
import { setUserTransformer } from "@/ui/state/transformers/user/setUser.transformer";

export type AuthApi = {
  login: (email: string) => Promise<void>;
  me: () => Promise<void>;
};

export const useAuthApiClient: () => AuthApi = () => {
  const { mod } = useStore();
  const login = async (email: string) => {
    try {
      const extToken = await uiCtx
        .auth()
        .auth.loginWithMagicLink({ email: email, showUI: false });

      if (!extToken) throw "";

      localStorage.setItem("token", extToken);

      await me();
    } catch (e) {
      mod(setUserTransformer(null));
    }
  };

  const me = async () => {
    try {
      const { data } = await uiCtx.client().get<MagicUserMetadata>("/auth/me");
      mod(setUserTransformer(data));
    } catch (e) {
      mod(setUserTransformer(null));
    }
  };

  return { login, me };
};