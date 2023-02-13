import { StandardJSONInput } from "@/api/ctx/contracts/verify/types/StandardJSONInput";

// findContract finds the contract path in the input
export const findContractPath = (input: StandardJSONInput, contractName: string) => {
  return Object.keys(input.sources).find((contractPath) => {
    const { content } = input.sources[contractPath];
    return content.includes(`contract ${contractName}`);
  });
};

