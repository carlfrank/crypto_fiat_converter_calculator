const express = require('express');
// Adjust the path to correctly point to the location of your validators
const { validateCurrencyConversion } = require('../middleware/validators');
const { convertCurrencies } = require('../controllers/convertController');

const router = express.Router();

router.get('/convert', validateCurrencyConversion, convertCurrencies);

module.exports = router;
