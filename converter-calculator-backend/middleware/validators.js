const validateCurrencyConversion = (req, res, next) => {
  const { from, to } = req.query;
  const currencyCodeRegex = /^[A-Za-z]{3,4}$/; // Example regex for currency codes

  if (!from || !to) {
    return res.status(400).json({ success: false, message: 'Query parameters "from" and "to" are required.' });
  }
  
  if (!currencyCodeRegex.test(from) || !currencyCodeRegex.test(to)) {
    return res.status(400).json({ success: false, message: 'Invalid currency code format.' });
  }

  next();
};

module.exports = {
  validateCurrencyConversion,
};
