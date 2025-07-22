import React from 'react';
import { TextField } from '@mui/material';
import { FieldComponentProps } from '../../types';

interface TextFieldProps extends FieldComponentProps {
  multiline?: boolean;
  rows?: number;
}

export const TextFieldComponent: React.FC<TextFieldProps> = ({
  field,
  value,
  error,
  onChange,
  onBlur,
  disabled,
  readOnly,
  multiline = false,
  rows
}) => {
  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    onChange(event.target.value);
  };

  const handleBlur = () => {
    if (onBlur) onBlur();
  };

  return (
    <TextField
      id={field.id}
      name={field.name}
      label={field.label}
      value={value || ''}
      onChange={handleChange}
      onBlur={handleBlur}
      error={!!error}
      helperText={error || field.helperText}
      required={field.required}
      disabled={disabled || field.disabled}
      placeholder={field.placeholder}
      type={field.type === 'textarea' ? 'text' : field.type}
      variant={field.variant || 'outlined'}
      size={field.size || 'medium'}
      fullWidth={field.fullWidth !== false}
      multiline={multiline || field.type === 'textarea'}
      rows={rows || (field as any).rows}
      maxRows={(field as any).maxRows}
      InputProps={{
        readOnly: readOnly || false,
      }}
      sx={{ mb: 2 }}
    />
  );
};
