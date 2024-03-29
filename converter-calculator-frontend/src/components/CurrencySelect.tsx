// src/components/CurrencySelect.tsx
import React from 'react';
import { FormControl, InputLabel, Select, MenuItem } from '@mui/material';

interface CurrencySelectProps {
  selectedValue: string;
  onValueChange: (event: React.ChangeEvent<{ value: unknown }>) => void;
  label: string;
  options: Array<{ value: string; label: string }>;
}

const CurrencySelect: React.FC<CurrencySelectProps> = ({ selectedValue, onValueChange, label, options }) => (
  <FormControl fullWidth margin="normal">
    <InputLabel>{label}</InputLabel>
    <Select
      value={selectedValue}
      label={label}
      onChange={onValueChange}
    >
      {options.map((option) => (
        <MenuItem key={option.value} value={option.value}>
          {option.label}
        </MenuItem>
      ))}
    </Select>
  </FormControl>
);

export default CurrencySelect;
