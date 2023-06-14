const NotFound = () => {
    return (
        <div className="h-full flex justify-center items-center">
            <div className="flex flex-col items-center p-5 bg-slate-200 shadow-xl drop-shadow-xl rounded-2xl">
                <img src="/assets/hazard.png" alt="" />
                <img src="/assets/404.png" alt="" />
                <p className="font-bold text-3xl text-center">The page you are looking for is unavailable</p>
            </div>
        </div>
    )
}

export default NotFound