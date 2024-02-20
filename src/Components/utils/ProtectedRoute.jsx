/* eslint-disable react/prop-types */
import { Navigate, Outlet } from "react-router-dom";
import useVerifyToken from "../../api/useVerifyToken";
import { useState, useEffect } from "react";

export const ProtectedRoute = ({ children, redirectPath = "/login" }) => {
  const { data: tokenData } = useVerifyToken();
  const [isAllowed, setIsAllowed] = useState(tokenData);

  useEffect(() => {
      setIsAllowed(tokenData);
  }, []);

  if (!isAllowed) {
    // El usuario no está autorizado, redireccionar al camino especificado
    return <Navigate to={redirectPath} />;
  }

  // El usuario está autorizado, mostrar el contenido protegido
  return children ? children : <Outlet />;
};