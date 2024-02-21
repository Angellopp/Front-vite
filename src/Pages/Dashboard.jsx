import { useState, useEffect } from 'react'
import Browser from '../Components/Browser'
import useProducts from '../hooks/products/useProducts';

const Dashboard = () => {

    const {data, isFetching, refetch}= useProducts()
    const [products, setProducts] = useState([]);
    
    useEffect(() => {
        setProducts(data)
    }, [data])

    return (
        <div>
            {
                <Browser
                products={products}
                isFetching={isFetching}
                refetch={refetch}
            />
            }
            {/* {isFetching ? <div className="text text-center text-3xl"> Cargando... </div> : <div/>} */}
        </div>
    )
}

export default Dashboard
