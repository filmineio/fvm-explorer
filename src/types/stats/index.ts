export type MinerStat = {
  address: string;
  rawBytePower: string;
  qualityAdjPower: string;
  blocksMined: number;
  weightedBlocksMined: number;
  totalRewards: string;
  rewardPerByte: number;
  rawBytePowerDelta: string;
  qualityAdjPowerDelta: string;
};

export type RichListEntryStat = {
  address: string;
  actor: string;
  balance: string;
  availableBalance: string;
  createHeight: number;
  createTimestamp: number;
  lastSeenHeight: number;
  lastSeenTimestamp: number;
};

export type LatestTipSetBlockStat = {
  cid: string;
  miner: string;
};

export type LatestTipSetStat = {
  height: string;
  blocks: LatestTipSetBlockStat[];
};

export type CalledContractStat = {
  contractAddress: string;
  timestamp: number;
};

export type OverviewStat = {
  height: number;
  timestamp: number;
  totalRawBytePower: string;
  totalQualityAdjPower: string;
  totalRawBytePowerDelta: string;
  totalQualityAdjPowerDelta: string;
  accounts: number;
  activeMiners: number;
  activeMinersGrowth: number;
  totalMaxSupply: string;
  totalSupply: string;
  circulatingSupply: string;
  burntSupply: string;
  totalPledgeCollateral: string;
  totalMultisigLockedBalance: string;
  totalMarketPledge: string;
  blockReward: string;
  dailyMessages: number;
  dailyCoinsMined: string;
  averageTipsetInterval: number;
  averageTipsetBlocks: number;
  averageTipsetWeightedBlocks: number;
  baseFee: string;
  averageRewardPerByte: number;
  estimatedInitialPledgeCollateral: number;
  sealCost: number;
  price: number;
  priceChangePercentage: number;
};

export type EthOverviewStat = {
  numContractsDeployed: string;
  numUniqueContractsDeployed: string;
  numContractsDeployedViaContracts: string;
  numEthAccounts: string;
  avgNumInteractionsPerContract: number;
  avgGasUsagePerContract: number;
  avgNumUniqueAddressesInteractingWithContract: number;
  filTransferredFromContracts: string;
  filTransferredToContracts: string;
  numCreateCallsEam: string;
  numCreate2CallsEam: string;
};

export type LatestTransactions = {
  cid: string;
  from: string;
  to: string;
  robustFrom: string;
  robustTo: string;
  value: string;
  messageRctGasUsed: string;
  timestamp: string;
  messageRctExitCode: string;
};

export type ApplicationStats = {
  richList: RichListEntryStat[];
  overview: OverviewStat;
  topMiners: MinerStat[];
  latestCalledContracts: CalledContractStat[];
  latestTipSets: LatestTipSetStat[];
  ethOverview: EthOverviewStat;
  latestTransactions: LatestTransactions[];
};
