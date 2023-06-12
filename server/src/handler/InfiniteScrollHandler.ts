import { Request, Response } from "express";
import { InfiniteScrollResponse, Product, ResponseType } from "../types";
import { query } from "../db/connection";
import { plainToInstance } from "class-transformer";
import { validateDTO } from "../util";
import { PaginateItemDTO } from "../dto";

export const infiniteScrollItem = async (req: Request, res: Response) => {
  const body = plainToInstance(PaginateItemDTO, req.body);
  const errors = await validateDTO(body);

  if (errors !== null)
    return res.status(400).json(<ResponseType>{
      message: "invalid input",
      error: errors,
    });

  const { take, page } = body;

  const tempError: string[] = [];
  if (page <= 0) tempError.push("page must not lower than 1");
  if (take <= 0) tempError.push("take must not lower than 1");

  if (tempError.length !== 0)
    return res.status(400).json(<ResponseType>{
      message: "invalid input",
      error: tempError,
    });

  const productCount = await query<{ total: number }>(
    "SELECT COUNT(*) as `total` FROM items"
  );

  const totalPage = Math.ceil(productCount[0].total / take);
  const offset = take * (page - 1);

  const products = await query<Product>(
    `SELECT * FROM items LIMIT ${take} OFFSET ${offset}`
  );

  return res.json(<InfiniteScrollResponse>{
    message: "success",
    hasMoreData: page < totalPage,
    data: products,
  });
};
