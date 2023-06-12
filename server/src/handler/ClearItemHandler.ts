import { Request, Response } from "express";
import { ResponseType } from "../types";
import { mutate } from "../db/connection";

export const clearItem = async (req: Request, res: Response) => {
  const result = await mutate(`DELETE FROM items`);

  await mutate("ALTER TABLE items AUTO_INCREMENT = 1");

  if (result === null)
    return res.status(500).json(<ResponseType>{
      message: "delete failed",
      error: ["Failed to Delete Datas"],
    });

  return res.json(<ResponseType>{
    message: "success",
    data: result,
  });
};
