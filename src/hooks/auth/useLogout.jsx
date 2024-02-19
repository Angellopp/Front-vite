export default function useLogout() {
    function logout() {
        localStorage.removeItem("user")
    }
    return logout
}