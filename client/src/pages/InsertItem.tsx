import axios from "axios";
import { useState } from "react"
import { usePopUpContext } from "../context";

async function insertItem(name: string, price: number) {
    const { data } = await axios.post<{ data: string }>(`${import.meta.env.VITE_SERVER_URL}/item`, {
        name, price
    });
    return data.data;
}

const InsertItem = () => {

    const [name, setName] = useState<string>("");
    const [price, setPrice] = useState<number>(0);

    const { success, error } = usePopUpContext();

    async function handleInsertItem() {
        try {
            const result = await insertItem(name, price);
            success(result);
            setName("");
            setPrice(0);
        } catch (e: any) {
            error(e.message);
        }
    }

    return (
        <section className="h-full flex flex-col">
            <div className="flex-1 p-3 flex justify-center items-center">
                <div className="bg-slate-200 w-[600px] p-5 rounded-lg shadow-lg drop-shadow-lg">
                    <div className="flex flex-col mb-3">
                        <label htmlFor="name" className="mb-3">Product Name</label>
                        <input type="text" id="name" className="p-2 pl-2" onChange={(e) => setName(e.target.value)} value={name} />
                    </div>

                    <div className="flex flex-col mb-5">
                        <label htmlFor="price" className="mb-3">Product Price</label>
                        <input type="number" id="price" className="p-2 pl-2" onChange={(e) => setPrice(Number(e.target.value))} value={price} />
                    </div>

                    <div>
                        <button
                            onClick={handleInsertItem}
                            className="bg-green-500 text-white font-semibold p-2 rounded-md w-full hover:text-green-500 hover:bg-white">Insert</button>
                    </div>
                </div>

            </div>
        </section>
    )
}

export default InsertItem