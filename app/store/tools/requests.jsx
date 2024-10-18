const normalApiFetch = async (endpoint, options) => {
    try {
        const response = await fetch(endpoint, options);
        if (!response.ok) {
            throw new Error('Network response was not ok');
        }
        const data = await response.json();
        return { data: data, error: null };
    } catch (error) {
        return { data: null, error: error };
    }
};

export { normalApiFetch }