import express, { Express } from "express";
import { productRouter } from "./router";
import "./config";
import { ENV } from "./config";

const app: Express = express();
app.use(express.json());
const PORT = ENV.APP_PORT;

app.use("/item", productRouter);

app.listen(PORT, () => {
  console.log(`Listening to port ${PORT}`);
});
