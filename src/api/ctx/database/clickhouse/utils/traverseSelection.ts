type Inner = Record<string, boolean> | Record<string, Schema>;
type Schema = {
  query: Inner;
  root: string;
};
export function traverseSelection(
  map: { [x: string]: { [x: string]: string | number } },
  schema: Schema,
  data: { [x: string]: any }
): Record<string, unknown> {
  return Object.keys(schema.query).reduce((p, c) => {
    if (typeof schema.query[c] === "boolean") {
      return Object.assign(p, { [c]: data[map[schema.root][c]] });
    }

    return Object.assign(p, {
      [c]: traverseSelection(map, schema.query[c] as Schema, data),
    });
  }, {});
}
