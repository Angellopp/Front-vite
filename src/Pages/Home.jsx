"use client";

import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import useVerifyToken from "../hooks/auth/useVerifyToken";
import useLogout from "../hooks/auth/useLogout";
import MySidebar from "../Components/navbar/MySidebar";

function Home() {
    const logout = useLogout();
    const navigate = useNavigate();
    const { data , isLoading, isSuccess } = useVerifyToken();
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
        <div className="mx-auto">
            {loggedIn ? <MySidebar /> : <></>}
            <div className="mx-auto mt-20 mb-20 ">
                <h1 className="dark:text-white text-5xl text-center mb-10">Bienvenido!</h1>
                <h2 className="dark:text-white text-4xl text-center mb-10">Esta es la home page.</h2>

                {isLoading ? 
                    <div className="text text-center text-3xl"> Cargando... </div>
                : <div/>}

                {loggedIn ? 
                <div>
                    <a href="#" className="block max-w-sm p-6 bg-white border border-gray-200 rounded-lg shadow hover:bg-gray-100 dark:bg-gray-800 dark:border-gray-700 dark:hover:bg-gray-700 mx-auto">

                    <h5 className="mb-2 text-2xl font-bold tracking-tight text-gray-900 dark:text-white">Noteworthy technology acquisitions 2021</h5>
                    <p className="font-normal text-gray-700 dark:text-gray-400">Here are the biggest enterprise technology acquisitions of 2021 so far, in reverse chronological order.</p>
                    </a>
                </div>
                : <div/>}

                <div className="container mx-auto mt-10 mb-10">
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
                        {isSuccess ? 
                            <button
                                type="submit"
                                className="mx-auto relative inline-flex items-center justify-center p-0.5 me-2 overflow-hidden text-sm font-medium text-gray-900 rounded-lg group bg-gradient-to-br from-cyan-500 to-blue-500 group-hover:from-cyan-500 group-hover:to-blue-500 hover:text-white dark:text-white focus:ring-4 focus:outline-none focus:ring-cyan-200 dark:focus:ring-cyan-800"
                                onClick={onButtonClick}
                            >
                                <span className="mx-auto relative px-5 py-2.5 transition-all ease-in duration-75 bg-white dark:bg-gray-900 rounded-md group-hover:bg-opacity-0">
                                    {loggedIn ? "Log out" : "Log in"}
                                </span>
                            </button>
                        : <div/>}
                    </div>
                </div>
            </div>
            
        </div>
    )
}

export default Home
