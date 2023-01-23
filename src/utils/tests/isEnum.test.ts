import { isEnum } from "../isEnum";

export enum ExampleEntity {
  Contract = "Contract",
  Transaction = "Transaction",
  Block = "Block",
  Project = "Project",
}
describe("isExampleEntity", () => {
  it("should return true for a value that is a member of the ExampleEntity enum", () => {
    const value = ExampleEntity.Contract;
    expect(isEnum(ExampleEntity, value)).toBe(true);
  });

  it("should return false for a value that is not a member of the ExampleEntity enum", () => {
    const value = "test";
    expect(isEnum(ExampleEntity, value)).toBe(false);
  });

  it("should return false for a value that is a member of a different enum", () => {
    enum TestEnum {
      A,
      B,
      C,
    }
    const value = TestEnum.A;
    expect(isEnum(ExampleEntity, value)).toBe(false);
  });

  it("should return true for a value that is a member of a subtype of the ExampleEntity enum", () => {
    enum Subtype {
      Block = ExampleEntity.Block,
      Transaction = ExampleEntity.Transaction,
    }
    const value = ExampleEntity.Block;
    expect(isEnum(Subtype, value)).toBe(true);
  });

  it("should return false for a value that is not a member of a subtype of the ExampleEntity enum", () => {
    enum Subtype {
      Block = ExampleEntity.Block,
      Transaction = ExampleEntity.Transaction,
    }
    const value = ExampleEntity.Contract.toString();
    expect(isEnum(Subtype, value)).toBe(false);
  });
});
