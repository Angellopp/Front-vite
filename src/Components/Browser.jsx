import Text from "./Text"
import TOP from "./TOP"

import { useState } from "react"



const Browser = ({ products }) => {

    const [value, setValue] = useState('');

    return (
        <div className="mx-auto">
            <Text
                value={value}
                setValue={setValue}
            />
            <TOP
                value={value}
                products={products}
            />
        </div>
    )
}

export default Browser;
