import { Navigate } from "react-router-dom";
import AuthForm from "../Components/AuthForm";
import  useVerifyToken from "../api/useVerifyToken";

export default function IsLoggin() {

    const { data } = useVerifyToken();
    
    const isLoggedIn = data;
    if (isLoggedIn) {
        return <Navigate to="/" />
    }
    return <AuthForm/>
}