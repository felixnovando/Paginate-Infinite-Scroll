import { Request, Response } from "express";
import { ResponseType } from "../types";
import { mutate } from "../db/connection";
import { plainToInstance } from "class-transformer";
import { validateDTO } from "../util";
import { InsertItemDTO } from "../dto";

export const insertItem = async (req: Request, res: Response) => {
  const body = plainToInstance(InsertItemDTO, req.body);
  const errors = await validateDTO(body);

  if (errors !== null || body.price <= 0) {
    let finError: string[] = [];

    if (errors)
      finError = [...errors];
    if (body.price <= 0)
      finError.push("price must at least 1");

    return res.status(400).json(<ResponseType>{
      message: "invalid inputs",
      error: finError,
    });
  }

  const { name, price } = body;

  const result = await mutate(
    `INSERT INTO items VALUES (DEFAULT, '${name}', ${price})`
  );

  if (result === null)
    return res.status(500).json(<ResponseType>{
      message: "insert failed",
      error: ["Failed to Insert Data"],
    });

  return res.json(<ResponseType>{
    message: "success insert item",
    data: result
  });
};
