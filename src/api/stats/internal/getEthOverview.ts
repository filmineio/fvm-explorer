import { Network } from "@/enums/Network";

import { ApiCtx } from "@/api/ctx/apiCtx";

const ALL_ETH = (nwk: Network) => `
SELECT 
    COUNT(DISTINCT ContractId) AS numContractsDeployed,
    COUNT(DISTINCT contracts.ContractAddress) AS numUniqueContractsDeployed,
    COUNT(DISTINCT CASE WHEN messages.RobustFrom = contracts.ContractAddress AND messages.To = '${
      nwk === Network.HyperSpace ? "t010" : "f010"
    }' AND messages.MessageRctExitCode = 0 THEN contracts.ContractAddress ELSE NULL END) AS numContractsDeployedViaContracts,
    COUNT(DISTINCT CASE WHEN contracts.EthAddress != '' THEN contracts.EthAddress ELSE NULL END) AS numEthAccounts,
    COUNT(COALESCE(messages.RobustTo, messages.RobustFrom)) / COUNT(DISTINCT ContractId) AS avgNumInteractionsPerContract,
    AVG(messages.MessageRctGasUsed) AS avgGasUsagePerContract,
    COUNT(DISTINCT CASE WHEN messages.RobustTo = contracts.ContractAddress OR messages.RobustFrom = contracts.ContractAddress THEN COALESCE(messages.RobustTo, messages.RobustFrom) ELSE NULL END) / COUNT(DISTINCT CASE WHEN messages.RobustTo = contracts.ContractAddress OR messages.RobustFrom = contracts.ContractAddress THEN ContractId ELSE NULL END) AS avgNumUniqueAddressesInteractingWithContract,
    SUM(CASE WHEN messages.RobustFrom = contracts.ContractAddress AND messages.Value > 0 THEN messages.Value ELSE 0 END) AS filTransferredFromContracts,
    SUM(CASE WHEN messages.RobustTo = contracts.ContractAddress AND messages.Value > 0 THEN messages.Value ELSE 0 END) AS filTransferredToContracts,
    COUNT(DISTINCT CASE WHEN messages.Method IN [2,3] AND messages.To = '${
      nwk === Network.HyperSpace ? "t010" : "f010"
    }' AND messages.MessageRctExitCode = 0 THEN messages.Cid ELSE NULL END) AS numCreateCallsEam,
    COUNT(DISTINCT CASE WHEN messages.Method IN [4] AND messages.To = '${
      nwk === Network.HyperSpace ? "t010" : "f010"
    }' AND messages.MessageRctExitCode = 0  THEN messages.Cid ELSE NULL END) AS numCreate2CallsEam
FROM flow.contracts
LEFT JOIN flow.messages ON contracts.ContractAddress = messages.RobustTo OR contracts.ContractAddress = messages.RobustFrom
WHERE messages.Height IS NOT NULL

`;
export const getEthOverview = async (ntwk: Network, ctx: ApiCtx) => {
  return (
    (await (
      await ctx.database.ch.data.chain[ntwk].raw(ALL_ETH(ntwk))
    ).json()) as Record<"data", unknown[]>
  ).data[0];
};