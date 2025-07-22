import React from 'react';
import { DynamicForm, FormConfig } from '../src/index';

const advancedFormConfig: FormConfig = {
  id: 'advanced-example',
  title: 'Advanced Registration Form',
  description: 'Complete registration form with various field types',
  sections: [
    {
      id: 'personal-info',
      title: 'Personal Information',
      description: 'Basic personal details',
      fields: [
        {
          id: 'title',
          name: 'title',
          label: 'Title',
          type: 'select',
          options: [
            { value: 'mr', label: 'Mr.' },
            { value: 'mrs', label: 'Mrs.' },
            { value: 'ms', label: 'Ms.' },
            { value: 'dr', label: 'Dr.' }
          ]
        },
        {
          id: 'firstName',
          name: 'firstName',
          label: 'First Name',
          type: 'text',
          required: true,
          validation: [
            { type: 'required', message: 'First name is required' }
          ]
        },
        {
          id: 'lastName',
          name: 'lastName',
          label: 'Last Name',
          type: 'text',
          required: true,
          validation: [
            { type: 'required', message: 'Last name is required' }
          ]
        },
        {
          id: 'dateOfBirth',
          name: 'dateOfBirth',
          label: 'Date of Birth',
          type: 'date',
          required: true
        },
        {
          id: 'gender',
          name: 'gender',
          label: 'Gender',
          type: 'radio',
          options: [
            { value: 'male', label: 'Male' },
            { value: 'female', label: 'Female' },
            { value: 'other', label: 'Other' },
            { value: 'prefer-not-to-say', label: 'Prefer not to say' }
          ]
        }
      ]
    },
    {
      id: 'contact-info',
      title: 'Contact Information',
      description: 'How can we reach you?',
      fields: [
        {
          id: 'email',
          name: 'email',
          label: 'Email Address',
          type: 'email',
          required: true,
          validation: [
            { type: 'required', message: 'Email is required' },
            { 
              type: 'pattern', 
              value: '^[^\\s@]+@[^\\s@]+\\.[^\\s@]+$', 
              message: 'Invalid email format' 
            }
          ]
        },
        {
          id: 'phone',
          name: 'phone',
          label: 'Phone Number',
          type: 'tel',
          validation: [
            {
              type: 'pattern',
              value: '^[+]?[1-9]\\d{1,14}$',
              message: 'Invalid phone number format'
            }
          ]
        },
        {
          id: 'country',
          name: 'country',
          label: 'Country',
          type: 'select',
          required: true,
          options: [
            { value: 'us', label: 'United States' },
            { value: 'ca', label: 'Canada' },
            { value: 'uk', label: 'United Kingdom' },
            { value: 'au', label: 'Australia' },
            { value: 'de', label: 'Germany' },
            { value: 'fr', label: 'France' }
          ]
        },
        {
          id: 'address',
          name: 'address',
          label: 'Address',
          type: 'textarea',
          rows: 3
        }
      ]
    },
    {
      id: 'preferences',
      title: 'Preferences & Settings',
      description: 'Customize your experience',
      fields: [
        {
          id: 'interests',
          name: 'interests',
          label: 'Interests',
          type: 'checkbox',
          options: [
            { value: 'technology', label: 'Technology' },
            { value: 'sports', label: 'Sports' },
            { value: 'music', label: 'Music' },
            { value: 'travel', label: 'Travel' },
            { value: 'cooking', label: 'Cooking' },
            { value: 'reading', label: 'Reading' }
          ]
        },
        {
          id: 'communicationPreference',
          name: 'communicationPreference',
          label: 'Preferred Communication',
          type: 'multiselect',
          options: [
            { value: 'email', label: 'Email' },
            { value: 'sms', label: 'SMS' },
            { value: 'phone', label: 'Phone Call' },
            { value: 'mail', label: 'Postal Mail' }
          ]
        },
        {
          id: 'satisfaction',
          name: 'satisfaction',
          label: 'How likely are you to recommend us?',
          type: 'rating',
          max: 10,
          defaultValue: 5,
          helperText: 'Rate from 1 (not likely) to 10 (very likely)'
        },
        {
          id: 'budget',
          name: 'budget',
          label: 'Monthly Budget ($)',
          type: 'slider',
          min: 0,
          max: 5000,
          step: 100,
          defaultValue: 1000,
          marks: [
            { value: 0, label: '$0' },
            { value: 1000, label: '$1K' },
            { value: 2500, label: '$2.5K' },
            { value: 5000, label: '$5K' }
          ]
        },
        {
          id: 'newsletter',
          name: 'newsletter',
          label: 'Subscribe to newsletter',
          type: 'switch',
          defaultValue: true
        },
        {
          id: 'terms',
          name: 'terms',
          label: 'I agree to the terms and conditions',
          type: 'checkbox',
          required: true,
          validation: [
            {
              type: 'custom',
              message: 'You must agree to the terms and conditions',
              validator: (value) => value === true
            }
          ]
        }
      ]
    }
  ],
  submitText: 'Complete Registration',
  showReset: true,
  resetText: 'Clear All Fields',
  spacing: 3
};

export default function AdvancedExample() {
  const handleSubmit = (data: any, isValid: boolean) => {
    console.log('Advanced form submission:', { data, isValid });
    
    if (isValid) {
      alert('Registration completed successfully!');
    }
  };

  const handleValidate = (result: any) => {
    console.log('Validation result:', result);
  };

  return (
    <DynamicForm
      config={advancedFormConfig}
      onSubmit={handleSubmit}
      onValidate={handleValidate}
      sx={{
        maxWidth: 800,
        margin: '0 auto',
        mt: 4
      }}
    />
  );
}
