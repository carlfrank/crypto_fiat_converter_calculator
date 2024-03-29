// src/components/AmountInput.tsx
import React from 'react';
import { TextField } from '@mui/material';

interface AmountInputProps {
  amount: number;
  onAmountChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
}

const AmountInput: React.FC<AmountInputProps> = ({ amount, onAmountChange }) => (
  <TextField
    label="Enter Amount"
    type="number"
    value={amount.toString()}
    onChange={onAmountChange}
    fullWidth
    margin="normal"
  />
);

export default AmountInput;
