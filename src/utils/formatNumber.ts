export const formatNumber = (value: number | string) => {
  return Intl.NumberFormat("en-US").format(+value || 0);
};
