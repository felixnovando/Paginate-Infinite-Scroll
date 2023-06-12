import dotenv from "dotenv";

dotenv.config({
  path: ".env",
});

export const ENV = {
  APP_PORT: Number(process.env.APP_PORT),
  DB_HOST: process.env.DB_HOST,
  DB_PORT: Number(process.env.DB_PORT),
  DB_NAME: process.env.DB_NAME,
  DB_USER: process.env.DB_USER,
  DB_PASSWORD: process.env.DB_PASSWORD,
};
