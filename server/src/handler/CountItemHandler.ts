import { Request, Response } from "express";
import { ResponseType } from "../types";
import { countItem } from "../model/item";

export const countItemHandler = async (req: Request, res: Response) => {
  const result = await countItem();
  res.json(<ResponseType>{
    message: "success",
    data: result,
  });
};
