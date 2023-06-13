const Home = () => {
  return (
    <div className="flex flex-wrap justify-evenly">
      <div className="w-[700px] bg-slate-200 drop-shadow-lg shadow-lg mb-5 p-5 rounded-lg">
        <img src="/assets/scroll-before.gif" alt="" className="h-[300px] p-2 border-2 m-auto" />
        <p className="text-center font-semibold text-xl">Infinite Scrolling Lite</p>
      </div>

      <div className="w-[700px] bg-slate-200 drop-shadow-lg shadow-lg mb-5 p-5 rounded-l">
        <img src="/assets/scroll-after.gif" alt="" className="h-[300px] p-2 first-line:border-2 m-auto" />
        <p className="text-center font-semibold text-xl">Infinite Scrolling</p>
      </div>

      <div className="w-[700px] bg-slate-200 drop-shadow-lg shadow-lg mb-5 p-5 rounded-l">
        <img src="/assets/pagination.gif" alt="" className="h-[300px] p-2 border-2 m-auto" />
        <p className="text-center font-semibold text-xl">Pagination</p>
      </div>

      <div className="w-[700px] bg-slate-200 drop-shadow-lg shadow-lg mb-5 p-5 rounded-l">
        <div className="h-[300px] flex flex-col justify-between">

          <div className="flex justify-evenly items-center">
            <img src="/assets/vite.png" className="w-[75px] h-[75px] object-cover" alt="" />
            <img src="/assets/node-ts.png" className="w-[75px] h-[75px] object-cover" alt="" />
          </div>

          <div className="flex justify-evenly items-center">
            <img src="/assets/mysql.png" className="h-[75px]" alt="" />
            <img src="/assets/typescript.png" className="w-[75px] h-[75px] object-cover ml-8" alt="" />
            <img src="/assets/express.png" className="h-[50px]" alt="" />
          </div>

          <div className="flex justify-evenly items-center">
            <img src="/assets/react.png" className="w-[75px] h-[75px] object-cover" alt="" />
            <img src="/assets/tailwind.png" className="w-[75px] h-[75px] object-cover" alt="" />
          </div>

        </div>
        <p className="text-center font-semibold text-xl">Tech Used</p>
      </div>

    </div>
  )
}

export default Home