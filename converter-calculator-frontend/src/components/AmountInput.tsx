// src/components/AmountInput.tsx

import React from 'react';
import { TextField } from '@mui/material';

interface AmountInputProps {
  amount: string; // Changed to string to directly use the string state
  onAmountChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
}

const AmountInput: React.FC<AmountInputProps> = ({ amount, onAmountChange }) => (
  <TextField
    label="Enter Amount"
    type="number"
    value={amount} // No need to call toString() since amount is already a string
    onChange={onAmountChange}
    fullWidth
    margin="normal"
    InputProps={{
      inputProps: { 
        min: 0, // Ensures only positive numbers can be entered
        step: "0.01" // Allows decimal values up to two places
      }
    }}
    aria-label="Amount" // Provides an accessible name for the input
  />
);

export default AmountInput;
