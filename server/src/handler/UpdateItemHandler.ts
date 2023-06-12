import { Request, Response } from "express";
import { ResponseType } from "../types";
import { mutate } from "../db/connection";
import { plainToInstance } from "class-transformer";
import { validateDTO } from "../util";
import { UpdateItemDTO } from "../dto";

export const updateItem = async (req: Request, res: Response) => {
  const body = plainToInstance(UpdateItemDTO, req.body);
  const errors = await validateDTO(body);

  if (errors !== null)
    return res.status(400).json(<ResponseType>{
      message: "invalid input",
      error: errors,
    });

  const { id, name, price } = body;

  const result = await mutate(
    `UPDATE items SET name='${name}', price=${price} WHERE id = ${id}`
  );

  if (result === null)
    return res.status(500).json(<ResponseType>{
      message: "update failed",
      error: ["Failed to Update Data"],
    });

  return res.json(<ResponseType>{
    message: "success",
    data: result,
  });
};
