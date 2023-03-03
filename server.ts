import { newContractKafkaSubscriber } from "./src/subscribers";
import { newKafkaConsumer } from "@/consumers/kafka";
import { handle as handleVerifyContract } from "@/handlers/contracts/verify/handler";
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

  console.log(`Server running at http://localhost:${port}; `);

  const hyperspaceKafkaConsumer = await newKafkaConsumer<KafkaEventMap>(
    ctx.kafka.hyperspace
  );

  await hyperspaceKafkaConsumer.subscribe(newContractKafkaSubscriber(ctx));
  await hyperspaceKafkaConsumer.startConsumer();
});
