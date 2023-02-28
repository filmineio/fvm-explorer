export type SolcStandardJSONInput = {
  language: string;
  sources: {
    [key: string]: {
      content: string;
    };
  };
  settings: {
    outputSelection: {
      [key: string]: {
        [key: string]: string[];
      };
    };
  };
};
