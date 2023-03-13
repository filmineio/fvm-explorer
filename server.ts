import { newKafkaConsumer } from "@/consumers/kafka";
import { Network } from "@/enums/Network";
import { handle as handleVerifyContract } from "@/handlers/contracts/verify/handler";
import { newContractKafkaSubscriber } from "@/subscribers/contracts";
import { KafkaEventMap } from "@/subscribers/eventMaps";
import bodyParser from "body-parser";
import cors from "cors";
import * as dotenv from "dotenv";
import express from "express";
import morgan from "morgan";

import { getCtx } from "@/api/ctx/apiCtx";
import { apiConfig } from "@/api/ctx/config/config";

dotenv.config();

const app = express();
const port = process.env.CUSTOM_SERVER_PORT || 4000;

app.use(bodyParser.json());
app.use(morgan("dev"));
app.use(cors());

const config = apiConfig(process.env);
app.get("/", async (req, res) => {
  const ctx = await getCtx(config);
  res.send("Hello World!");
});

app.post("/api/contracts/:contractAddress/verify", async (req, res) => {
  const ctx = await getCtx(config);
  handleVerifyContract(ctx, req, res);
});

app.listen(port, async () => {
  const ctx = await getCtx(config);

  console.log(`Server running at http://localhost:${ port }; `);


  const mainnetKafkaConsumer = await newKafkaConsumer<KafkaEventMap>(
    ctx,
    Network.Mainnet
  );
  const hyperspaceKafkaConsumer = await newKafkaConsumer<KafkaEventMap>(
    ctx,
    Network.HyperSpace
  );

  await hyperspaceKafkaConsumer.subscribe(newContractKafkaSubscriber(ctx));
  await mainnetKafkaConsumer.subscribe(newContractKafkaSubscriber(ctx));
  await Promise.all([
    mainnetKafkaConsumer.startConsumer(),
    hyperspaceKafkaConsumer.startConsumer(),
  ])
});
