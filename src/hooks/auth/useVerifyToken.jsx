import { useQuery } from "react-query";
import useLogout from "./useLogout";
export default function useVerifyToken() {
    async function verifyToken() {
        const url = import.meta.env.VITE_URL_BACKEND
        // const raw = JSON.stringify({});
        if (!localStorage.getItem("user")) {
            return false
        }
        try {
            const r = await fetch(url + "/verifypath", {
                method: "GET",
                headers: {
                    'Content-Type': "application/json",
                },
                // body: raw,
                // redirect: "follow",
                credentials: 'include' 
            })
            const r_1 = await r.json();
            if (r_1.validation == false) localStorage.removeItem("user")
            return r_1.validation
        } catch (error) {
            console.log(error + ": error en verifyToken")
            useLogout
            return false
        }
        // return true
    }
    return useQuery({ queryKey: ["verifyToken"], queryFn: verifyToken })
}