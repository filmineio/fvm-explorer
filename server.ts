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

app.listen(port, async () => {
  console.log(`Server running at http://localhost:${port}; `);
});