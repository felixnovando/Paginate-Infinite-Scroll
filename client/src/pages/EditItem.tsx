const EditItem = () => {
    return (
        <section className="h-full flex flex-col">
            <div className="flex-1 p-3 flex justify-center items-center">
                <div className="bg-slate-200 w-[600px] p-5 rounded-lg shadow-lg drop-shadow-lg">
                    <div className="flex flex-col mb-3">
                        <label htmlFor="name" className="mb-3">Product Name</label>
                        <input type="text" name="name" id="name" className="p-2 pl-2" />
                    </div>

                    <div className="flex flex-col mb-5">
                        <label htmlFor="price" className="mb-3">Product Price</label>
                        <input type="number" name="price" id="price" className="p-2 pl-2" />
                    </div>

                    <div className="flex justify-evenly">
                        <button type="button"
                            className="w-5/12 bg-yellow-500 text-white font-semibold p-2 rounded-md hover:text-yellow-500 hover:bg-white">Update</button>

                        <button
                            className="w-5/12 bg-red-500 text-white font-semibold p-2 rounded-md hover:text-red-500 hover:bg-white">Delete</button>
                    </div>
                </div>

            </div>
        </section>
    )
}

export default EditItem