import axios from "axios";
import { useState, useEffect, useRef } from "react";
import { usePopUpContext } from "../context";

async function getAllItemCount() {
  type Response = {
    data: {
      total: number
    }
  };
  const { data } = await axios.get<Response>(`${import.meta.env.VITE_SERVER_URL}/item/count`);
  return data.data.total;
}

async function clearItems() {
  type Response = {
    data: string
  }
  const { data } = await axios.delete<Response>(`${import.meta.env.VITE_SERVER_URL}/item/clear`);
  return data.data;
}

async function seedItems(count: number) {
  type Response = {
    data: string
  }
  const { data } = await axios.post<Response>(`${import.meta.env.VITE_SERVER_URL}/item/seed`);
  return data.data;
}

const Settings = () => {
  const [total, setTotal] = useState(0);
  const seedCountRef = useRef<number>(0);

  const { success, error, info } = usePopUpContext();

  useEffect(() => {
    getAllItemCount().then((result) => setTotal(result));
  }, []);

  function handleSeed() {
    info("Seeding Success");
  }

  function handleClear() {
    error("Error Clear Data");
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
              onChange={(e) => {
                seedCountRef.current = Number(e.target.value)
              }}
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