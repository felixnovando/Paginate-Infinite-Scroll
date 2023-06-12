import axios from "axios";
import { useState, useEffect } from "react";
import { usePopUpContext } from "../context";

async function getAllItemCount() {
  const { data } = await axios.get<{ data: { total: number } }>(`${import.meta.env.VITE_SERVER_URL}/item/count`);
  return data.data.total;
}

async function clearItems() {
  const { data } = await axios.delete<{ data: string }>(`${import.meta.env.VITE_SERVER_URL}/item/clear`);
  return data.data;
}

async function seedItems(count: number) {
  const { data } = await axios.post<{ data: string }>(`${import.meta.env.VITE_SERVER_URL}/item/seed`, {
    count
  });
  return data.data;
}

const Settings = () => {
  const [total, setTotal] = useState(0);
  const [seedCount, setSeedCount] = useState<number>(0);

  const { success, error } = usePopUpContext();

  useEffect(() => {
    getAllItemCount().then((result) => setTotal(result));
  }, []);

  async function handleSeed() {
    try {
      const result = await seedItems(seedCount);
      success(result);
      setSeedCount(0);
    } catch (e: any) {
      error(e.message);
    }
  }

  async function handleClear() {
    try {
      const result = await clearItems();
      success(result);
      setSeedCount(0);
    } catch (e: any) {
      error(e.message);
    }
  }

  return (
    <section className="h-full flex flex-col">

      <div className="flex-1 p-3 flex justify-center items-center">
        <div className="bg-slate-200 w-[600px] p-5 rounded-lg shadow-lg drop-shadow-lg">
          <div className="flex items-center justify-evenly mb-5">
            <label htmlFor="count" className="">Product Count</label>
            <input type="number" name="count" id="count" className="p-2 pl-2" value={total} disabled />
          </div>

          <div className="flex items-center justify-evenly mb-5">
            <label htmlFor="count" className="">Seed Count</label>
            <input type="number" name="count" id="count" className="p-2 pl-2"
              value={seedCount}
              onChange={(e) => setSeedCount(Number(e.target.value))}
            />
          </div>

          <div className="flex justify-evenly">
            <button type="button" id="insert-btn"
              className="w-5/12 bg-green-500 text-white font-semibold p-2 rounded-md hover:text-green-500 hover:bg-white" onClick={handleSeed}>Seed</button>

            <button type="button" id="delete-btn"
              className="w-5/12 bg-red-500 text-white font-semibold p-2 rounded-md hover:text-red-500 hover:bg-white" onClick={handleClear}>Clear</button>
          </div>
        </div>

      </div>
    </section>
  )
}

export default Settings