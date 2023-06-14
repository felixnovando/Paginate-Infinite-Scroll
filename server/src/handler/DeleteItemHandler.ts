import { Request, Response } from "express";
import { Product, ResponseType } from "../types";
import { mutate, query } from "../db/connection";
import { plainToInstance } from "class-transformer";
import { validateDTO } from "../util";
import { DeleteItemDTO } from "../dto";

export const deleteItem = async (req: Request, res: Response) => {
  const body = plainToInstance(DeleteItemDTO, req.body);
  const errors = await validateDTO(body);

  if (errors !== null)
    return res.status(400).json(<ResponseType>{
      message: "invalid input",
      error: errors,
    });

  //check item exists
  const products = await query<Product>(`SELECT * FROM items WHERE id = ${body.id}`);
  const product: Product | null = products.length == 0 ? null : products[0];

  if (product == null)
    return res.status(400).json(<ResponseType>{
      message: "item is not exists",
      error: ["item is not exists"],
    });

  const { id } = body;

  const result = await mutate(`DELETE FROM items WHERE id = ${id}`);

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
