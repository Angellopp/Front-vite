import { Navigate } from "react-router-dom";
import AuthForm from "../Components/AuthForm";
import { verifyToken } from "../Api/VerifyToken";

export default function IsLoggin() {
    
    const isLoggedIn = localStorage.getItem("user") ? verifyToken(localStorage.getItem("user").token) : false;
    if (isLoggedIn) {
        return <Navigate to="/" />
    }
    return <AuthForm/>
}