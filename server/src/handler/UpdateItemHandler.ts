import { Request, Response } from "express";
import { Product, ResponseType } from "../types";
import { mutate, query } from "../db/connection";
import { plainToInstance } from "class-transformer";
import { validateDTO } from "../util";
import { UpdateItemDTO } from "../dto";

export const updateItem = async (req: Request, res: Response) => {
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

  //check item exists
  const products = await query<Product>(`SELECT * FROM items WHERE id = ${body.id}`);
  const product: Product | null = products.length == 0 ? null : products[0];

  if (product == null)
    return res.status(400).json(<ResponseType>{
      message: "item is not exists",
      error: ["item is not exists"],
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
    message: "success update item",
    data: result,
  });
};
