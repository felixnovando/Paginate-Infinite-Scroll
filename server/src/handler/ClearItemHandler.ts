import { Request, Response } from "express";
import { ResponseType } from "../types";
import { clearItem, resetItemOrder } from "../model/item";

export const clearItemHandler = async (req: Request, res: Response) => {

  const result = await clearItem();

  await resetItemOrder();

  if (result === null)
    return res.status(500).json(<ResponseType>{
      message: "delete failed",
      error: ["Failed to Delete Datas"],
    });

  return res.json(<ResponseType>{
    message: "success clear data",
    data: result,
  });
};
