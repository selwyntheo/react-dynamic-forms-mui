import React from 'react';
import { ThemeProvider, createTheme } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';
import { Container, Box } from '@mui/material';
import { DynamicForm, FormConfig, FormData } from '../src/index';

const theme = createTheme({
  palette: {
    primary: {
      main: '#1976d2',
    },
    secondary: {
      main: '#dc004e',
    },
  },
});

const basicFormConfig: FormConfig = {
  id: 'basic-example',
  title: 'Basic Contact Form',
  description: 'Please fill out this simple contact form',
  sections: [
    {
      id: 'contact-section',
      fields: [
        {
          id: 'firstName',
          name: 'firstName',
          label: 'First Name',
          type: 'text',
          required: true,
          validation: [
            { type: 'required', message: 'First name is required' },
            { type: 'minLength', value: 2, message: 'Minimum 2 characters required' }
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
              message: 'Please enter a valid email address' 
            }
          ]
        },
        {
          id: 'phone',
          name: 'phone',
          label: 'Phone Number',
          type: 'tel',
          placeholder: '+1 (555) 123-4567'
        },
        {
          id: 'message',
          name: 'message',
          label: 'Message',
          type: 'textarea',
          rows: 4,
          required: true,
          validation: [
            { type: 'required', message: 'Message is required' },
            { type: 'minLength', value: 10, message: 'Message must be at least 10 characters' }
          ]
        }
      ]
    }
  ],
  submitText: 'Send Message',
  showReset: true,
  resetText: 'Clear Form'
};

export default function BasicExample() {
  const handleSubmit = (data: FormData, isValid: boolean) => {
    console.log('Form submission:', { data, isValid });
    
    if (isValid) {
      alert('Form submitted successfully!');
      // Here you would typically send the data to your backend
    } else {
      alert('Please fix the form errors before submitting.');
    }
  };

  const handleChange = (data: FormData, fieldName: string) => {
    console.log('Field changed:', fieldName, data[fieldName]);
  };

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <Container maxWidth="md">
        <Box sx={{ py: 4 }}>
          <DynamicForm
            config={basicFormConfig}
            onSubmit={handleSubmit}
            onChange={handleChange}
          />
        </Box>
      </Container>
    </ThemeProvider>
  );
}
