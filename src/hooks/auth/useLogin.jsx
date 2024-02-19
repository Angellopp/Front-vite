import { useMutation } from "react-query";
export default function useLogin() {
  async function login({ email, password }) {
    const name_database = import.meta.env.VITE_NOMBRE_DB
    const url = import.meta.env.VITE_URL_ODOO + "/login"
    await fetch(url, {
        method: "POST",
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({ name_database, user:email, password })
    })
    .then(r => r.json())
    .then(r => {
        // si el token es correcto seguir
        if (r.token) {
            localStorage.setItem("user", JSON.stringify({ token: r.token, userId: r.userId, password: r.password }))
        } else {
            // window.alert("Usuario o contraseña incorrecto")
            onerror()
        }
    })
  }
  return useMutation({mutationFn: login})
}
