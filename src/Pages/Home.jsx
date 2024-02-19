import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import useVerifyToken from "../api/useVerifyToken";
import useLogout from "../hooks/auth/useLogout";

function Home() {
    const logout = useLogout();
    const navigate = useNavigate();
    const { data } = useVerifyToken();
    const [loggedIn, setLoggedIn] = useState(false);
    useEffect(() => {
        setLoggedIn(data)
    }, [data])

    const onButtonClick = () => {
        if (loggedIn) {
            logout()
            setLoggedIn(false)
        }
        navigate("/login")
    }

    const goDashboard = () => {
        navigate("/dashboard")
    }

    return (
        <div className="container mx-auto mt-20 mb-20">
            <h1 className="font-black text-5xl text-center mb-10">Bienvenido!</h1>
            <h2 className="font-black text-4xl text-center mb-10">Esta es la home page.</h2>

            <div className="container mx-auto mt-20 mb-20">
                <div className="text text-center">
                    {loggedIn ?
                        <button
                            type="submit"
                            className="mx-auto relative inline-flex items-center justify-center p-0.5 me-2 overflow-hidden text-sm font-medium text-gray-900 rounded-lg group bg-gradient-to-br from-cyan-500 to-blue-500 group-hover:from-cyan-500 group-hover:to-blue-500 hover:text-white dark:text-white focus:ring-4 focus:outline-none focus:ring-cyan-200 dark:focus:ring-cyan-800"
                            onClick={goDashboard}
                        >
                            <span className="mx-auto relative px-5 py-2.5 transition-all ease-in duration-75 bg-white dark:bg-gray-900 rounded-md group-hover:bg-opacity-0">
                                Ir al Dashboard
                            </span>
                        </button>
                        : <div />
                    }

                    <button
                        type="submit"
                        className="mx-auto relative inline-flex items-center justify-center p-0.5 me-2 overflow-hidden text-sm font-medium text-gray-900 rounded-lg group bg-gradient-to-br from-cyan-500 to-blue-500 group-hover:from-cyan-500 group-hover:to-blue-500 hover:text-white dark:text-white focus:ring-4 focus:outline-none focus:ring-cyan-200 dark:focus:ring-cyan-800"
                        onClick={onButtonClick}
                    >
                        <span className="mx-auto relative px-5 py-2.5 transition-all ease-in duration-75 bg-white dark:bg-gray-900 rounded-md group-hover:bg-opacity-0">
                            {loggedIn ? "Log out" : "Log in"}
                        </span>
                    </button>
                    {(loggedIn ? <div>
                        Estas logeado
                    </div> : <div />)}
                </div>
            </div>
        </div>
    )
}

export default Home
