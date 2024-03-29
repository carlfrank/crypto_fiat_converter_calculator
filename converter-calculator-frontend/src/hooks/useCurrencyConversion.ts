// src/hooks/useCurrencyConversion.ts
import { useState } from 'react';

export const useCurrencyConversion = () => {
  const [amount, setAmount] = useState<number>(1);
  const [selectedCrypto, setSelectedCrypto] = useState<string>('bitcoin');
  const [selectedCurrency, setSelectedCurrency] = useState<string>('usd');
  const [conversionResult, setConversionResult] = useState<string>('');

  const handleAmountChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const newAmount = parseFloat(event.target.value) || 0;
    setAmount(newAmount);
    // Placeholder for conversion logic
    setConversionResult(`Converted amount: ${(newAmount * 50000).toFixed(2)}`);
  };

  const handleCryptoChange = (event: React.ChangeEvent<{ value: unknown }>) => {
    setSelectedCrypto(event.target.value as string);
    // Placeholder for conversion logic
  };

  const handleCurrencyChange = (event: React.ChangeEvent<{ value: unknown }>) => {
    setSelectedCurrency(event.target.value as string);
    // Placeholder for conversion logic
  };

  // You will replace this function with an actual API call to get the conversion rate
  const convertCurrency = async () => {
    // This would be replaced with an API call
    const conversionRate = 50000; // Mock conversion rate for 1 BTC to USD
    const result = (amount * conversionRate).toLocaleString('en-US', { maximumFractionDigits: 2 });
    setConversionResult(`$${result}`);
  };

  return {
    amount,
    selectedCrypto,
    selectedCurrency,
    conversionResult,
    handleAmountChange,
    handleCryptoChange,
    handleCurrencyChange,
  };
};
