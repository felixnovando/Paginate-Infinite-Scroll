import { Request, Response } from "express";
import { InfiniteScrollResponse, ResponseType } from "../types";
import { plainToInstance } from "class-transformer";
import { validateDTO } from "../util";
import { PaginateItemDTO } from "../dto";
import { countItem, queryRange } from "../model/item";

export const infiniteScrollItemHandler = async (req: Request, res: Response) => {
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

  const itemCount = await countItem();

  const totalPage = Math.ceil(itemCount.total / take);
  const offset = take * (page - 1);

  const items = await queryRange(take, offset);

  return res.json(<InfiniteScrollResponse>{
    message: "success",
    hasMoreData: page < totalPage,
    data: items,
  });
};
