import React from 'react';
import { Box, Button } from '@mui/material';
import CurrencySelect from './CurrencySelect'; // Ensure this is the correct path
import AmountInput from './AmountInput'; // Ensure this is the correct path
import { useCurrencyConversion } from '../hooks/useCurrencyConversion'; // Adjust the import path as needed

const CryptoConverter: React.FC = () => {
  const {
    amount,
    setAmount,
    cryptoCurrency,
    setCryptoCurrency,
    fiatCurrency,
    setFiatCurrency,
    convertedAmount,
    convertCurrency,
    cryptoCurrencies,
    fiatCurrencies,
  } = useCurrencyConversion();

  // Preparing options for the CurrencySelect component
  const cryptoOptions = cryptoCurrencies.map((coin) => ({
    value: coin.id,
    label: coin.name,
  }));

  const fiatOptions = fiatCurrencies.map((currency) => ({
    value: currency,
    label: currency.toUpperCase(),
  }));

  return (
    <Box sx={{ maxWidth: '300px', m: 'auto', p: 2, border: '1px solid #ccc', borderRadius: '4px', mt: 5 }}>
      <AmountInput
        amount={amount}
        onAmountChange={(e) => setAmount(e.target.value)}
      />
      <CurrencySelect
        selectedValue={cryptoCurrency}
        onValueChange={(e) => setCryptoCurrency(e.target.value)}
        label="Cryptocurrency"
        options={cryptoOptions}
      />
      <CurrencySelect
        selectedValue={fiatCurrency}
        onValueChange={(e) => setFiatCurrency(e.target.value)}
        label="Fiat Currency"
        options={fiatOptions}
      />
      <Button variant="contained" onClick={convertCurrency} fullWidth sx={{ mb: 2 }}>
        Convert
      </Button>
      {convertedAmount && (
        <Box sx={{ mt: 2, textAlign: 'center' }}>
          <strong>Converted Amount:</strong> {convertedAmount} {fiatCurrency.toUpperCase()}
        </Box>
      )}
    </Box>
  );
};

export default CryptoConverter;
