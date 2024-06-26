const fetchProducts = async () => {
    const user = JSON.parse(localStorage.getItem("user"))
    const { userId, password, token } = user;
    const name_database = import.meta.env.VITE_NOMBRE_DB
    const url = import.meta.env.VITE_URL_BACKEND
    try {
        const r = await fetch(url + "/product_products", {
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
        const r_1 = await r.json();
        return r_1.result
    } catch (error){
        console.log(error)
    }
}

export default fetchProducts