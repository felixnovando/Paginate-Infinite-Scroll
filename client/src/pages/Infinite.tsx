import axios from "axios"
import { useState, useEffect, useRef } from "react";
import { Item, ItemInfiniteScroll } from "../types";
import { Link } from "react-router-dom";

async function getInfiniteItem(take: number, page: number) {
  const { data } = await axios.post(`${import.meta.env.VITE_SERVER_URL}/item/infinite`, {
    take, page
  });
  return data as ItemInfiniteScroll;
}

const Infinite = () => {

  const take = 15;
  const pageRef = useRef<number>(1);
  const hasNextRef = useRef<boolean>(true);
  const loadingRef = useRef<boolean>(false);

  const [items, setItems] = useState<Item[]>([]);

  useEffect(() => {

    const page = document.getElementById("main-content");
    if (page === null) return;

    function loadMoreData() {
      if (loadingRef.current) return;
      loadingRef.current = true;

      getInfiniteItem(take, pageRef.current)
        .then((datas) => {
          hasNextRef.current = datas.hasMoreData;
          pageRef.current += 1;
          loadingRef.current = false;
          setItems((prevItems) => [...prevItems, ...datas.data]);
        })
        .catch(() => {
          loadingRef.current = false;
        })
    }

    function onTableScroll() {
      const { scrollTop, clientHeight, scrollHeight } = page!;
      if (scrollTop + clientHeight >= scrollHeight - 20) {
        if (hasNextRef.current === false) return;
        loadMoreData();
      }
    }

    loadMoreData();

    page.addEventListener("scroll", onTableScroll);

    return () => {
      page.removeEventListener("scroll", onTableScroll);
    }
  }, []);

  return (
    <div className="h-full flex justify-center pt-8">
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
              items.map((item, index) => (
                <tr key={index} className="border-2 border-collapse">
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

      </section>
    </div>
  )
}

export default Infinite