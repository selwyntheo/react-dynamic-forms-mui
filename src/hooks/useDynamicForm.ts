import { useState, useCallback, useEffect } from 'react';
import { FormConfig, FormData, FormErrors, FormValidationResult } from '../types';
import { validateForm, initializeFormData, getAllFields } from '../utils/validation';

export const useDynamicForm = (config: FormConfig, initialData?: FormData) => {
  const allFields = getAllFields(config.sections);
  const [data, setData] = useState<FormData>(() => {
    const defaultData = initializeFormData(allFields);
    return { ...defaultData, ...initialData };
  });
  
  const [errors, setErrors] = useState<FormErrors>({});
  const [touched, setTouched] = useState<{ [key: string]: boolean }>({});

  const validateAllFields = useCallback((): FormValidationResult => {
    return validateForm(allFields, data);
  }, [allFields, data]);

  const updateField = useCallback((fieldName: string, value: any) => {
    setData((prev: FormData) => ({
      ...prev,
      [fieldName]: value
    }));

    // Clear error when field is updated
    if (errors[fieldName]) {
      setErrors((prev: FormErrors) => {
        const newErrors = { ...prev };
        delete newErrors[fieldName];
        return newErrors;
      });
    }
  }, [errors]);

  const handleFieldBlur = useCallback((fieldName: string) => {
    setTouched((prev: { [key: string]: boolean }) => ({
      ...prev,
      [fieldName]: true
    }));

    // Validate single field on blur
    const field = allFields.find(f => f.name === fieldName);
    if (field) {
      const fieldError = validateForm([field], data);
      if (fieldError.errors[fieldName]) {
        setErrors((prev: FormErrors) => ({
          ...prev,
          [fieldName]: fieldError.errors[fieldName]
        }));
      }
    }
  }, [allFields, data]);

  const resetForm = useCallback(() => {
    const defaultData = initializeFormData(allFields);
    setData({ ...defaultData, ...initialData });
    setErrors({});
    setTouched({});
  }, [allFields, initialData]);

  const setFieldError = useCallback((fieldName: string, error: string) => {
    setErrors((prev: FormErrors) => ({
      ...prev,
      [fieldName]: error
    }));
  }, []);

  const clearFieldError = useCallback((fieldName: string) => {
    setErrors((prev: FormErrors) => {
      const newErrors = { ...prev };
      delete newErrors[fieldName];
      return newErrors;
    });
  }, []);

  useEffect(() => {
    if (initialData) {
      setData((prev: FormData) => ({ ...prev, ...initialData }));
    }
  }, [initialData]);

  return {
    data,
    errors,
    touched,
    updateField,
    handleFieldBlur,
    validateAllFields,
    resetForm,
    setFieldError,
    clearFieldError,
    isValid: Object.keys(errors).length === 0
  };
};
