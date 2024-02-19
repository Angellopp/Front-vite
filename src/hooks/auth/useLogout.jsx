

export default function useLogout() {
    // const [dummy, setDummy] = useState(0);
    function logout() {
        // pb.authStore.clear();
        // setDummy(Math.random())
        localStorage.removeItem("user")
    }
    // dummy*4
    return logout
}