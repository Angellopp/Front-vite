import { createBrowserRouter } from "react-router-dom";

import Home from "../Pages/Home";
import Login from "../Pages/Login";
import Dashboard from "../Pages/Dashboard";
import NotFound from "../Pages/NotFound";
import { verifyToken } from "../Api/VerifyToken";
import { ProtectedRoute } from "../Components/utils/ProtectedRoute";

export const router = createBrowserRouter([

    {
        path: "/",
        element: <Home />,
        errorElement: <NotFound />,
    },
    {
        path: "/login",
        element: <Login />,
        errorElement: <NotFound />,
    },
    {
        element: <ProtectedRoute isAllowed={localStorage.getItem("user") ? verifyToken(localStorage.getItem("user").token) : false} />,
        children: [
            {
                path: "/dashboard",
                element: <Dashboard />,
            },
        ],
    },
])