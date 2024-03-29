// server.js
require('dotenv').config(); // First line to ensure dotenv loads variables early
const express = require('express');
const axios = require('axios');
const NodeCache = require('node-cache');
const cors = require('cors');
const app = express();
const routes = require('./routes/currencyRoutes'); // Corrected import path for currencyRoutes
const port = process.env.PORT || 3002;

// Setting up the cache, with a standard TTL of 10 minutes (600 seconds)
const cache = new NodeCache({ stdTTL: 600 });

app.use(cors());
app.use(express.json());
app.use('/api', routes);

// Endpoint to fetch available cryptocurrencies
app.get('/api/currencies', async (req, res) => {
    const cacheKey = 'currencies';
    const cached = cache.get(cacheKey);

    if (cached) {
        return res.json({ success: true, data: cached });
    }

    try {
        const response = await axios.get('https://api.coingecko.com/api/v3/coins/list');
        const currencies = response.data;
        cache.set(cacheKey, currencies);
        res.json({ success: true, data: currencies });
    } catch (error) {
        console.error('Failed to fetch currencies:', error);
        res.status(500).json({ success: false, message: 'Failed to fetch currencies' });
    }
});

// Endpoint to fetch conversion rates
app.get('/api/convert', async (req, res) => {
    const { from, to } = req.query;
    const cacheKey = `convert_${from}_${to}`;

    const cached = cache.get(cacheKey);
    if (cached) {
        return res.json({ success: true, data: cached });
    }

    try {
        const url = `https://api.coingecko.com/api/v3/simple/price?ids=${from}&vs_currencies=${to}`;
        const response = await axios.get(url);
        const rate = response.data[from][to];
        const result = { rate, from, to };

        cache.set(cacheKey, result);
        res.json({ success: true, data: result });
    } catch (error) {
        console.error(`Failed to fetch conversion rate from ${from} to ${to}:`, error);
        res.status(500).json({ success: false, message: `Failed to fetch conversion rate from ${from} to ${to}` });
    }
});

app.listen(port, () => {
    console.log(`Converter calculator backend listening at http://localhost:${port}`);
});
