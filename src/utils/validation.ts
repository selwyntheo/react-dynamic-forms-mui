import { FormField, ValidationRule, FormData, FormErrors, FormValidationResult } from '../types';

export const validateField = (field: FormField, value: any): string | null => {
  if (!field.validation) return null;

  for (const rule of field.validation) {
    const error = validateRule(rule, value, field);
    if (error) return error;
  }

  return null;
};

export const validateRule = (rule: ValidationRule, value: any, field: FormField): string | null => {
  switch (rule.type) {
    case 'required':
      if (field.required && (value === undefined || value === null || value === '')) {
        return rule.message;
      }
      break;
    
    case 'minLength':
      if (value && typeof value === 'string' && value.length < rule.value) {
        return rule.message;
      }
      break;
    
    case 'maxLength':
      if (value && typeof value === 'string' && value.length > rule.value) {
        return rule.message;
      }
      break;
    
    case 'pattern':
      if (value && typeof value === 'string') {
        const regex = new RegExp(rule.value);
        if (!regex.test(value)) {
          return rule.message;
        }
      }
      break;
    
    case 'custom':
      if (rule.validator && value !== undefined && value !== null && value !== '') {
        if (!rule.validator(value)) {
          return rule.message;
        }
      }
      break;
  }

  return null;
};

export const validateForm = (fields: FormField[], data: FormData): FormValidationResult => {
  const errors: FormErrors = {};
  let isValid = true;

  fields.forEach(field => {
    const error = validateField(field, data[field.name]);
    if (error) {
      errors[field.name] = error;
      isValid = false;
    }
  });

  return { isValid, errors };
};

export const getDefaultValue = (field: FormField): any => {
  if (field.defaultValue !== undefined) {
    return field.defaultValue;
  }

  switch (field.type) {
    case 'checkbox':
      return (field as any).options ? [] : false;
    case 'multiselect':
      return [];
    case 'number':
    case 'rating':
    case 'slider':
      return 0;
    case 'switch':
      return false;
    case 'date':
    case 'datetime':
    case 'time':
      return null;
    case 'file':
      return (field as any).multiple ? [] : null;
    default:
      return '';
  }
};

export const getAllFields = (sections: any[]): FormField[] => {
  return sections.reduce((acc, section) => [...acc, ...section.fields], []);
};

export const initializeFormData = (fields: FormField[]): FormData => {
  const data: FormData = {};
  
  fields.forEach(field => {
    data[field.name] = getDefaultValue(field);
  });

  return data;
};
