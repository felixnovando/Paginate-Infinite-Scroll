import { useNavigate, useParams } from "react-router-dom"
import { useEffect, useState } from "react";
import { ErrorResponse, Item } from "../types";
import axios, { AxiosError } from "axios";
import { usePopUpContext } from "../context";

async function getItem(id: string) {
    const { data } = await axios.get<{ data: Item | null }>(`${import.meta.env.VITE_SERVER_URL}/item/${id}`);
    return data.data;
}

async function updateItem(id: number, name: string, price: number) {
    const { data } = await axios.put<{ message: string }>(`${import.meta.env.VITE_SERVER_URL}/item`, {
        id, name, price
    });
    return data.message;
}

async function deleteItem(id: number) {
    const { data } = await axios.delete<{ message: string }>(`${import.meta.env.VITE_SERVER_URL}/item`, {
        data: { id }
    });
    return data.message;
}

const EditItem = () => {

    const { id } = useParams();

    const navigate = useNavigate();

    const [data, setData] = useState<Item | null>(null);

    const [name, setName] = useState<string>("");
    const [price, setPrice] = useState<number>(0);

    const { error, success } = usePopUpContext();

    useEffect(() => {
        if (id !== undefined)
            getItem(id).then((res) => {
                if (res === null) return;
                setData(res);
                setName(res.name);
                setPrice(res.price);
            })
    }, [id]);

    async function handleUpdateItem() {
        if (!data) return;
        try {
            const result = await updateItem(data?.id, name, price);
            success(result);
        } catch (e: any) {
            const errorResponse = (e as AxiosError).response?.data as ErrorResponse;
            for (const err of errorResponse.error)
                error(err);

            setName(data.name);
            setPrice(data.price);
        }
    }

    async function handleDeleteItem() {
        if (!data) return;

        try {
            const result = await deleteItem(data.id);
            success(result);
            navigate("/pagination");
        } catch (e: any) {
            const errorResponse = (e as AxiosError).response?.data as ErrorResponse;
            for (const err of errorResponse.error)
                error(err);
        }
    }

    return (
        <section className="h-full flex flex-col">
            <div className="flex-1 p-3 flex justify-center items-center">
                <div className="bg-slate-200 w-[600px] p-5 rounded-lg shadow-lg drop-shadow-lg">
                    <div className="flex flex-col mb-3">
                        <label htmlFor="name" className="mb-3">Product Name</label>
                        <input type="text" name="name" id="name" className="p-2 pl-2" value={name}
                            onChange={(e) => setName(e.target.value)} />
                    </div>

                    <div className="flex flex-col mb-5">
                        <label htmlFor="price" className="mb-3">Product Price</label>
                        <input type="number" name="price" id="price" className="p-2 pl-2" value={price}
                            onChange={(e) => setPrice(Number(e.target.value))} />
                    </div>

                    <div className="flex justify-evenly">
                        <button type="button"
                            disabled={data === null}
                            onClick={handleUpdateItem}
                            className="w-5/12 bg-yellow-500 text-white font-semibold p-2 rounded-md hover:text-yellow-500 hover:bg-white">Update</button>

                        <button
                            disabled={data === null}
                            onClick={handleDeleteItem}
                            className="w-5/12 bg-red-500 text-white font-semibold p-2 rounded-md hover:text-red-500 hover:bg-white">Delete</button>
                    </div>
                </div>

            </div>
        </section>
    )
}

export default EditItem