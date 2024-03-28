const express = require('express');
const { validateCurrencyConversion } = require('./validators');
const { convertCurrencies } = require('./convertController');

const router = express.Router();

router.get('/convert', validateCurrencyConversion, convertCurrencies);

module.exports = router;
