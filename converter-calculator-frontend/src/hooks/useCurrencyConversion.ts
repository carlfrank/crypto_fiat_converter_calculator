import { useState, useEffect } from 'react';

interface ICoin {
  id: string;
  name: string;
}

interface IConversionResult {
  success: boolean;
  data: {
    rate: number;
    from: string;
    to: string;
  };
}

interface IUseCurrencyConversion {
  amount: string;
  setAmount: (value: string) => void;
  cryptoCurrency: string;
  setCryptoCurrency: (value: string) => void;
  fiatCurrency: string;
  setFiatCurrency: (value: string) => void;
  convertedAmount: string;
  convertCurrency: () => void;
  cryptoCurrencies: ICoin[];
  fiatCurrencies: ICoin[];
}

export const useCurrencyConversion = (): IUseCurrencyConversion => {
  const [amount, setAmount] = useState<string>('');
  const [cryptoCurrency, setCryptoCurrency] = useState<string>('');
  const [fiatCurrency, setFiatCurrency] = useState<string>('');
  const [convertedAmount, setConvertedAmount] = useState<string>('');
  const [cryptoCurrencies, setCryptoCurrencies] = useState<ICoin[]>([]);
  const [fiatCurrencies, setFiatCurrencies] = useState<ICoin[]>([]);

  useEffect(() => {
    // Fetching cryptocurrencies from the backend
    fetch('http://localhost:3002/api/currencies')
      .then((response) => response.json())
      .then((data: ICoin[]) => {
        setCryptoCurrencies(data);
        if (data.length > 0) {
          setCryptoCurrency(data[0].id); // Optionally set a default cryptocurrency
        }
      })
      .catch((error) => console.error('Error fetching cryptocurrencies:', error));

    // Fetching fiat currencies from the backend (if you have a similar endpoint for fiat currencies)
    fetch('http://localhost:3002/api/fiatcurrencies') // This endpoint must be adjusted to your actual endpoint
      .then((response) => response.json())
      .then((data: ICoin[]) => {
        setFiatCurrencies(data);
        if (data.length > 0) {
          setFiatCurrency(data[0].id); // Optionally set a default fiat currency
        }
      })
      .catch((error) => console.error('Error fetching fiat currencies:', error));
  }, []);

  const convertCurrency = async () => {
    try {
      const response = await fetch(`http://localhost:3002/api/convert?from=${cryptoCurrency}&to=${fiatCurrency}&amount=${amount}`);
      const result: IConversionResult = await response.json();

      if (result.success && result.data && result.data.rate) {
        // Assuming 'rate' gives the conversion amount directly
        setConvertedAmount((parseFloat(amount) * result.data.rate).toString()); // Calculate and set the converted amount
      } else {
        console.error('Conversion failed', result);
      }
    } catch (error) {
      console.error('Error performing conversion:', error);
    }
  };

  return {
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
  };
};
