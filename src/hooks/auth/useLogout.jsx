export default function useLogout() {
    async function logout() {
        const url = import.meta.env.VITE_URL_BACKEND + "/logout"
        const myHeaders = new Headers();
        myHeaders.append("Content-Type", "application/json");
        // const raw = JSON.stringify({});

        const requestOptions = {
            method: "GET",
            headers: myHeaders,
            credentials: 'include',
            // body: raw,
            redirect: "follow"
          };

        await fetch(url, requestOptions)
        .then((response) => {
            response.text()
            console.log(response)
        })
        .finally(() => {
            localStorage.removeItem("user")
        })
        .catch((error) => console.error(error));
    }
    return logout
}