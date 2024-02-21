import { useState, useEffect } from 'react'
import Browser from '../Components/Browser'
import useProducts from '../hooks/products/useProducts';
const Dashboard = () => {

    const {data , isLoading, isSuccess, isStale}= useProducts()
    const [products, setProducts] = useState([]);
    
    useEffect(() => {
        setProducts(data)
    }, [isStale])

    return (
        <div>
            {isLoading ? <div className="text text-center text-3xl"> Cargando Productos... </div> : <div/>} 
            {
                isSuccess ? <Browser
                products={products}
            />: <div/>
            }
            {console.log("dashboard")}
        </div>
    )
}

export default Dashboard
