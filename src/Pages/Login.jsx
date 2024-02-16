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
        const name_database = process.env.REACT_APP_NAME_DATABASE
        fetch("http://172.22.228.144:4000/login", {
            method: "POST",
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ name_database, user, password })
        })
            .then(r => r.json())
            .then(r => {
                // si el estatus de la peticion es 200 y el token es correcto seguir
                if (r.token) {
                    localStorage.setItem("user", JSON.stringify({ token: r.token, userId: r.userId }))
                    props.setLoggedIn(true)
                    navigate("/")

                } else {
                    window.alert("Usuario o contraseña incorrecto")
                }
            })
    }

    return (
        <div className={"mainContainer"}>
            <div className={"titleContainer"}>
                <div>Login</div>
            </div>
            <br />
            <div className={"inputContainer"}>
                <input
                    value={user}
                    placeholder="Ingrese su user aqui"
                    onChange={ev => setUser(ev.target.value)}
                    className={"inputBox"} />
                <label className="errorLabel">{userError}</label>
            </div>
            <br />
            <div className={"inputContainer"}>
                <input
                    value={password}
                    placeholder="Ingrese su contraseña aqui"
                    onChange={ev => setPassword(ev.target.value)}
                    className={"inputBox"} />
                <label className="errorLabel">{passwordError}</label>
            </div>
            <br />
            <div className={"inputContainer"}>
                <input
                    className={"inputButton"}
                    type="button"
                    onClick={onButtonClick}
                    value={"Log in"} />
            </div>
        </div>
    )
}

export default Login