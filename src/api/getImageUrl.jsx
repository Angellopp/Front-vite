const getImageUrl = async () => {
    const myHeaders = new Headers();
    const url = import.meta.env.VITE_URL_BACKEND || ""
    
    if (!url) {
        return ""
    }

    const requestOptions = {
        method: "GET",
        headers: myHeaders,
        redirect: "follow"
    };

    fetch(url + "/web/image/res.users/avatar_128", requestOptions)
    .then((response) => response.text())
    .then((result) => console.log(result))
    .catch((error) => console.error(error));
}

export default getImageUrl