import { parseSolidityVersion } from "../parseSolidityVersion";

describe("parseSolidityVersion", () => {
  it("should return undefined when fileContents does not contain a valid Solidity pragma", () => {
    const fileContents = "contract Test {}";
    expect(parseSolidityVersion(fileContents)).toBeNull();
  });

  it("should return the exect version when version specifier is not present", () => {
    const fileContents = "pragma solidity 0.8.0;";
    expect(parseSolidityVersion(fileContents)).toEqual(
      "v0.8.0+commit.c7dfd78e"
    );
  });

  it('should return the latest patch version that satisfies "^" specifier', () => {
    const fileContents = "pragma solidity ^0.8.0;";
    expect(parseSolidityVersion(fileContents)).toEqual(
      "v0.8.19+commit.7dd6d404"
    );
  });

  it('should return the latest version that satisfies ">=" specifier', () => {
    const fileContents = "pragma solidity >=0.7.0;";
    expect(parseSolidityVersion(fileContents)).toEqual(
      "v0.8.19+commit.7dd6d404"
    );
  });

  it('should return the latest version that satisfies ">" specifier', () => {
    const fileContents = "pragma solidity >0.7.0;";
    expect(parseSolidityVersion(fileContents)).toEqual(
      "v0.8.19+commit.7dd6d404"
    );
  });

  it('should return the latest version that satisfies "<=" specifier', () => {
    const fileContents = "pragma solidity <=0.8.1;";
    expect(parseSolidityVersion(fileContents)).toEqual(
      "v0.8.1+commit.df193b15"
    );
  });

  it('should return the latest version that satisfies "<" specifier', () => {
    const fileContents = "pragma solidity <0.8.1;";
    expect(parseSolidityVersion(fileContents)).toEqual(
      "v0.8.0+commit.c7dfd78e"
    );
  });

  it("should return undefined when no versions satisfy the version specifier", () => {
    const fileContents = "pragma solidity <0.5.0;";
    expect(parseSolidityVersion(fileContents)).toEqual(
      "v0.4.26+commit.4563c3fc"
    );
  });
});
