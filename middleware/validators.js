const validateCurrencyConversion = (req, res, next) => {
  const { from, to } = req.query;
  if (!from || !to) {
    return res.status(400).json({ success: false, message: 'Query parameters "from" and "to" are required.' });
  }
  next();
};

module.exports = {
  validateCurrencyConversion,
};
