# React Dynamic Forms with Material-UI

A powerful and flexible React library for creating dynamic forms with Material-UI components. Build complex forms with validation, theming, and customization capabilities.

## Features

- 🎨 **Material-UI Integration**: Beautiful forms with consistent Material Design
- 🔧 **Dynamic Field Types**: Support for 15+ field types including text, select, checkbox, radio, rating, slider, and more
- ✅ **Built-in Validation**: Comprehensive validation with custom rules
- 📱 **Responsive Design**: Mobile-friendly layouts with grid system
- 🎯 **TypeScript Support**: Full type safety and IntelliSense
- 🔄 **Real-time Updates**: Live form updates with change callbacks
- 📋 **Section Support**: Organize fields into collapsible sections
- 🎛️ **Flexible Configuration**: JSON-based form configuration
- 🎨 **Theming**: Customizable with Material-UI themes

## Installation

```bash
npm install react-dynamic-forms-mui
# or
yarn add react-dynamic-forms-mui
```

### Peer Dependencies

```bash
npm install react react-dom @mui/material @emotion/react @emotion/styled
# or
yarn add react react-dom @mui/material @emotion/react @emotion/styled
```

## Quick Start

```tsx
import React from 'react';
import { DynamicForm, FormConfig } from 'react-dynamic-forms-mui';

const formConfig: FormConfig = {
  id: 'user-form',
  title: 'User Registration',
  sections: [
    {
      id: 'personal-info',
      title: 'Personal Information',
      fields: [
        {
          id: 'firstName',
          name: 'firstName',
          label: 'First Name',
          type: 'text',
          required: true,
          validation: [
            { type: 'required', message: 'First name is required' },
            { type: 'minLength', value: 2, message: 'Minimum 2 characters' }
          ]
        },
        {
          id: 'email',
          name: 'email',
          label: 'Email',
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
        }
      ]
    }
  ]
};

function App() {
  const handleSubmit = (data: any, isValid: boolean) => {
    if (isValid) {
      console.log('Form submitted:', data);
    }
  };

  return (
    <DynamicForm 
      config={formConfig} 
      onSubmit={handleSubmit} 
    />
  );
}
```

## Field Types

### Basic Input Fields
- `text` - Text input
- `email` - Email input with validation
- `password` - Password input
- `number` - Number input
- `tel` - Telephone input
- `url` - URL input
- `textarea` - Multi-line text input

### Selection Fields
- `select` - Single select dropdown
- `multiselect` - Multiple select dropdown
- `radio` - Radio button group
- `checkbox` - Checkbox (single or multiple)
- `switch` - Toggle switch

### Special Fields
- `date` - Date picker
- `datetime` - Date and time picker
- `time` - Time picker
- `file` - File upload
- `rating` - Star rating
- `slider` - Range slider
- `autocomplete` - Autocomplete input

## Configuration Examples

### Complete Form Configuration

```tsx
const complexFormConfig: FormConfig = {
  id: 'complex-form',
  title: 'Complex Form Example',
  description: 'This form demonstrates various field types and features',
  sections: [
    {
      id: 'section1',
      title: 'Basic Information',
      description: 'Enter your basic details',
      fields: [
        {
          id: 'name',
          name: 'name',
          label: 'Full Name',
          type: 'text',
          required: true,
          placeholder: 'Enter your full name',
          validation: [
            { type: 'required', message: 'Name is required' },
            { type: 'minLength', value: 3, message: 'Name must be at least 3 characters' }
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
            { value: 'uk', label: 'United Kingdom' }
          ]
        }
      ]
    },
    {
      id: 'preferences',
      title: 'Preferences',
      fields: [
        {
          id: 'rating',
          name: 'satisfaction',
          label: 'Satisfaction Rating',
          type: 'rating',
          max: 5,
          defaultValue: 3
        },
        {
          id: 'slider',
          name: 'budget',
          label: 'Budget Range',
          type: 'slider',
          min: 0,
          max: 10000,
          step: 100,
          marks: true
        }
      ]
    }
  ],
  submitText: 'Submit Form',
  showReset: true
};
```

### Field Validation

```tsx
const validationExamples = [
  // Required field
  {
    type: 'required',
    message: 'This field is required'
  },
  // Minimum length
  {
    type: 'minLength',
    value: 5,
    message: 'Must be at least 5 characters'
  },
  // Maximum length
  {
    type: 'maxLength',
    value: 50,
    message: 'Must be less than 50 characters'
  },
  // Pattern validation
  {
    type: 'pattern',
    value: '^[0-9]+$',
    message: 'Only numbers allowed'
  },
  // Custom validation
  {
    type: 'custom',
    message: 'Must be an even number',
    validator: (value) => parseInt(value) % 2 === 0
  }
];
```

## Advanced Usage

### Using the Hook Directly

```tsx
import { useDynamicForm, FormConfig } from 'react-dynamic-forms-mui';

function CustomForm() {
  const {
    data,
    errors,
    updateField,
    validateAllFields,
    resetForm,
    isValid
  } = useDynamicForm(formConfig);

  const handleSubmit = () => {
    const validation = validateAllFields();
    if (validation.isValid) {
      // Process form data
      console.log('Valid data:', data);
    }
  };

  // Custom form implementation
  return (
    <div>
      {/* Custom form UI */}
    </div>
  );
}
```

### Custom Field Components

```tsx
import { FieldRenderer, FieldComponentProps } from 'react-dynamic-forms-mui';

const CustomFieldRenderer: React.FC<FieldComponentProps> = (props) => {
  if (props.field.type === 'custom-type') {
    return <CustomComponent {...props} />;
  }
  return <FieldRenderer {...props} />;
};
```

## API Reference

### DynamicForm Props

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `config` | `FormConfig` | required | Form configuration object |
| `initialData` | `FormData` | `{}` | Initial form values |
| `onSubmit` | `(data, isValid) => void` | required | Submit handler |
| `onChange` | `(data, fieldName) => void` | optional | Change handler |
| `onValidate` | `(result) => void` | optional | Validation handler |
| `loading` | `boolean` | `false` | Show loading state |
| `readOnly` | `boolean` | `false` | Make form read-only |
| `className` | `string` | optional | CSS class name |
| `sx` | `object` | optional | Material-UI sx prop |

### FormConfig Interface

```typescript
interface FormConfig {
  id: string;
  title?: string;
  description?: string;
  sections: FormSection[];
  submitText?: string;
  resetText?: string;
  showReset?: boolean;
  spacing?: number;
  variant?: 'outlined' | 'filled' | 'standard';
}
```

### FormField Interface

```typescript
interface FormFieldBase {
  id: string;
  name: string;
  label: string;
  type: FieldType;
  required?: boolean;
  disabled?: boolean;
  hidden?: boolean;
  placeholder?: string;
  helperText?: string;
  validation?: ValidationRule[];
  defaultValue?: any;
  size?: 'small' | 'medium' | 'large';
  fullWidth?: boolean;
  variant?: 'outlined' | 'filled' | 'standard';
}
```

## Examples

Check out the `/examples` directory for more comprehensive examples:
- Basic form
- Complex multi-section form
- Custom validation
- Theming examples
- Integration with form libraries

## Contributing

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## License

MIT © [Your Name]

## Support

- 📚 [Documentation](https://github.com/yourusername/react-dynamic-forms-mui)
- 🐛 [Issue Tracker](https://github.com/yourusername/react-dynamic-forms-mui/issues)
- 💬 [Discussions](https://github.com/yourusername/react-dynamic-forms-mui/discussions)
