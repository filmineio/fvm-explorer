import { useMemo } from "react";

import { extractQueryParams } from "@/utils/extractQueryParams";

export const useLocationQuery = <T>() => {
  return useMemo(
    () =>
      extractQueryParams<T>(
        (
          (typeof location !== "undefined" ? location : {})?.search || ""
        ).replace("?", "")
      ),
    [(typeof location !== "undefined" ? location : {})?.search || ""]
  );
};