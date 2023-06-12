import { Request, Response } from "express";
import { Product, ResponseType } from "../types";
import { query } from "../db/connection";

export const getAllItem = async (req: Request, res: Response) => {
  const products = await query<Product>(`SELECT * FROM items`);
  res.json(<ResponseType>{
    message: "success",
    data: products,
  });
};
