// @ts-ignore
import { mainnet } from "@filecoin-shipyard/lotus-client-schema";
import { EthSchema } from "@/api/ctx/lotus/client/schemas/eth.schema";


export const CustomSchema = {
  methods: { ...mainnet.fullNode.methods, ...EthSchema },
};
