import { Navigate , useLocation} from "react-router-dom";
import AuthForm from "../Components/AuthForm";
import  useVerifyToken from "../hooks/auth/useVerifyToken";
import Loading from "../Components/indicators/Loading";

export default function IsLoggin( ) {
    const location = useLocation();
    const from = location.state?.from || '/'; 
    const { data , isLoading } = useVerifyToken();  
    const isLoggedIn = data;

    if (isLoading) {
        return <Loading/>;
    } 
    if (isLoggedIn) {
        // if (from) 
        return <Navigate to={from} />
        // return <Navigate to="/" />
    }
    return <AuthForm fromUrl={from}/>;
}