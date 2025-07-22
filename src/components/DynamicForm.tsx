import React from 'react';
import {
  Box,
  Paper,
  Typography,
  Grid,
  Button,
  Accordion,
  AccordionSummary,
  AccordionDetails,
  Divider
} from '@mui/material';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import { DynamicFormProps } from '../types';
import { useDynamicForm } from '../hooks/useDynamicForm';
import { FieldRenderer } from './FieldRenderer';

export const DynamicForm: React.FC<DynamicFormProps> = ({
  config,
  initialData,
  onSubmit,
  onChange,
  onValidate,
  loading = false,
  readOnly = false,
  className,
  sx
}) => {
  const {
    data,
    errors,
    touched,
    updateField,
    handleFieldBlur,
    validateAllFields,
    resetForm,
    isValid
  } = useDynamicForm(config, initialData);

  const handleFieldChange = (fieldName: string, value: any) => {
    updateField(fieldName, value);
    if (onChange) {
      onChange(data, fieldName);
    }
  };

  const handleSubmit = (event: React.FormEvent) => {
    event.preventDefault();
    
    const validationResult = validateAllFields();
    if (onValidate) {
      onValidate(validationResult);
    }
    
    onSubmit(data, validationResult.isValid);
  };

  const handleReset = () => {
    resetForm();
  };

  const renderField = (field: any) => (
    <Grid item xs={12} sm={6} md={4} key={field.id}>
      <FieldRenderer
        field={field}
        value={data[field.name]}
        error={errors[field.name]}
        onChange={(value) => handleFieldChange(field.name, value)}
        onBlur={() => handleFieldBlur(field.name)}
        disabled={loading}
        readOnly={readOnly}
      />
    </Grid>
  );

  const renderSection = (section: any) => {
    const columns = section.columns || 1;
    const gridSpacing = config.spacing || 2;

    if (section.title) {
      return (
        <Accordion 
          key={section.id}
          defaultExpanded={!section.collapsed}
          sx={{ mb: 2 }}
        >
          <AccordionSummary expandIcon={<ExpandMoreIcon />}>
            <Typography variant="h6">{section.title}</Typography>
          </AccordionSummary>
          <AccordionDetails>
            {section.description && (
              <Typography variant="body2" color="textSecondary" sx={{ mb: 2 }}>
                {section.description}
              </Typography>
            )}
            <Grid container spacing={gridSpacing}>
              {section.fields.map(renderField)}
            </Grid>
          </AccordionDetails>
        </Accordion>
      );
    }

    return (
      <Box key={section.id} sx={{ mb: 3 }}>
        {section.description && (
          <Typography variant="body2" color="textSecondary" sx={{ mb: 2 }}>
            {section.description}
          </Typography>
        )}
        <Grid container spacing={gridSpacing}>
          {section.fields.map(renderField)}
        </Grid>
      </Box>
    );
  };

  return (
    <Paper 
      component="form" 
      onSubmit={handleSubmit}
      sx={{ p: 3, ...sx }}
      className={className}
    >
      {config.title && (
        <Typography variant="h4" component="h1" gutterBottom>
          {config.title}
        </Typography>
      )}
      
      {config.description && (
        <Typography variant="body1" color="textSecondary" sx={{ mb: 3 }}>
          {config.description}
        </Typography>
      )}

      {config.sections.map(renderSection)}

      <Divider sx={{ my: 3 }} />

      <Box sx={{ display: 'flex', gap: 2, justifyContent: 'flex-end' }}>
        {config.showReset && (
          <Button
            type="button"
            variant="outlined"
            onClick={handleReset}
            disabled={loading}
          >
            {config.resetText || 'Reset'}
          </Button>
        )}
        <Button
          type="submit"
          variant="contained"
          disabled={loading || (!isValid && Object.keys(errors).length > 0)}
        >
          {loading ? 'Submitting...' : (config.submitText || 'Submit')}
        </Button>
      </Box>
    </Paper>
  );
};
