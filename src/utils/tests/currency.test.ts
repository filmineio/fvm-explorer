import { formatCurrency } from "../currency";

test("formatCurrency should format 1000 as $1,000.00", () => {
  const value = 1000;
  expect(formatCurrency(value)).toBe("$1,000.00");
});

test("formatCurrency with `replaceDoubleZero` set to true should format 1000 as $1,000", () => {
  const value = 1000;
  expect(formatCurrency(value, true)).toBe("$1,000");
});
