import React from "react"
const TOP = ({ products, value }) => {

    const datos = products
    const filasFiltradas = datos
        ? value ? datos.filter((item) =>
            item.name.toLowerCase().includes(value.toLowerCase())
        ) : datos
        : [];

    return (
        //quiero que muestre las imagenes y que se ajuste al ancho, pero tambieen el tamaño de cada card debe tener un tamaño minimo y cuando solo haya 1 columna este centrado
        <div className="grid gap-12 p-20 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4  overflow-x-auto shadow-md sm:rounded-lg ">
            {filasFiltradas && filasFiltradas.map((item) => (

                <div key={item.id} className="mx-auto w-full max-w-sm bg-white border border-gray-200 rounded-lg shadow dark:bg-gray-800 dark:border-gray-700 ">
                    <div className="flex justify-center">
                        <a href="#">
                            {(item.image_256) ? <img src={"data:image/png;base64," + item.image_256} alt={item.name} /> : "FALTA IMAGEN"}
                        </a>
                    </div>
                    <div className="px-5 pb-5">
                        <a className="items-center" href="#">
                            <h5 className="text-xl font-semibold tracking-tight text-gray-900 dark:text-white">{item.name}</h5>
                        </a>
                        <div className="flex items-center justify-between">
                            <span className="text-3xl font-bold text-gray-900 dark:text-white">{"S/. " + item.lst_price}</span>
                            <a href="#" className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">Ver mas</a>
                        </div>
                    </div>
                </div>
            ))}
        </div>
    )
}

export default React.memo(TOP)
