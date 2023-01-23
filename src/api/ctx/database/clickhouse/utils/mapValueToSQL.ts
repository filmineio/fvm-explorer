export const mapValueToSQL = (value: unknown) => {
  return typeof value === "string" ? `'${value}'` : value;
};
