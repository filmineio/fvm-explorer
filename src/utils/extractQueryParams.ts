/*
  extractQueryParams
  Util for extraction of query params from search string
  @param dry
  Dry run does not covert  types, ex: code=67232 will be { code: "67232" }
*/

export const extractQueryParams = <T>(search: string, dry = false): T => {
  if (!search) return {} as T;

  return search
    .replace("?", "")
    .split("&")
    .reduce((data: T, item) => {
      const [k, v] = item.split("=");

      if (!k || !v) return data;

      if (dry) return { ...data, [k]: v };

      if (v.includes(",")) return { ...data, [k]: v.split(",") };

      if (["true", "false"].includes(v)) return { ...data, [k]: v === "true" };

      if (v === "null") return { ...data, [k]: null };

      if (!Number.isNaN(+v)) return { ...data, [k]: +v };

      return { ...data, [k]: v };
    }, {} as T);
};
