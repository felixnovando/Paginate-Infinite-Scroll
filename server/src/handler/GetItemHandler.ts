import { Request, Response } from "express";
import { ResponseType } from "../types";
import { getItem } from "../model/item";

export const getItemHandler = async (req: Request, res: Response) => {
    const { id } = req.params;

    let num: number = 0;

    try {
        num = Number(id);
    } catch (error) {
        num = -1;
    }

    const item = await getItem(num);
    res.json(<ResponseType>{
        message: "success",
        data: item,
    });
};
