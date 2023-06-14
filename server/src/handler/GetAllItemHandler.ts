import { Request, Response } from "express";
import { ResponseType } from "../types";
import { getAllItem } from "../model/item";

export const getAllItemHandler = async (req: Request, res: Response) => {

  const items = await getAllItem();

  res.json(<ResponseType>{
    message: "success",
    data: items,
  });
};
