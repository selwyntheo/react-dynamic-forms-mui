import React from 'react';
import {
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  FormHelperText,
  Chip,
  Box,
  OutlinedInput
} from '@mui/material';
import { FieldComponentProps, SelectField } from '../../types';

interface SelectFieldComponentProps extends FieldComponentProps {
  field: SelectField;
}

export const SelectFieldComponent: React.FC<SelectFieldComponentProps> = ({
  field,
  value,
  error,
  onChange,
  onBlur,
  disabled,
  readOnly
}) => {
  const isMultiple = field.type === 'multiselect';
  const selectedValue = isMultiple ? (value || []) : (value || '');

  const handleChange = (event: any) => {
    const newValue = event.target.value;
    onChange(newValue);
  };

  const handleBlur = () => {
    if (onBlur) onBlur();
  };

  const renderMultipleValue = (selected: string[]) => (
    <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 0.5 }}>
      {selected.map((val) => {
        const option = field.options.find(opt => opt.value === val);
        return (
          <Chip 
            key={val} 
            label={option?.label || val} 
            size="small"
            variant="outlined"
          />
        );
      })}
    </Box>
  );

  return (
    <FormControl
      fullWidth={field.fullWidth !== false}
      error={!!error}
      variant={field.variant || 'outlined'}
      size={field.size || 'medium'}
      sx={{ mb: 2 }}
    >
      <InputLabel id={`${field.id}-label`} required={field.required}>
        {field.label}
      </InputLabel>
      <Select
        labelId={`${field.id}-label`}
        id={field.id}
        name={field.name}
        value={selectedValue}
        onChange={handleChange}
        onBlur={handleBlur}
        disabled={disabled || field.disabled}
        readOnly={readOnly}
        multiple={isMultiple}
        input={isMultiple ? <OutlinedInput label={field.label} /> : undefined}
        renderValue={isMultiple ? renderMultipleValue : undefined}
      >
        {field.options.map((option) => (
          <MenuItem
            key={option.value}
            value={option.value}
            disabled={option.disabled}
          >
            {option.label}
          </MenuItem>
        ))}
      </Select>
      {(error || field.helperText) && (
        <FormHelperText>{error || field.helperText}</FormHelperText>
      )}
    </FormControl>
  );
};
