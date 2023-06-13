const PaginationControl = ({ take, setTake, page, totalPage, firstPage, nextPage, prevPage, lastPage, setPage }:
    {
        take: number,
        setTake: (take: number) => void,
        page: number,
        totalPage: number,
        firstPage: () => void,
        nextPage: () => void,
        prevPage: () => void,
        lastPage: () => void,
        setPage: (page: number) => void
    }) => {
    return (
        <>
            <div>
                <label htmlFor="take" className="mr-5">Take</label>
                <input type="number" id="take" className="border-2 p-1 w-20" placeholder="take" min={1} onChange={(e) => setTake(Number(e.target.value))} value={take} />
            </div>

            <p>Page {page} of {totalPage}</p>

            <button onClick={() => firstPage()} disabled={page == 1} className={page == 1 ? "opacity-50" : "hover:text-red-500"}>
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M18.75 19.5l-7.5-7.5 7.5-7.5m-6 15L5.25 12l7.5-7.5" />
                </svg>
            </button>

            <button onClick={() => prevPage()} disabled={page == 1} className={page == 1 ? "opacity-50" : "hover:text-red-500"}>
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 19.5L8.25 12l7.5-7.5" />
                </svg>
            </button>

            <input type="number" id="page" className="border-2 p-1 w-20" placeholder="page" min={1} max={totalPage} onChange={(e) => setPage(Number(e.target.value))} value={page} />

            <button onClick={() => nextPage()} disabled={page == totalPage} className={page == totalPage ? "opacity-50" : "hover:text-red-500"}>
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M8.25 4.5l7.5 7.5-7.5 7.5" />
                </svg>
            </button>

            <button onClick={() => lastPage()} disabled={page == totalPage} className={page == totalPage ? "opacity-50" : "hover:text-red-500"}>
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M11.25 4.5l7.5 7.5-7.5 7.5m-6-15l7.5 7.5-7.5 7.5" />
                </svg>
            </button>
        </>
    )
}

export default PaginationControl