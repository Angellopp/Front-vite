export const verifyToken = async (token) => {
    // console.log("entro a verifyToken")
    if (!token) {
        return
    }
    const url = import.meta.env.VITE_URL_ODOO
    try {
        const r = await fetch(url + "/verifyToken", {
            method: "POST",
            headers: {
                'authorization': 'Bearer ' + token
            }
        })
        const r_1 = await r.json();
        return r_1.validation
    } catch (error) {
        console.log(error + ": error en verifyToken")
        return false
    }
}