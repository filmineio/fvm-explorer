export const transformE = (e: any) => {
  return Object.entries(e).reduce(
    (p, [k, v]) =>
      Number.isNaN(+k) ? Object.assign(p, { [k]: { value: v } }) : p,
    {}
  );
};
