import { isString } from "../isString";

describe("isString", () => {
  it("should return true for a string value", () => {
    const value = "test";
    expect(isString(value)).toBe(true);
  });

  it("should return false for a non-string value", () => {
    const value = 123;
    expect(isString(value)).toBe(false);
  });

  it("should return false for a null value", () => {
    const value = null;
    expect(isString(value)).toBe(false);
  });

  it("should return false for an undefined value", () => {
    const value = undefined;
    expect(isString(value)).toBe(false);
  });

  it("should return false for a string that is a member of an enum", () => {
    enum TestEnum {
      A,
      B,
      C,
    }
    const value = TestEnum.A;
    expect(isString(value)).toBe(false);
  });

  it("should return true for a string that is a member of a union type", () => {
    type TestUnion = "A" | "B" | "C";
    const value = "A";
    expect(isString(value)).toBe(true);
  });
});
