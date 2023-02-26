import { lensPath, set } from "ramda";
import { useState } from "react";

import { uiCtx } from "@/ui/ctx/uiCtx";

export const useWeb3Storage = <T = unknown>() => {
  const [state, setState] = useState<{
    error: string;
    loading: boolean;
    data?: T;
    progress: number;
  }>({
    error: "",
    loading: false,
    data: undefined,
    progress: 0,
  });

  const upload = (file: File) => {
    setState((p) => set(lensPath(["loading"]), true)(p));

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
    uiCtx
      .w3s()
      .get(fileCid)
      .then((res) => {
        if (!res || !res.ok) {
          return setState((p) =>
            set(lensPath(["error"]), "Something Went Wrong")(p)
          );
        }

        res.files().then((v) => {
          setState((p) => set(lensPath(["data"]), v)(p));
        });
      })
      .catch((e) => {
        console.log(e);
        setState((p) => set(lensPath(["error"]), "Something Went Wrong")(p));
      })
      .finally(() => setState((p) => set(lensPath(["loading"]), false)(p)));
  };

  return { upload, retrieve, ...state };
};