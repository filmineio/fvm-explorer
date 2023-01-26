export const toHumanReadable = (str: string) => {
  return str
    .replace(/_/g, " ")
    .replace(/([a-z])([A-Z])/g, "$1 $2")
    .toLowerCase()
    .replace(/(^|\s)\S/g, function (t) {
      return t.toUpperCase();
    });
};
