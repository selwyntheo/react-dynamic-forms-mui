// Test configuration to verify all field types work correctly

import { FormConfig } from '../src/types';

export const testFormConfig: FormConfig = {
  id: 'test-form',
  title: 'Complete Field Test',
  description: 'Testing all available field types and features',
  sections: [
    {
      id: 'text-fields',
      title: 'Text Input Fields',
      fields: [
        {
          id: 'text-field',
          name: 'textField',
          label: 'Text Field',
          type: 'text',
          required: true,
          placeholder: 'Enter some text...',
          helperText: 'This is a standard text field',
          validation: [
            { type: 'required', message: 'This field is required' },
            { type: 'minLength', value: 3, message: 'Minimum 3 characters' }
          ]
        },
        {
          id: 'email-field',
          name: 'emailField',
          label: 'Email Field',
          type: 'email',
          required: true,
          validation: [
            { type: 'required', message: 'Email is required' },
            { 
              type: 'pattern', 
              value: '^[^\\s@]+@[^\\s@]+\\.[^\\s@]+$',
              message: 'Please enter a valid email'
            }
          ]
        },
        {
          id: 'password-field',
          name: 'passwordField',
          label: 'Password Field',
          type: 'password',
          required: true,
          validation: [
            { type: 'required', message: 'Password is required' },
            { type: 'minLength', value: 8, message: 'Password must be at least 8 characters' }
          ]
        },
        {
          id: 'number-field',
          name: 'numberField',
          label: 'Number Field',
          type: 'number',
          min: 0,
          max: 100,
          defaultValue: 50
        },
        {
          id: 'textarea-field',
          name: 'textareaField',
          label: 'Textarea Field',
          type: 'textarea',
          rows: 4,
          placeholder: 'Enter multiple lines of text...'
        }
      ]
    },
    {
      id: 'selection-fields',
      title: 'Selection Fields',
      fields: [
        {
          id: 'select-field',
          name: 'selectField',
          label: 'Select Field',
          type: 'select',
          required: true,
          options: [
            { value: 'option1', label: 'Option 1' },
            { value: 'option2', label: 'Option 2' },
            { value: 'option3', label: 'Option 3' }
          ]
        },
        {
          id: 'multiselect-field',
          name: 'multiselectField',
          label: 'Multi-Select Field',
          type: 'multiselect',
          options: [
            { value: 'red', label: 'Red' },
            { value: 'green', label: 'Green' },
            { value: 'blue', label: 'Blue' },
            { value: 'yellow', label: 'Yellow' }
          ]
        },
        {
          id: 'radio-field',
          name: 'radioField',
          label: 'Radio Field',
          type: 'radio',
          options: [
            { value: 'yes', label: 'Yes' },
            { value: 'no', label: 'No' },
            { value: 'maybe', label: 'Maybe' }
          ]
        },
        {
          id: 'checkbox-single',
          name: 'checkboxSingle',
          label: 'Single Checkbox',
          type: 'checkbox'
        },
        {
          id: 'checkbox-multiple',
          name: 'checkboxMultiple',
          label: 'Multiple Checkboxes',
          type: 'checkbox',
          options: [
            { value: 'feature1', label: 'Feature 1' },
            { value: 'feature2', label: 'Feature 2' },
            { value: 'feature3', label: 'Feature 3' }
          ]
        },
        {
          id: 'switch-field',
          name: 'switchField',
          label: 'Switch Field',
          type: 'switch',
          defaultValue: false
        }
      ]
    },
    {
      id: 'special-fields',
      title: 'Special Fields',
      fields: [
        {
          id: 'rating-field',
          name: 'ratingField',
          label: 'Rating Field',
          type: 'rating',
          max: 5,
          precision: 0.5,
          defaultValue: 3
        },
        {
          id: 'slider-field',
          name: 'sliderField',
          label: 'Slider Field',
          type: 'slider',
          min: 0,
          max: 100,
          step: 10,
          marks: true,
          defaultValue: 50
        },
        {
          id: 'date-field',
          name: 'dateField',
          label: 'Date Field',
          type: 'date'
        },
        {
          id: 'datetime-field',
          name: 'datetimeField',
          label: 'Date Time Field',
          type: 'datetime'
        },
        {
          id: 'time-field',
          name: 'timeField',
          label: 'Time Field',
          type: 'time'
        }
      ]
    }
  ],
  submitText: 'Submit Test Form',
  showReset: true,
  resetText: 'Reset Form',
  spacing: 2
};

// Example of form data structure
export const sampleFormData = {
  textField: 'Sample text',
  emailField: 'user@example.com',
  passwordField: 'password123',
  numberField: 42,
  textareaField: 'This is a sample\nmultiline text',
  selectField: 'option2',
  multiselectField: ['red', 'blue'],
  radioField: 'yes',
  checkboxSingle: true,
  checkboxMultiple: ['feature1', 'feature3'],
  switchField: true,
  ratingField: 4,
  sliderField: 75,
  dateField: '2023-12-25',
  datetimeField: '2023-12-25T14:30',
  timeField: '14:30'
};
