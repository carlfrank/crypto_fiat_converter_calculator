// server.js
require('dotenv').config(); // First line to ensure dotenv loads variables early
const express = require('express');
const axios = require('axios');
const NodeCache = require('node-cache');
const cors = require('cors');
const app = express();
const port = 3002;

// Setting up the cache, with a standard TTL of 10 minutes (600 seconds)
const cache = new NodeCache({ stdTTL: 600 });

app.use(cors());
app.use(express.json());

// Endpoint to fetch available cryptocurrencies
app.get('/api/currencies', async (req, res) => {
    const cacheKey = 'currencies';
    let cached = cache.get(cacheKey);

    if (cached) {
        // Send cached data if available
        return res.json(cached);
    }

    try {
        const response = await axios.get('https://api.coingecko.com/api/v3/coins/list');
        // Transform the response to match the expected format
        const transformedCurrencies = response.data.map(coin => ({
            id: coin.id,
            name: coin.symbol.toUpperCase() // Assuming you want the symbol as name, change to coin.name if you want the full name
        }));

        // Cache the transformed response
        cache.set(cacheKey, transformedCurrencies);

        res.json(transformedCurrencies);
    } catch (error) {
        console.error('Failed to fetch currencies:', error);
        res.status(500).json({ success: false, message: 'Failed to fetch currencies' });
    }
});

app.listen(port, () => {
    console.log(`Converter calculator backend listening at http://localhost:${port}`);
});
