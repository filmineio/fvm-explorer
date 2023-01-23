import { formatNumber } from "../formatNumber";

test("formatNumber should handle undefined", () => {
  // @ts-ignore
  expect(formatNumber(undefined)).toBe("0");
});
test("formatNumber should handle string", () => {
  expect(formatNumber("6")).toBe("6");
});
test("formatNumber should format large numbers", () => {
  expect(formatNumber(6000)).toBe("6,000");
});