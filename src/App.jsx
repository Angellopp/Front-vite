import { BrowserRouter, Route, Routes, useNavigate } from 'react-router-dom';
import Home from './Pages/Home';
import Login from './Pages/Login';
import Dashboard from './Pages/Dashboard';
import ProtectedRoute from './Components/ProtectedRoute';
import './App.css';
import { useEffect, useState } from 'react';
// import { Navigate } from 'react-router-dom';
function App() {
    
    // const navigate = useNavigate();
    const [loggedIn, setLoggedIn] = useState(false)

    useEffect(() => {
        // Capturamos el token del usuario
        const user = JSON.parse(localStorage.getItem("user"))

        // Si el token no existe, no hay usuario
        if (!user || !user.token) {
            setLoggedIn(false)
            return
        }
        console.log(user.token)

        // Validamos el token
        fetch("http://172.22.228.144:4000/verifyToken", {
            method: "POST",
            headers: {
                'authorization': 'Bearer ' + user.token
            }
        })
            .then(r => r.json())
            .then(r => {
                if (r.validation = true) localStorage.removeItem("user");
                setLoggedIn(r.validation);
            })

        // setLoggedIn(true)
        // setUser(user.user || "")
    }, [])

    return (
        <div className="App">
            <BrowserRouter>
                <Routes>
                    <Route path="/" element={
                        <Home
                            loggedIn={loggedIn}
                            setLoggedIn={setLoggedIn}
                        />
                    } />
                    <Route path="/login" element={
                        <Login
                            setLoggedIn={setLoggedIn}
                        />
                    } />
                    <Route path="/dashboard" element={
                        <ProtectedRoute path = "/login" >
                            <Dashboard />
                        </ProtectedRoute>
                    } />


                </Routes>
            </BrowserRouter>
        </div>
    )
}

export default App
