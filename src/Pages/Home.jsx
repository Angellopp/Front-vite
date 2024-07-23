"use client";

import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import useVerifyToken from "../hooks/auth/useVerifyToken";
import useLogout from "../hooks/auth/useLogout";
import MySidebar from "../Components/navbar/MySidebar";
import CardsActivity from "../Components/card/CardsActivity";

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

    return (
        <div className="mx-auto">
            {loggedIn ? <MySidebar /> : <></>}
            <div className="mx-auto mt-20">
                <h1 className="dark:text-white text-5xl text-center mb-2">Bienvenido!</h1>
                {isLoading ? 
                    <div className="text text-center text-3xl"> Cargando... </div>
                : <div/>}

                {loggedIn && <CardsActivity/>}

                <div className="container mx-auto mt-10 mb-10">
                    <div className="text text-center">
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
