import Text from "./Text"
import TOP from "./TOP"

import { useState } from "react"

// eslint-disable-next-line react/prop-types
const Browser = ({ products, isFetching, refetch }) => {

    const [value, setValue] = useState('');

    return (
        <div className="mx-auto">
            <div className="flex mx-auto">
                <Text
                    value={value}
                    setValue={setValue}
                    />
                <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded" onClick={() => refetch()}>
                    Recargar
                </button>
            </div>
            {isFetching ? <div className="text text-center text-3xl"> Cargando Productos... </div> : <div/>}
            <TOP
                value={value}
                products={products}
            />
        </div>
    )
}

export default Browser;
