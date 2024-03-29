import { useState, useEffect } from 'react';
import axios from 'axios';

export const useCurrencyConversion = () => {
  const [amount, setAmount] = useState<number>(1);
  const [selectedCrypto, setSelectedCrypto] = useState<string>('bitcoin');
  const [selectedCurrency, setSelectedCurrency] = useState<string>('usd');
  const [conversionResult, setConversionResult] = useState<string>('');
  const [cryptoOptions, setCryptoOptions] = useState<{ value: string; label: string }[]>([]);
  const [currencyOptions, setCurrencyOptions] = useState<{ value: string; label: string }[]>([]);

  useEffect(() => {
    const fetchCurrencies = async () => {
      try {
        const response = await axios.get('/api/currencies');
        // Assuming response structure is an array of { id: string, name: string }
        // Adjust this transformation based on your actual API response
        const cryptoOptions = response.data.map((currency: any) => ({
          value: currency.id,
          label: currency.name,
        }));
        setCryptoOptions(cryptoOptions);
        // You might need a separate call or logic to differentiate between crypto and fiat currencies
        setCurrencyOptions(cryptoOptions); // Example: adjust as necessary
      } catch (error) {
        console.error('Failed to fetch currencies:', error);
      }
    };

    fetchCurrencies();
  }, []);

  const handleAmountChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const newAmount = parseFloat(event.target.value) || 0;
    setAmount(newAmount);
    convertCurrency(); // Trigger conversion when amount changes
  };

  const handleCryptoChange = (event: React.ChangeEvent<{ value: unknown }>) => {
    setSelectedCrypto(event.target.value as string);
    convertCurrency(); // Trigger conversion when crypto changes
  };

  const handleCurrencyChange = (event: React.ChangeEvent<{ value: unknown }>) => {
    setSelectedCurrency(event.target.value as string);
    convertCurrency(); // Trigger conversion when currency changes
  };

  const convertCurrency = async () => {
    if (!selectedCrypto || !selectedCurrency || amount <= 0) return;
    try {
      const response = await axios.get(`/api/convert?from=${selectedCrypto}&to=${selectedCurrency}&amount=${amount}`);
      const result = response.data.rate; // Adjust according to your actual API response
      setConversionResult(`${result.toFixed(2)}`); // Example formatting
    } catch (error) {
      console.error('Failed to convert currency:', error);
    }
  };

  return {
    amount,
    selectedCrypto,
    selectedCurrency,
    conversionResult,
    cryptoOptions, // Added to return
    currencyOptions, // Added to return
    handleAmountChange,
    handleCryptoChange,
    handleCurrencyChange,
  };
};
