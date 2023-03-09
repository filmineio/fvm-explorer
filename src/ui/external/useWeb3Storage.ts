import axios from "axios";
import { lensPath, set } from "ramda";
import { useState } from "react";

import { uiCtx } from "@/ui/ctx/uiCtx";

export const useWeb3Storage = <T = unknown>() => {
  const [state, setState] = useState<{
    error: string;
    loading: boolean;
    data?: T;
    progress: string;
  }>({
    error: "",
    loading: false,
    data: undefined,
    progress: "",
  });

  const upload = (inputFile: File, fileNameOverride?: string) => {
    setState((p) => set(lensPath(["loading"]), true)(p));

    let file = new File([inputFile], fileNameOverride || inputFile.name, {
      type: inputFile.type,
    });

    let uploaded = 0;

    const onStoredChunk = (size: number) => {
      uploaded += size;
      const pct = 100 * (uploaded / size);
      setState((p) => set(lensPath(["progress"]), pct.toFixed(2))(p));
    };

    uiCtx
      .w3s()
      .put([file], { onStoredChunk })
      .then((v) => {
        setState((p) => set(lensPath(["data"]), v)(p));
      })
      .catch((e) => {
        console.log(e);
        setState((p) => set(lensPath(["error"]), "Something Went Wrong")(p));
      })
      .finally(() => setState((p) => set(lensPath(["loading"]), false)(p)));
  };

  const retrieve = (fileCid: string) => {
    setState((p) => set(lensPath(["loading"]), true)(p));
    axios
      .get(
        `https://${fileCid.slice(
          0,
          fileCid.indexOf("/")
        )}.ipfs.dweb.link/${fileCid.slice(fileCid.indexOf("/") + 1)}`
      )
      .then((res) => {
        if (!res || res.status >= 300) {
          return setState((p) =>
            set(lensPath(["error"]), "Something Went Wrong")(p)
          );
        }

        setState((p) => set(lensPath(["data"]), res.data)(p));
      })
      .catch((e) => {
        console.log(e);
        setState((p) => set(lensPath(["error"]), "Something Went Wrong")(p));
      })
      .finally(() => setState((p) => set(lensPath(["loading"]), false)(p)));
  };

  return { upload, retrieve, ...state };
};