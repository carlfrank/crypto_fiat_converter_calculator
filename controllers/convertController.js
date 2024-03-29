// convertController.js
const axios = require('axios');
const NodeCache = require('node-cache');

const cache = new NodeCache({ stdTTL: 600 });

const convertCurrencies = async (req, res) => {
  const { from, to } = req.query;
  const cacheKey = `convert_${from}_${to}`;

  // Check the cache first to see if we already have the conversion rate
  const cached = cache.get(cacheKey);
  if (cached) {
    return res.json({ success: true, data: cached });
  }

  // If not in cache, fetch new data
  try {
    const url = `https://api.coingecko.com/api/v3/simple/price?ids=${from}&vs_currencies=${to}`;
    const response = await axios.get(url);
    // Check if response data has the necessary conversion rate
    if (response.data[from] && response.data[from][to]) {
      const rate = response.data[from][to];
      const result = { rate, from, to };
      cache.set(cacheKey, result); // Cache the new rate
      res.json({ success: true, data: result });
    } else {
      // If the expected data is not present, send an appropriate response
      res.status(404).json({ success: false, message: 'Conversion rate not found' });
    }
  } catch (error) {
    console.error(`Failed to fetch conversion rate from ${from} to ${to}:`, error);
    res.status(500).json({ success: false, message: `Failed to fetch conversion rate from ${from} to ${to}` });
  }
};

module.exports = {
  convertCurrencies,
};
