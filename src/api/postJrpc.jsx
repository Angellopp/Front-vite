const postJrpc = async (params) => {
    const url = import.meta.env.VITE_URL_BACKEND || "";
    const raw = params;
    const paramsToSend = JSON.stringify({
        "params": [raw.model, raw.method, ... raw.args],
    })
    try {
        const response = await fetch(url + "/jrpc/execute", {
            method: "POST",
            headers: {
                'Content-Type': 'application/json'
            },
            body: paramsToSend,
            credentials: 'include',
        });

        if (!response.ok) {
            throw new Error(`Failed to fetch: ${response.statusText}`);
        }

        const data = await response.json();
        return data;
    } catch (error) {
        console.error('Error fetching:', error);
        throw error; // Re-throw the error to handle it outside the function
    }
};

export default postJrpc;