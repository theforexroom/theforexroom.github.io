exports.handler = async (event, context) => {
    // Sirf POST requests allow karein
    if (event.httpMethod !== 'POST') {
        return { statusCode: 405, body: 'Method Not Allowed' };
    }

    const GEMINI_API_KEY = process.env.GEMINI_API_KEY;
    // Aapke kahe anusar gemini-3.1-flash-lite aur v1 stable endpoint
    const url = `https://generativelanguage.googleapis.com/v1/models/gemini-3.1-flash-lite:generateContent?key=${GEMINI_API_KEY}`;

    try {
        const response = await fetch(url, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: event.body // Frontend se aaya hua JSON payload forward karein
        });

        const data = await response.json();
        return {
            statusCode: response.status,
            body: JSON.stringify(data)
        };
    } catch (error) {
        return {
            statusCode: 500,
            body: JSON.stringify({ error: 'Failed to connect to Gemini API' })
        };
    }
};