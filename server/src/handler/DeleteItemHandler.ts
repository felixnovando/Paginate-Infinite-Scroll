import { Request, Response } from "express";
import { ResponseType } from "../types";
import { plainToInstance } from "class-transformer";
import { validateDTO } from "../util";
import { DeleteItemDTO } from "../dto";
import { deleteItem, getItem } from "../model/item";

export const deleteItemHandler = async (req: Request, res: Response) => {
  const body = plainToInstance(DeleteItemDTO, req.body);
  const errors = await validateDTO(body);

  if (errors !== null)
    return res.status(400).json(<ResponseType>{
      message: "invalid input",
      error: errors,
    });

  const { id } = body;

  const item = await getItem(body.id);
  if (item == null)
    return res.status(400).json(<ResponseType>{
      message: "item is not exists",
      error: ["item is not exists"],
    });

  const result = await deleteItem(id);

  if (result === null)
    return res.status(500).json(<ResponseType>{
      message: "delete failed",
      error: ["Failed to Delete Data"],
    });

  return res.json(<ResponseType>{
    message: "success delete item",
    data: result,
  });
};
