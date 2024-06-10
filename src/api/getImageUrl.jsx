const getImageUrl = async (url, session_id, object_id) => {
    const myHeaders = new Headers();
    myHeaders.append("Cookie", "frontend_lang=es_PE; session_id=" + session_id);

    const requestOptions = {
        method: "GET",
        headers: myHeaders,
        redirect: "follow"
    };

    fetch(url + "/web/image?model=res.users&field=avatar_128&id=" + object_id, requestOptions)
    .then((response) => response.text())
    .then((result) => console.log(result))
    .catch((error) => console.error(error));
}

export default getImageUrl