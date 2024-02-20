import { useState, useEffect } from 'react'
import Browser from '../Components/Browser'

import axios from 'axios'
const Dashboard = () => {

    const [products, setProducts] = useState([]);
    const [error, setError] = useState(null);

    useEffect(() => {
        const user = JSON.parse(localStorage.getItem("user"))
        const { userId, password, token } = user;
        const name_database = import.meta.env.VITE_NOMBRE_DB
        const url = import.meta.env.VITE_URL_ODOO
        fetch(url + "/product_products", {
            method: "POST",
            headers: {
                'Content-Type': 'application/json',
                'authorization': 'Bearer ' + token
            },
            body: JSON.stringify({
                id_user: userId,
                name_database,
                password
            })
        })
            .then(r => r.json())
            .then(r => {
                setProducts(r.result)
            })
            .catch((error) => setError(error));

    }, []);

    return (
        <div>
            <Browser
                products={products}
            />
        </div>
    )
}

export default Dashboard
