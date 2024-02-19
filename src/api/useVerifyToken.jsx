import { useQuery } from "react-query";
export default function useVerifyToken() {
    async function verifyToken() {
        console.log("entro a verifyToken")
        const token = localStorage.getItem("user") ? JSON.parse(localStorage.getItem("user")).token : false
        if (!token) {
            console.log("no hay token")
            return false
            // onerror()
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
            // if(!r_1) onerror()
        } catch (error) {
            console.log(error + ": error en verifyToken")
            return false
            // onerror()
        }
    }
    return useQuery({queryKey: ["verifyToken"], queryFn: verifyToken})
}