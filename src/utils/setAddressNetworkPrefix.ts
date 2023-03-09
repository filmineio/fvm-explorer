export const setAddressNetworkPrefix = (
  address: string,
  networkPrefix: string
) => {
  return address.replace(/^t|f/, networkPrefix);
};
