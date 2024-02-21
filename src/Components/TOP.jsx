import React from "react"
const TOP = ({ products, value }) => {

    const datos = products
    const filasFiltradas = datos
        ? value ? datos.filter((item) =>
            item.name.toLowerCase().includes(value.toLowerCase())
        ) : datos
        : [];

    return (
        <div className="relative overflow-x-auto shadow-md sm:rounded-lg">
            {/* {console.log(filasFiltradas)} */}
            <table className="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
                <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
                    <tr>
                        <th scope="col" className="px-6 py-3">
                            ID
                        </th>
                        <th scope="col" className="px-6 py-3">
                            Nombre
                        </th>
                        <th scope="col" className="px-6 py-3">
                            Precio
                        </th>
                        <th scope="col" className="px-6 py-3">
                            Imagen
                        </th>
                    </tr>
                </thead>
                <tbody>

                    {filasFiltradas && filasFiltradas.map((item) => (
                        <tr key={item.id} className="bg-white border-b dark:bg-gray-800 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600">
                            <th scope="row" className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white">
                                {item.id}
                            </th>
                            <td className="px-6 py-4">
                                {item.name}
                            </td>
                            <td className="px-6 py-4">
                                {"S/. " + item.lst_price}
                            </td>
                            <td className="px-6 py-4">
                                {(item.image_256) ? <img src={"data:image/png;base64," + item.image_256} alt={item.name} /> : "FALTA IMAGEN"}
                                {/* src="data:image/png;base64,#{o.sunat_qr_code}" */}
                            </td>
                        </tr>
                    ))}

                </tbody>
            </table>
        </div>
    )
}

export default React.memo(TOP)
