const fetchProducts = async () => {
    const url = import.meta.env.VITE_URL_BACKEND
    try {
        const r = await fetch(url + "/product_products", {
            method: "POST",
            headers: {
                'Content-Type': 'application/json',
            },
            redirect: "follow",
            credentials: 'include'
        })
        const r_1 = await r.json();
        return r_1.result
    } catch (error){
        console.log(error)
    }
}

export default fetchProducts