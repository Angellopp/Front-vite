const getProductStock = async (product_id, companies_ids) => {
    const url = import.meta.env.VITE_URL_BACKEND || "";
    const raw = JSON.stringify({
        "product_id": parseInt(product_id), // Convertir a entero con parseInt,
        "companies_ids": companies_ids
    });

    try {
        const response = await fetch(url + "/product_product_stock", {
            method: "POST",
            headers: {
                'Content-Type': 'application/json'
            },
            body: raw,
            credentials: 'include',
        });

        if (!response.ok) {
            throw new Error(`Failed to fetch stock: ${response.statusText}`);
        }

        const data = await response.json();
        return data;
    } catch (error) {
        console.error('Error fetching stock:', error);
        throw error; // Re-throw the error to handle it outside the function
    }
};

export default getProductStock;
