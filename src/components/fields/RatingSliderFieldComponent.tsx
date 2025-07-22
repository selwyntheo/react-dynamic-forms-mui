import React from 'react';
import { Rating, Slider, FormControl, FormLabel, FormHelperText } from '@mui/material';
import { FieldComponentProps, RatingField, SliderField } from '../../types';

interface RatingFieldComponentProps extends FieldComponentProps {
  field: RatingField;
}

export const RatingFieldComponent: React.FC<RatingFieldComponentProps> = ({
  field,
  value,
  error,
  onChange,
  onBlur,
  disabled,
  readOnly
}) => {
  const handleChange = (_: React.SyntheticEvent, newValue: number | null) => {
    onChange(newValue);
  };

  const handleBlur = () => {
    if (onBlur) onBlur();
  };

  return (
    <FormControl error={!!error} sx={{ mb: 2 }}>
      <FormLabel component="legend" required={field.required}>
        {field.label}
      </FormLabel>
      <Rating
        name={field.name}
        value={value || 0}
        max={field.max || 5}
        precision={field.precision || 1}
        onChange={handleChange}
        onBlur={handleBlur}
        disabled={disabled || field.disabled}
        readOnly={readOnly}
        sx={{ mt: 1 }}
      />
      {(error || field.helperText) && (
        <FormHelperText>{error || field.helperText}</FormHelperText>
      )}
    </FormControl>
  );
};

interface SliderFieldComponentProps extends FieldComponentProps {
  field: SliderField;
}

export const SliderFieldComponent: React.FC<SliderFieldComponentProps> = ({
  field,
  value,
  error,
  onChange,
  onBlur,
  disabled,
  readOnly
}) => {
  const handleChange = (_: Event, newValue: number | number[]) => {
    onChange(newValue);
  };

  const handleBlur = () => {
    if (onBlur) onBlur();
  };

  return (
    <FormControl error={!!error} sx={{ mb: 2, px: 1 }}>
      <FormLabel component="legend" required={field.required}>
        {field.label}
      </FormLabel>
      <Slider
        name={field.name}
        value={value || field.min || 0}
        min={field.min || 0}
        max={field.max || 100}
        step={field.step || 1}
        marks={field.marks}
        onChange={handleChange}
        onBlur={handleBlur}
        disabled={disabled || field.disabled}
        valueLabelDisplay="auto"
        sx={{ mt: 3, mb: 1 }}
      />
      {(error || field.helperText) && (
        <FormHelperText>{error || field.helperText}</FormHelperText>
      )}
    </FormControl>
  );
};
