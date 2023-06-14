import { query, mutate } from "../db/connection";
import { Item } from "../types";

export const getItem = async (id: number): Promise<Item | null> => {
    const items = await query<Item>(`SELECT * FROM items WHERE id = ${id}`);
    const item: Item | null = items.length == 0 ? null : items[0];
    return item;
}

export const getAllItem = async (): Promise<Item[]> => {
    const items = await query<Item>(`SELECT * FROM items`);
    return items;
};

export const queryRange = async (take: number, offset: number): Promise<Item[]> => {
    const items = await query<Item>(
        `SELECT * FROM items LIMIT ${take} OFFSET ${offset}`
    );
    return items;
}

export const insertItem = async (name: string, price: number): Promise<string | null> => {
    const result = await mutate(
        `INSERT INTO items VALUES (DEFAULT, '${name}', ${price})`
    );
    return result;
}

export const updateItem = async (id: number, name: string, price: number): Promise<string | null> => {
    const result = await mutate(
        `UPDATE items SET name='${name}', price=${price} WHERE id = ${id}`
    );
    return result;
}

export const deleteItem = async (id: number): Promise<string | null> => {
    const result = await mutate(`DELETE FROM items WHERE id = ${id}`);
    return result;
}

export const clearItem = async (): Promise<string | null> => {
    const result = await mutate(`DELETE FROM items`);
    return result;
}

export const countItem = async (): Promise<{ total: number }> => {
    const result = await query<{ total: number }>("SELECT COUNT(*) as `total` FROM items");
    return result[0];
}

export const resetItemOrder = async (): Promise<void> => {
    await mutate("ALTER TABLE items AUTO_INCREMENT = 1");
}

