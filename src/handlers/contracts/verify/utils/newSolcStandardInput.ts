export const newSolcStandardInput = (sources: any, settings: any) => {
  const defaultSettings = {
    optimizer: {
      enabled: false,
      runs: 200,
    },
    outputSelection: {
      "*": {
        "*": ["*"],
      },
    },
  };

  return {
    language: "Solidity",
    sources: sources,
    settings: { ...defaultSettings, ...settings },
  };
};
