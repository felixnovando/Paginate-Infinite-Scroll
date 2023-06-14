import { Request, Response } from "express";
import { Product, ResponseType } from "../types";
import { mutate } from "../db/connection";
import { plainToInstance } from "class-transformer";
import { validateDTO } from "../util";
import { SeedItemDTO } from "../dto";
import json from "../db/data.json";

export const seedItem = async (req: Request, res: Response) => {
  const body = plainToInstance(SeedItemDTO, req.body);
  const errors = await validateDTO(body);

  if (errors !== null)
    return res.status(400).json(<ResponseType>{
      message: "invalid input",
      error: errors,
    });

  const { count } = body;

  if (count <= 0 || count > 10000)
    return res.status(400).json(<ResponseType>{
      message: "invalid input",
      error: ["count must be between 1 and 10000"],
    });

  const datas = json as Product[];

  let query = "INSERT INTO items VALUES ";

  for (let i = 0; i < count; i++)
    query += `(DEFAULT, '${datas[i].name}', ${datas[i].price}),`;

  query = query.substring(0, query.length - 1);

  const result = await mutate(query);

  if (result === null)
    return res.status(500).json(<ResponseType>{
      message: "seeding failed",
      error: ["Failed to Seed Data"],
    });

  return res.json(<ResponseType>{
    message: "success seed data",
    data: result,
  });
};
