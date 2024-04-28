import { createBrowserRouter } from "react-router-dom";

import Home from "../Pages/Home";
import Login from "../Pages/Login";
import NotFound from "../Pages/NotFound";
import { ProtectedRoute } from "../Components/utils/ProtectedRoute";
import ProductsDashboard from "../Pages/ProductsDashboard";
import CustomersDashboard from "../Pages/CustomersDashboard";


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
        element: <ProtectedRoute />,
        children: [
            {
                path: "/customers",
                element: <CustomersDashboard />,
                children: [
                    {
                        path: "/customers/:id",
                        element: <CustomersDashboard />,
                    },
                ]
            },
            {
                path: "/products",
                element: <ProductsDashboard />,
            },
        ],
    },
])