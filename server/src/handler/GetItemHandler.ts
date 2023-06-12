import { Request, Response } from "express";
import { Product, ResponseType } from "../types";
import { query } from "../db/connection";

export const getItem = async (req: Request, res: Response) => {
    const { id } = req.params;

    const products = await query<Product>(`SELECT * FROM items WHERE id = ${id}`);

    const product : Product | null = products.length == 0 ? null : products[0];

    res.json(<ResponseType>{
        message: "success",
        data: product,
    });
};
