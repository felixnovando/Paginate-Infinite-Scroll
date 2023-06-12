import { Request, Response } from "express";
import { ResponseType } from "../types";
import { mutate } from "../db/connection";
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

  const { id } = body;

  const result = await mutate(`DELETE FROM items WHERE id = ${id}`);

  if (result === null)
    return res.status(500).json(<ResponseType>{
      message: "delete failed",
      error: ["Failed to Delete Data"],
    });

  return res.json(<ResponseType>{
    message: "success",
    data: result,
  });
};
