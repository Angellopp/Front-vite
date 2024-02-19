import { useState } from "react";
import { Navigate } from "react-router-dom";
import useVerifyToken  from "../api/useVerifyToken";
import useLogin from "../hooks/auth/useLogin";

export default function AuthForm() {
    const {data} = useVerifyToken();
    const [isLoggedIn, setIsLoggedIn] = useState(data);
    const { mutate: login, isLoading, isError } = useLogin();

    const [user, setUser] = useState("")
    const [password, setPassword] = useState("")
    const [userError, setUserError] = useState("")
    const [passwordError, setPasswordError] = useState("")
    const onButtonClick = async (event) => {
        //Deshabilitar boton mientras se hace una peticion
        event.preventDefault()

        // Set initial error values to empty
        setUserError("")
        setPasswordError("")

        // Check if the user has entered both fields correctly
        if ("" === user) {
            setUserError("Por favor ingrese su usuario")
            return
        }

        // eslint-disable-next-line no-useless-escape
        if (!/^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/.test(user)) {
            setUserError("Por favor ingrese un correo válido")
            return
        }

        if ("" === password) {
            setPasswordError("Por favor ingrese una contraseña")
            return
        }
        // logIn()
        login(
            { email: user, password: password },
            {
                onSuccess: () => { setIsLoggedIn(true); },
                onError: () => { setIsLoggedIn(false); },
            }
        );
    }

    if (isLoggedIn) {
        return <Navigate to="/" />;
    }

    return (
        <div className="container mx-auto mt-20 mb-20">
            
            <h1 className="font-black text-5xl text-center mb-10">Login</h1>

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
                    <label className="errorLabel" style={{ color: "red" }}>{userError}</label>
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
                    <label className="errorLabel" style={{ color: "red" }}>{passwordError}</label>
                </div>
                <div className="text text-center">
                    <button
                        type="submit"
                        className="mx-auto relative inline-flex items-center justify-center p-0.5 me-2 overflow-hidden text-sm font-medium text-gray-900 rounded-lg group bg-gradient-to-br from-cyan-500 to-blue-500 group-hover:from-cyan-500 group-hover:to-blue-500 hover:text-white dark:text-white focus:ring-4 focus:outline-none focus:ring-cyan-200 dark:focus:ring-cyan-800"
                        onClick={onButtonClick} disabled={isLoading}
                    >
                        <span className="mx-auto relative px-5 py-2.5 transition-all ease-in duration-75 bg-white dark:bg-gray-900 rounded-md group-hover:bg-opacity-0">
                            {"Log in"}
                        </span>
                    </button>
                {isLoading && <p>Cargando...</p>}
                {isError && <p style={{ color: "red" }}>Invalid Email or Password</p>}
                </div>
            </div>
        </div>
    );
}