import * as process from "process";

export type W3sConfig = {
  token: string;
};

const w3sConfig: W3sConfig = {
  token: process.env.NEXT_PUBLIC_WEB3_STORAGE_TOKEN as string,
};

export default w3sConfig;