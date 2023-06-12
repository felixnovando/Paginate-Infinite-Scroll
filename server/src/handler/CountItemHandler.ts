import { Request, Response } from "express";
import { ResponseType } from "../types";
import { query } from "../db/connection";

export const countItem = async (req: Request, res: Response) => {
  const result = await query<{total: number}>("SELECT COUNT(*) as `total` FROM items");
  res.json(<ResponseType>{
    message: "success",
    data: result[0],
  });
};
