const getImageUrl = async (model, field, id) => {
    const url = import.meta.env.VITE_URL_BACKEND || ""

    try {
        const response = await fetch(url + "/image/"+ model+"/"+field+"/" + id, {
            method: 'GET',
            credentials: 'include'  // Ensure cookies are sent with the request
        });

        if (!response.ok) {
            throw new Error('Failed to fetch image');
        }

        const blob = await response.blob();
        const imageUrl = URL.createObjectURL(blob);
        return imageUrl
    } catch (error) {
        console.error('Error fetching image:', error);
    }
}

export default getImageUrl