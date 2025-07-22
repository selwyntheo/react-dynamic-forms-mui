import React from 'react';
import {
  FormControl,
  FormLabel,
  FormGroup,
  FormControlLabel,
  Checkbox,
  Radio,
  RadioGroup,
  FormHelperText,
  Switch
} from '@mui/material';
import { FieldComponentProps, CheckboxField } from '../../types';

interface CheckboxFieldComponentProps extends FieldComponentProps {
  field: CheckboxField;
}

export const CheckboxFieldComponent: React.FC<CheckboxFieldComponentProps> = ({
  field,
  value,
  error,
  onChange,
  onBlur,
  disabled,
  readOnly
}) => {
  const handleSingleCheckboxChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    onChange(event.target.checked);
  };

  const handleMultipleCheckboxChange = (optionValue: string | number) => {
    const currentValues = Array.isArray(value) ? (value as (string | number)[]) : [];
    const newValues = currentValues.indexOf(optionValue) !== -1
      ? currentValues.filter((v: string | number) => v !== optionValue)
      : [...currentValues, optionValue];
    onChange(newValues);
  };

  const handleBlur = () => {
    if (onBlur) onBlur();
  };

  // Single checkbox (no options)
  if (!field.options) {
    return (
      <FormControl error={!!error} sx={{ mb: 2 }}>
        <FormControlLabel
          control={
            <Checkbox
              id={field.id}
              name={field.name}
              checked={!!value}
              onChange={handleSingleCheckboxChange}
              onBlur={handleBlur}
              disabled={disabled || field.disabled}
              readOnly={readOnly}
            />
          }
          label={field.label}
          required={field.required}
        />
        {(error || field.helperText) && (
          <FormHelperText>{error || field.helperText}</FormHelperText>
        )}
      </FormControl>
    );
  }

  // Multiple checkboxes (with options)
  return (
    <FormControl error={!!error} sx={{ mb: 2 }}>
      <FormLabel component="legend" required={field.required}>
        {field.label}
      </FormLabel>
      <FormGroup>
        {field.options.map((option) => (
          <FormControlLabel
            key={option.value}
            control={
              <Checkbox
                checked={Array.isArray(value) && (value as (string | number)[]).indexOf(option.value) !== -1}
                onChange={() => handleMultipleCheckboxChange(option.value)}
                onBlur={handleBlur}
                disabled={disabled || field.disabled || option.disabled}
                readOnly={readOnly}
              />
            }
            label={option.label}
          />
        ))}
      </FormGroup>
      {(error || field.helperText) && (
        <FormHelperText>{error || field.helperText}</FormHelperText>
      )}
    </FormControl>
  );
};

interface RadioFieldComponentProps extends FieldComponentProps {
  field: any; // SelectField with radio type
}

export const RadioFieldComponent: React.FC<RadioFieldComponentProps> = ({
  field,
  value,
  error,
  onChange,
  onBlur,
  disabled,
  readOnly
}) => {
  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    onChange(event.target.value);
  };

  const handleBlur = () => {
    if (onBlur) onBlur();
  };

  return (
    <FormControl error={!!error} sx={{ mb: 2 }}>
      <FormLabel component="legend" required={field.required}>
        {field.label}
      </FormLabel>
      <RadioGroup
        name={field.name}
        value={value || ''}
        onChange={handleChange}
        onBlur={handleBlur}
      >
        {field.options?.map((option: any) => (
          <FormControlLabel
            key={option.value}
            value={option.value}
            control={
              <Radio
                disabled={disabled || field.disabled || option.disabled}
                readOnly={readOnly}
              />
            }
            label={option.label}
          />
        ))}
      </RadioGroup>
      {(error || field.helperText) && (
        <FormHelperText>{error || field.helperText}</FormHelperText>
      )}
    </FormControl>
  );
};

export const SwitchFieldComponent: React.FC<FieldComponentProps> = ({
  field,
  value,
  error,
  onChange,
  onBlur,
  disabled,
  readOnly
}) => {
  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    onChange(event.target.checked);
  };

  const handleBlur = () => {
    if (onBlur) onBlur();
  };

  return (
    <FormControl error={!!error} sx={{ mb: 2 }}>
      <FormControlLabel
        control={
          <Switch
            id={field.id}
            name={field.name}
            checked={!!value}
            onChange={handleChange}
            onBlur={handleBlur}
            disabled={disabled || field.disabled}
            readOnly={readOnly}
          />
        }
        label={field.label}
        required={field.required}
      />
      {(error || field.helperText) && (
        <FormHelperText>{error || field.helperText}</FormHelperText>
      )}
    </FormControl>
  );
};
