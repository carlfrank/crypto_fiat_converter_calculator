// src/components/CryptoConverter.tsx
import React from 'react';
import { Container, Typography } from '@mui/material';
import CurrencySelect from './CurrencySelect';
import AmountInput from './AmountInput';
import { useCurrencyConversion } from '../hooks/useCurrencyConversion';

const CryptoConverter: React.FC = () => {
  const {
    amount,
    selectedCrypto,
    selectedCurrency,
    conversionResult,
    handleAmountChange,
    handleCryptoChange,
    handleCurrencyChange,
  } = useCurrencyConversion();

  return (
    <Container maxWidth="sm" sx={{ marginTop: '2rem', textAlign: 'center' }}>
      <Typography variant="h4" component="h1" gutterBottom>
        Cryptocurrency Converter Calculator
      </Typography>
      <AmountInput amount={amount} onAmountChange={handleAmountChange} />
      <CurrencySelect
        selectedValue={selectedCrypto}
        onValueChange={handleCryptoChange}
        label="Select Coin"
        // This should come from the API
        options={[
          { value: 'bitcoin', label: 'Bitcoin (BTC)' },
          { value: 'ethereum', label: 'Ethereum (ETH)' },
          // ...other cryptocurrencies
        ]}
      />
      <CurrencySelect
        selectedValue={selectedCurrency}
        onValueChange={handleCurrencyChange}
        label="Select Currency"
        // This should come from the API
        options={[
          { value: 'usd', label: 'US Dollar (USD)' },
          { value: 'eur', label: 'Euro (EUR)' },
          // ...other currencies
        ]}
      />
      <Typography variant="h5" sx={{ marginTop: '2rem' }}>
        Conversion Result: {conversionResult}
      </Typography>
    </Container>
  );
};

export default CryptoConverter;
