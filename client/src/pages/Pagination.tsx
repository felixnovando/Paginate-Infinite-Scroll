import axios from "axios"
import { useState, useEffect } from "react";
import { Item, ItemPaginate } from "../types";
import { useDebounce } from "use-debounce";
import PaginationControl from "../components/PaginationControl";
import ItemTable from "../components/ItemTable";

async function getPaginateItem(take: number, page: number) {
  const { data } = await axios.post(`${import.meta.env.VITE_SERVER_URL}/item/paginate`, {
    take, page
  });
  return data as ItemPaginate;
}

const Pagination = () => {

  const [page, setPage] = useState<number>(1);

  const [take, setTake] = useState<number>(5);
  const [takeValue] = useDebounce(take, 1000);

  const [totalPage, setTotalPage] = useState<number>(1);
  const [items, setItems] = useState<Item[]>([]);

  useEffect(() => {
    getPaginateItem(takeValue, page)
      .then((datas) => {
        setItems(datas.data);
        setTotalPage(datas.totalPage);
      });
  }, [page, takeValue])


  return (
    <div className="h-full flex justify-center items-center">

      <section className="w-5/6">

        <ItemTable items={items} />

        <div className="w-4/6 h-16 m-auto flex justify-end">
          <div className="w-11/12 flex justify-between items-center text-lg px-5">
            <PaginationControl
              page={page}
              take={takeValue}
              totalPage={totalPage}
              setTake={(take) => setTake(take)}
              setPage={(page) => setPage(page)}
              firstPage={() => setPage(1)}
              prevPage={() => setPage((page) => page - 1)}
              nextPage={() => setPage((page) => page + 1)}
              lastPage={() => setPage(totalPage)}
            />
          </div>
        </div>

      </section>

    </div>
  )
}

export default Pagination