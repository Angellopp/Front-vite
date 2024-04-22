// import { BrowserRouter, Route, Routes, useNavigate } from 'react-router-dom';
// import Home from './Pages/Home';
// import Login from './Pages/Login';
// import Dashboard from './Pages/Dashboard';
// import ProtectedRoute from './Components/ProtectedRoute';
// import './App.css';
// import { useEffect, useState } from 'react';
import { useEffect } from 'react';
// import { Navigate } from 'react-router-dom';
function App() {

    // const navigate = useNavigate();
    // const [loggedIn, setLoggedIn] = useState(false)

    useEffect(() => {
        // Capturamos el token del usuario
        const user = JSON.parse(localStorage.getItem("user"))
        const url = import.meta.env.VITE_URL_ODOO
        // Si el token no existe, no hay usuario
        if (!user || !user.token) {
            // setLoggedIn(false)
            return
        }

        // Validamos el token
        fetch(url + "/verifyToken", {
            method: "POST",
            headers: {
                'authorization': 'Bearer ' + user.token
            }
        })
            .then(r => r.json())
            .then(r => {
                if (r.validation == false) localStorage.removeItem("user");
                // setLoggedIn(r.validation);
            })

    }, [])
}

export default App
