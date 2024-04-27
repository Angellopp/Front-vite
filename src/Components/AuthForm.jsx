"use client";

import { Button, Alert, Label, TextInput } from "flowbite-react";
import { GoAlertFill } from "react-icons/go";

import { useState } from "react";
import { Navigate } from "react-router-dom";
import useVerifyToken from "../Api/useVerifyToken";
import useLogin from "../hooks/auth/useLogin";

// eslint-disable-next-line react/prop-types
export default function AuthForm({ fromUrl = "/" }) {
  const { data } = useVerifyToken();
  const [isLoggedIn, setIsLoggedIn] = useState(data);
  const { mutate: login, isLoading, isError } = useLogin();

  const [user, setUser] = useState("");
  const [password, setPassword] = useState("");
  const [userError, setUserError] = useState("");
  const [networkError, setNetworkError] = useState("");
  const [passwordError, setPasswordError] = useState("");
  const onButtonClick = async () => {
    //Deshabilitar boton mientras se hace una peticion
    // event.preventDefault();

    // Set initial error values to empty
    setUserError("");
    setPasswordError("");

    // Check if the user has entered both fields correctly
    if ("" === user) {
      setUserError("Por favor ingrese su usuario");
      return;
    }

    // eslint-disable-next-line no-useless-escape
    if (!/^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/.test(user)) {
      setUserError("Por favor ingrese un correo válido");
      return;
    }

    if ("" === password) {
      setPasswordError("Por favor ingrese una contraseña");
      return;
    }
    // logIn()
    login(
      { email: user, password: password },
      {
        onSuccess: () => {
          setIsLoggedIn(true);
        },
        onError: (err) => {
          setIsLoggedIn(false);
          if (err.message && err.message !== "Network response was not ok") {
            if (err.message === "Network Server Error") {
              setNetworkError(
                "Error de comunicación con el backend. Comuníquese con el administrador del sistema."
              );
            } else {
              setNetworkError(err.message);
            }
          }
          else {
            setNetworkError("")
          }
        },
      }
    );
  };

  if (isLoggedIn) {
    return <Navigate to={fromUrl} />;
  }

  return (
    <div className="container mx-auto mt-20 mb-20">
      <h1 className="font-black text-5xl text-center mb-10">Login</h1>
      <div className="max-w-sm mx-auto">
        {!isLoading && networkError && (
          <div className="mb-2 mx-auto">
            <Alert color="failure" className="" icon={GoAlertFill}>
              <div className="pl-4 text-sm font-normal">{networkError}</div>
            </Alert>
          </div>
        )}
        <div className="mb-5">
          <div className="mb-2 block">
            <Label htmlFor="email" color="" value="Ingrese su usuario aquí" />
          </div>
          <TextInput
            id="email"
            placeholder="usuario@correo.com"
            required
            color={userError ? "failure" : ""}
            value={user}
            onChange={(ev) => {
              setUser(ev.target.value);
              setUserError("");
            }}
            onKeyDown={(ev) => {
              if (ev.key === "Enter") {
                onButtonClick();
              }
            }}
            helperText={
              <>
                {userError && (
                  <div className="pl-4 text-sm font-normal flex">
                    <span className="font-medium">
                      {" "}
                      <GoAlertFill />
                    </span>{" "}
                    {userError}
                  </div>
                )}
              </>
            }
          />
        </div>
        <div className="mb-3">
          <div className="mb-2 block">
            <Label
              htmlFor="password"
              color=""
              value="Ingrese su contraseña aquí"
            />
          </div>
          <TextInput
            id="password"
            type="password"
            required
            color={passwordError ? "failure" : ""}
            value={password}
            onChange={(ev) => {
              setPassword(ev.target.value);
              setPasswordError("");
            }}
            onKeyDown={(ev) => {
              if (ev.key === "Enter") {
                onButtonClick();
              }
            }}
            helperText={
              <>
                {passwordError && (
                  <div className="pl-4 text-sm font-normal flex">
                    <span className="font-medium">
                      {" "}
                      <GoAlertFill />
                    </span>{" "}
                    {passwordError}
                  </div>
                )}
              </>
            }
          />
        </div>
        <div className="text text-center">
          {!isLoading && isError && !networkError && (
            <div className="mb-3 mx-auto">
              <Label color="failure" value="Invalid Email or Password" />
            </div>
          )}
          <div className="mx-auto relative inline-flex items-center justify-center">
            <Button type="submit" onClick={onButtonClick} disabled={isLoading}>
              Log in
            </Button>
          </div>
          {isLoading && <p>Cargando...</p>}
        </div>
      </div>
    </div>
  );
}
