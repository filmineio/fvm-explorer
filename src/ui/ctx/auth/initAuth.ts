import { UIConfig } from "../config/config";
import { InstanceWithExtensions, SDKBase } from "@magic-sdk/provider";
import { Magic, MagicSDKExtensionsOption } from "magic-sdk";

export type AuthClient = InstanceWithExtensions<
  SDKBase,
  // @ts-ignore
  MagicSDKExtensionsOption<string>
>;

export const initClientAuth = (
  config: UIConfig["magic"]
): (() => AuthClient) => {
  // @ts-ignore
  return () => new Magic(config.key);
};
