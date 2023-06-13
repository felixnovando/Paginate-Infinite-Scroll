import axios from "axios"
import { useState, useEffect, useRef } from "react";
import { Item, ItemInfiniteScroll } from "../types";
import ItemTable from "../components/ItemTable";

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
      const { scrollTop, clientHeight, scrollHeight } = document.documentElement;
      if (scrollTop + clientHeight >= scrollHeight - 20) {
        if (hasNextRef.current === false) return;
        loadMoreData();
      }
    }

    loadMoreData();

    window.addEventListener("scroll", onTableScroll);

    return () => {
      window.removeEventListener("scroll", onTableScroll);
    }
  }, []);

  return (
    <div className="h-full flex justify-center pt-8">
      <section className="w-5/6">
        <ItemTable items={items} />
      </section>
    </div>
  )
}

export default Infinite