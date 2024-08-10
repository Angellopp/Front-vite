import { createBrowserRouter } from "react-router-dom";

import Home from "../Pages/Home";
import Login from "../Pages/Login";
import FormPublic from "../Pages/FormPublic";
import FormTecnico from "../Pages/FormTecnico";
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
        path: "/form/:id",
        element: <FormPublic/>,
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
            {
                path: "/form_tecnico",
                element: <FormTecnico />,
            },
        ],
    },
])