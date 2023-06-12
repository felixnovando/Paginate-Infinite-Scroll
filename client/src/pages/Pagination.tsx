import axios from "axios"
import { useState, useEffect } from "react";
import { Item, ItemPaginate } from "../types";
import { Link } from "react-router-dom";
import { useDebounce } from "use-debounce";

async function getAllItem(take: number, page: number) {
  const { data } = await axios.post(`${import.meta.env.VITE_SERVER_URL}/item/paginate`, {
    take, page
  });
  return data as ItemPaginate;
}

const Pagination = () => {

  const [page, setPage] = useState<number>(1);
  const [pageValue] = useDebounce(page, 250);

  const [take, setTake] = useState<number>(5);
  const [takeValue] = useDebounce(take, 1000);

  const [totalPage, setTotalPage] = useState<number>(1);
  const [items, setItems] = useState<Item[]>([]);

  //handle changing table setup
  useEffect(() => {
    getAllItem(takeValue, pageValue)
      .then((datas) => {
        setItems(datas.data);
        setTotalPage(datas.totalPage);
      });
  }, [pageValue, takeValue])


  return (
    <div className="h-full flex justify-center items-center">

      <section className="w-5/6">

        <table className="w-4/6 m-auto">
          <thead className="text-white bg-slate-600 text-xl">
            <tr className="border-2 border-collapse">
              <th className="p-1">ID</th>
              <th className="p-1">Name</th>
              <th className="p-1">Price</th>
              <th className="p-1">Actions</th>
            </tr>
          </thead>
          <tbody className="text-lg">
            {
              items.map((item) => (
                <tr key={item.id} className="border-2 border-collapse">
                  <td className="p-1">{item.id}</td>
                  <td className="p-1">{item.name}</td>
                  <td className="p-1">{item.price}</td>
                  <td className="p-1 flex justify-center items-center">
                    <Link to={`/edit-item/${item.id}`} className="w-4/6"> <button className="w-full bg-yellow-500 text-white font-semibold p-2 rounded-md hover:text-yellow-500 hover:bg-white">Edit</button></Link>
                  </td>
                </tr>
              ))
            }
          </tbody>
        </table>

        <div className="w-4/6 h-16 m-auto flex justify-end">
          <div className="flex w-4/6 justify-between items-center text-lg">

            <div>
              <label htmlFor="take" className="mr-5">Take</label>
              <input type="number" id="take" className="border-2 p-1 w-20" placeholder="take" min={1} onChange={(e) => setTake(Number(e.target.value))} value={take} />
            </div>

            <p>Page {page} of {totalPage}</p>

            <button onClick={() => setPage(1)} disabled={page == 1} className={page == 1 ? "opacity-50" : "hover:text-red-500"}>
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
                <path strokeLinecap="round" strokeLinejoin="round" d="M18.75 19.5l-7.5-7.5 7.5-7.5m-6 15L5.25 12l7.5-7.5" />
              </svg>
            </button>

            <button onClick={() => setPage((page) => page - 1)} disabled={page == 1} className={page == 1 ? "opacity-50" : "hover:text-red-500"}>
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
                <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 19.5L8.25 12l7.5-7.5" />
              </svg>
            </button>

            <input type="number" id="page" className="border-2 p-1 w-20" placeholder="page" min={1} max={totalPage} onChange={(e) => setPage(Number(e.target.value))} value={page} />

            <button onClick={() => setPage((page) => page + 1)} disabled={page == totalPage} className={page == totalPage ? "opacity-50" : "hover:text-red-500"}>
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
                <path strokeLinecap="round" strokeLinejoin="round" d="M8.25 4.5l7.5 7.5-7.5 7.5" />
              </svg>
            </button>

            <button onClick={() => setPage(totalPage)} disabled={page == totalPage} className={page == totalPage ? "opacity-50" : "hover:text-red-500"}>
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
                <path strokeLinecap="round" strokeLinejoin="round" d="M11.25 4.5l7.5 7.5-7.5 7.5m-6-15l7.5 7.5-7.5 7.5" />
              </svg>
            </button>
          </div>
        </div>

      </section>

    </div>
  )
}

export default Pagination