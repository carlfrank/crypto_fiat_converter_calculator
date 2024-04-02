// CurrencySelect.tsx
import React from 'react';
import { FormControl, InputLabel, Select, MenuItem, CircularProgress, FormHelperText, SelectChangeEvent } from '@mui/material';

interface Option {
  value: string;
  label: string;
}

interface CurrencySelectProps {
  selectedValue: string;
  onValueChange: (event: SelectChangeEvent<string>) => void; // Ensuring correct typing for the event
  label: string;
  options: Option[];
  isLoading?: boolean;
  error?: string;
}

const CurrencySelect: React.FC<CurrencySelectProps> = ({
  selectedValue,
  onValueChange,
  label,
  options,
  isLoading = false,
  error = '',
}) => (
  <FormControl fullWidth margin="normal" error={!!error}>
    <InputLabel>{label}</InputLabel>
    <Select
      value={selectedValue}
      label={label}
      onChange={onValueChange} // Correctly typed event handler
      disabled={isLoading || !!error}
      inputProps={{
        'aria-label': label,
        'aria-busy': isLoading ? 'true' : 'false',
      }}
    >
      {isLoading ? (
        <MenuItem value="">
          <CircularProgress size={24} />
          <span style={{ marginLeft: '10px' }}>Loading...</span>
        </MenuItem>
      ) : error ? (
        <MenuItem disabled value="">
          Error: {error}
        </MenuItem>
      ) : options.length > 0 ? (
        options.map((option) => (
          <MenuItem key={option.value} value={option.value}>
            {option.label}
          </MenuItem>
        ))
      ) : (
        <MenuItem disabled value="">
          No options available
        </MenuItem>
      )}
    </Select>
    {error && <FormHelperText>{error}</FormHelperText>}
  </FormControl>
);

export default CurrencySelect;
