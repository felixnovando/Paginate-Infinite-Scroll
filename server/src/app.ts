import express, { Express } from "express";
import { productRouter } from "./router";
import "./config";
import { ENV } from "./config";
import cors from "cors";

const app: Express = express();
app.use(express.json());
app.use(
  cors({
    allowedHeaders: "*",
    origin: "*",
  })
);
const PORT = ENV.APP_PORT;

app.use("/item", productRouter);

app.listen(PORT, () => {
  console.log(`Listening to port ${PORT}`);
});
