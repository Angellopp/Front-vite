import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

const Login = (props) => {
    const [user, setUser] = useState("")
    const [password, setPassword] = useState("")
    const [userError, setUserError] = useState("")
    const [passwordError, setPasswordError] = useState("")

    const navigate = useNavigate();

    const onButtonClick = () => {
        // Set initial error values to empty
        setUserError("")
        setPasswordError("")

        // Check if the user has entered both fields correctly
        if ("" === user) {
            setUserError("Por favor ingrese su usuario")
            return
        }

        if (!/^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/.test(user)) {
            setUserError("Por favor ingrese un correo válido")
            return
        }

        if ("" === password) {
            setPasswordError("Por favor ingrese una contraseña")
            return
        }
        logIn()
    }

    // Log in a user using user and password
    const logIn = () => {
        const name_database = import.meta.env.VITE_NOMBRE_DB
        fetch("http://172.22.228.144:4000/login", {
            method: "POST",
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ name_database, user, password })
        })
            .then(r => r.json())
            .then(r => {
                // si el token es correcto seguir
                if (r.token) {
                    localStorage.setItem("user", JSON.stringify({ token: r.token, userId: r.userId, password: r.password }))
                    props.setLoggedIn(true)
                    navigate("/")

                } else {
                    window.alert("Usuario o contraseña incorrecto")
                }
            })
    }

    return (
        <div className="container mx-auto mt-20 mb-20">
            <h1 className="font-black text-5xl text-center mb-10">Login</h1>
            {/* <br />
            <div className={"inputContainer"}>
                <input
                    value={user}
                    placeholder="Ingrese su user aqui"
                    onChange={ev => setUser(ev.target.value)}
                    className={"inputBox"} />
                <label className="errorLabel">{userError}</label>
            </div>
            <br /> */}
            <div className="max-w-sm mx-auto">
                <div className="mb-5">
                    <label htmlFor="email" className="block mb-2 text-sm font-medium text-gray-900">Ingrese su usuario aqui</label>
                    <input
                        id="email"
                        className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                        value={user}
                        placeholder="usuario@correo.com"
                        //  required
                        onChange={ev => setUser(ev.target.value)}
                    />
                    <label className="errorLabel">{userError}</label>
                </div>
                <div className="mb-5">
                    <label htmlFor="password" className="block mb-2 text-sm font-medium text-gray-900">Ingrese su contraseña aqui</label>
                    <input
                        id="password"
                        type="password"
                        className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                        value={password}
                        // required
                        onChange={ev => setPassword(ev.target.value)}
                    />
                    <label className="errorLabel">{passwordError}</label>
                </div>
                <div className="text text-center">
                    <button
                        type="submit"
                        className="mx-auto relative inline-flex items-center justify-center p-0.5 me-2 overflow-hidden text-sm font-medium text-gray-900 rounded-lg group bg-gradient-to-br from-cyan-500 to-blue-500 group-hover:from-cyan-500 group-hover:to-blue-500 hover:text-white dark:text-white focus:ring-4 focus:outline-none focus:ring-cyan-200 dark:focus:ring-cyan-800"
                        onClick={onButtonClick}
                    >
                        <span className="mx-auto relative px-5 py-2.5 transition-all ease-in duration-75 bg-white dark:bg-gray-900 rounded-md group-hover:bg-opacity-0">
                            {"Log in"}
                        </span>
                    </button>
                </div>
            </div>

            {/* <div className={"inputContainer"}>
                <input
                    value={password}
                    placeholder="Ingrese su contraseña aqui"
                    onChange={ev => setPassword(ev.target.value)}
                    className={"inputBox"} />
                <label className="errorLabel">{passwordError}</label>
            </div> */}
            {/* <br /> */}
            {/* <div className={"inputContainer"}>
                <input
                    className={"inputButton"}
                    type="button"
                    onClick={onButtonClick}
                    value={"Log in"} />
            </div> */}
        </div>
    )
}

export default Login