import { Request, Response } from "express";
import { ResponseType } from "../types";
import { plainToInstance } from "class-transformer";
import { validateDTO } from "../util";
import { UpdateItemDTO } from "../dto";
import { getItem, updateItem } from "../model/item";

export const updateItemHandler = async (req: Request, res: Response) => {
  const body = plainToInstance(UpdateItemDTO, req.body);
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

  const { id, name, price } = body;

  const item = await getItem(body.id);
  if (item == null)
    return res.status(400).json(<ResponseType>{
      message: "item is not exists",
      error: ["item is not exists"],
    });

  const result = await updateItem(id, name, price);

  if (result === null)
    return res.status(500).json(<ResponseType>{
      message: "update failed",
      error: ["Failed to Update Data"],
    });

  return res.json(<ResponseType>{
    message: "success update item",
    data: result,
  });
};
