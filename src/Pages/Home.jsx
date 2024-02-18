import { useNavigate } from "react-router-dom";
import { verifyToken } from "../Api/VerifyToken";
import { useState, useEffect } from "react";

function Home() {

    const navigate = useNavigate();
    const [loggedIn, setLoggedIn] = useState(localStorage.getItem("user") ? verifyToken(localStorage.getItem("user").token) : false)
    useEffect(() => {
        setLoggedIn(localStorage.getItem("user") ? verifyToken(localStorage.getItem("user").token) : false)
    }, [])

    const onButtonClick = () => {
        if (loggedIn) {
            localStorage.removeItem("user")
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
