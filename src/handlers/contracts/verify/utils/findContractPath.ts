import { SolcStandardJSONInput } from "@/handlers/contracts/verify/types/SolcStandardJSONInput";

// findContract finds the contract path in the input
export const findContractPath = (input: SolcStandardJSONInput, contractName: string) => {
  return Object.keys(input.sources).find((contractPath) => {
    const { content } = input.sources[contractPath];
    return content.includes(`contract ${contractName}`);
  });
};

