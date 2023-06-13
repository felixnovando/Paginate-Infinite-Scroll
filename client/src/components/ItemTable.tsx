import { Link } from 'react-router-dom'
import { Item } from '../types'

const ItemTable = ({ items }: { items: Item[] }) => {
    return (
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
    )
}

export default ItemTable