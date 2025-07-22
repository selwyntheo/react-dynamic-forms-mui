# React Dynamic Forms with Material-UI

A powerful and flexible React library for creating dynamic forms with Material-UI components, including advanced DataGrid capabilities with CRUD operations, inline editing, and comprehensive configuration management.

<p align="center">
  <img src="https://img.shields.io/badge/React-18+-61DAFB?style=for-the-badge&logo=react&logoColor=white" alt="React 18+">
  <img src="https://img.shields.io/badge/Material--UI-5+-007FFF?style=for-the-badge&logo=mui&logoColor=white" alt="Material-UI 5+">
  <img src="https://img.shields.io/badge/TypeScript-5+-3178C6?style=for-the-badge&logo=typescript&logoColor=white" alt="TypeScript 5+">
  <img src="https://img.shields.io/badge/Build-Passing-brightgreen?style=for-the-badge" alt="Build Status">
</p>

## 🌟 Features

### 🎨 **Core Form Features**
- **Material-UI Integration**: Beautiful forms with consistent Material Design
- **Dynamic Field Types**: Support for 15+ field types including text, select, checkbox, radio, rating, slider, and more
- **Built-in Validation**: Comprehensive validation with custom rules
- **Responsive Design**: Mobile-friendly layouts with grid system
- **TypeScript Support**: Full type safety and IntelliSense
- **Real-time Updates**: Live form updates with change callbacks
- **Section Support**: Organize fields into collapsible sections
- **Flexible Configuration**: JSON-based form configuration
- **Theming**: Customizable with Material-UI themes

### 📊 **Advanced DataGrid Features**
- **CRUD Operations**: Complete Create, Read, Update, Delete functionality
- **Inline Editing**: Edit data directly in tables with save/cancel options
- **Data Formatting**: Automatic formatting for currency, dates, booleans, and custom types
- **Configuration Management**: Comprehensive configuration interface for data sources and columns
- **Event Buttons**: Configurable Insert, Update, Delete buttons with positioning options
- **Column Management**: Advanced field configuration with attributes, display options, and formatting
- **Lookup Attributes**: Static data, API endpoints, and function-based data loading
- **Permissions**: Field-level create and update permissions
- **Professional UI**: Modern Material Design interface with interactive components

## 🚀 Quick Start

### Installation

```bash
npm install react-dynamic-forms-mui
# or
yarn add react-dynamic-forms-mui
```

### Peer Dependencies

```bash
npm install react react-dom @mui/material @emotion/react @emotion/styled @mui/icons-material
# or
yarn add react react-dom @mui/material @emotion/react @emotion/styled @mui/icons-material
```

### Basic Form Example

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

### DataGrid Example

```tsx
import React, { useState } from 'react';
import { DataGridDemo } from 'react-dynamic-forms-mui';

function DataGridApp() {
  return (
    <div>
      <DataGridDemo />
    </div>
  );
}
```

## 📋 Field Types

### Basic Input Fields
- `text` - Text input
- `email` - Email input with validation
- `password` - Password input
- `number` - Number input
- `tel` - Telephone input
- `url` - URL input
- `textarea` - Multi-line text input

### Selection Fields
- `select` - Dropdown selection (single/multiple)
- `radio` - Radio button groups
- `checkbox` - Single checkbox or checkbox groups
- `switch` - Toggle switch

### Advanced Fields
- `rating` - Star rating component
- `slider` - Range slider with marks
- `date` - Date picker
- `time` - Time picker
- `datetime` - Date and time picker
- `file` - File upload
- `autocomplete` - Searchable dropdown

### DataGrid Fields
- `datagrid` - Advanced data table with CRUD operations

## 🎯 DataGrid Configuration

### Data Source Configuration
```typescript
{
  dataSource: {
    type: 'api', // or 'static'
    endpoint: 'https://api.example.com/users',
    method: 'GET',
    headers: {
      'Authorization': 'Bearer token'
    },
    parameters: {
      limit: 100,
      offset: 0
    }
  }
}
```

### Event Buttons Configuration
```typescript
{
  eventButtons: {
    insert: { 
      enabled: true, 
      label: 'Add User', 
      position: 'top' // 'top', 'bottom', 'both'
    },
    update: { 
      enabled: true, 
      label: 'Edit User', 
      position: 'row', // 'row', 'toolbar', 'both'
      mode: 'dialog' // 'inline', 'dialog', 'page'
    },
    delete: { 
      enabled: true, 
      label: 'Remove User', 
      position: 'row',
      confirmDialog: true
    }
  }
}
```

### Column Configuration
```typescript
{
  columns: [
    {
      field: 'salary',
      headerName: 'Salary',
      displayName: 'Employee Salary',
      gridDisplayOption: 'editable', // 'visible', 'hidden', 'readonly', 'editable'
      format: { 
        type: 'financial', 
        currency: 'USD', 
        decimals: 2 
      },
      canCreate: true,
      canUpdate: true,
      lookupAttributes: {
        enabled: true,
        source: 'api',
        apiConfig: {
          endpoint: 'https://api.example.com/departments',
          valueField: 'id',
          labelField: 'name'
        }
      }
    }
  ]
}
```

## 📁 Examples & Demos

All demo files are located in the `examples/` folder. Here's the current status of all demos:

### ✅ **Working Demos**

#### Fully Functional
1. **Standalone Demo** (`examples/standalone-demo.html`) - ✅ WORKING
   - Complete form functionality with real-time validation
   - Interactive features and responsive design
   - No dependencies on built library - perfect for testing

2. **Working Demo** (`examples/working-demo.html`) - ✅ WORKING
   - Self-contained with inline JavaScript
   - Comprehensive form showcase with all field types

3. **Simple Demo** (`examples/simple-demo.html`) - ✅ WORKING
   - Basic functionality demonstration
   - Minimal implementation example

4. **Navigation Hub** (`examples/index.html`) - ✅ WORKING
   - Central navigation for all demos
   - Beautiful organized interface with descriptions

5. **Main Demo** (`demo.html`) - ✅ WORKING
   - Root level demo file

### ⚠️ **Library-Dependent Demos**

The following demos require the built library and may show 404 errors until the library is published to npm:

- `examples/datagrid-demo.html` - DataGrid functionality showcase
- `examples/enhanced-datagrid-demo.html` - Advanced DataGrid configuration
- `examples/configuration-demo.html` - Configuration interface demonstration
- `examples/datagrid-specific-demo.html` - Professional DataGrid with MUI styling
- `examples/drag-drop-demo.html` - Drag and drop form builder

### 🚀 **Running Demos**

1. **Start Development Server**:
   ```bash
   npm run demo
   # Server runs on http://localhost:3000/
   ```

2. **Access Working Demos**:
   - **Navigation Hub**: http://localhost:3000/examples/index.html
   - **Standalone Demo**: http://localhost:3000/examples/standalone-demo.html
   - **Working Demo**: http://localhost:3000/examples/working-demo.html
   - **Simple Demo**: http://localhost:3000/examples/simple-demo.html
   - **Main Demo**: http://localhost:3000/demo.html

### React/TypeScript Examples
- **`examples/BasicExample.tsx`** - Simple form implementation
- **`examples/AdvancedExample.tsx`** - Complex form with validation and sections
- **`examples/DataGridDemo.tsx`** - Complete DataGrid component
- **`examples/DataGridExample.tsx`** - DataGrid integration example
- **`examples/ConfigurableDataGridExample.tsx`** - Configurable DataGrid demo
- **`examples/EnhancedDataGridDemo.tsx`** - Advanced configuration demo
- **`examples/DragDropFormBuilder.tsx`** - Interactive form builder

### 📝 **Demo Recommendations**

- **For testing the library**: Use the standalone demo - it shows all key features
- **For development**: Use `npm run demo` and access the working demos
- **For showcasing**: The navigation hub provides easy access to all demos
- **For documentation**: The standalone demo demonstrates complete functionality
## 🔧 API Reference

### DynamicForm Props

| Prop | Type | Required | Description |
|------|------|----------|-------------|
| `config` | `FormConfig` | Yes | Form configuration object |
| `initialData` | `FormData` | No | Initial form values |
| `onSubmit` | `(data: FormData, isValid: boolean) => void` | No | Submit handler |
| `onChange` | `(data: FormData) => void` | No | Change handler |
| `theme` | `Theme` | No | Material-UI theme |

### FormConfig Interface

```typescript
interface FormConfig {
  id: string;
  title?: string;
  description?: string;
  sections: FormSection[];
  submitButton?: {
    text?: string;
    disabled?: boolean;
  };
}

interface FormSection {
  id: string;
  title?: string;
  description?: string;
  collapsible?: boolean;
  defaultExpanded?: boolean;
  fields: Field[];
}

interface Field {
  id: string;
  name: string;
  label: string;
  type: FieldType;
  required?: boolean;
  disabled?: boolean;
  placeholder?: string;
  validation?: ValidationRule[];
  options?: FieldOption[];
  props?: Record<string, any>;
  gridProps?: {
    xs?: number;
    sm?: number;
    md?: number;
    lg?: number;
    xl?: number;
  };
}
```

### Validation Rules

```typescript
interface ValidationRule {
  type: 'required' | 'minLength' | 'maxLength' | 'pattern' | 'custom' | 'email';
  message: string;
  value?: any;
  validator?: (value: any) => boolean;
}
```

### DataGrid Configuration

```typescript
interface DataGridColumn {
  field: string;
  headerName: string;
  displayName?: string;
  width?: number;
  editable?: boolean;
  type?: 'string' | 'number' | 'date' | 'boolean';
  isPrimaryKey?: boolean;
  gridDisplayOption?: 'visible' | 'hidden' | 'readonly' | 'editable';
  format?: {
    type: 'financial' | 'date' | 'percentage' | 'custom' | 'none';
    currency?: string;
    decimals?: number;
    pattern?: string;
  };
  canCreate?: boolean;
  canUpdate?: boolean;
  formatLookup?: {
    enabled: boolean;
    endpoint?: string;
    valueField?: string;
    displayField?: string;
    parameters?: Record<string, any>;
  };
  lookupAttributes?: {
    enabled: boolean;
    source: 'static' | 'api' | 'function';
    staticData?: Array<{ value: any; label: string }>;
    apiConfig?: {
      endpoint: string;
      method?: 'GET' | 'POST';
      valueField: string;
      labelField: string;
      searchParam?: string;
      headers?: Record<string, string>;
    };
    functionConfig?: {
      functionName: string;
      parameters?: Record<string, any>;
    };
  };
}
```

## 🎨 Theming

Customize the appearance using Material-UI themes:

```tsx
import { createTheme, ThemeProvider } from '@mui/material/styles';

const theme = createTheme({
  palette: {
    primary: {
      main: '#1976d2',
    },
    secondary: {
      main: '#dc004e',
    },
  },
  components: {
    MuiTextField: {
      styleOverrides: {
        root: {
          marginBottom: '16px',
        },
      },
    },
  },
});

function App() {
  return (
    <ThemeProvider theme={theme}>
      <DynamicForm config={formConfig} />
    </ThemeProvider>
  );
}
```

## 🏗️ Development

### Project Structure

```
react-dynamic-forms-mui/
├── src/
│   ├── components/
│   │   ├── fields/                    # Individual field components
│   │   │   ├── TextFieldComponent.tsx
│   │   │   ├── SelectFieldComponent.tsx
│   │   │   ├── CheckboxRadioFieldComponent.tsx
│   │   │   ├── RatingSliderFieldComponent.tsx
│   │   │   └── DataGridFieldComponent.tsx
│   │   ├── DynamicForm.tsx            # Main form component
│   │   ├── FieldRenderer.tsx          # Field type router
│   │   └── DataGridFieldConfig.tsx    # DataGrid configuration
│   ├── hooks/
│   │   └── useDynamicForm.ts          # Form state management
│   ├── utils/
│   │   └── validation.ts              # Validation utilities
│   ├── types.ts                       # TypeScript definitions
│   └── index.ts                       # Main exports
├── examples/                          # Demo files and examples
├── test/
│   └── testConfig.ts                  # Test configurations
├── dist/                              # Built library output
├── package.json
├── tsconfig.json
├── rollup.config.js
└── README.md
```

### Building the Library

```bash
# Install dependencies
npm install

# Build the library
npm run build

# Start development server
npm run dev

# Run demo
npm run demo

# Lint code
npm run lint
```

### Adding Custom Field Types

1. Create a new component in `src/components/fields/`
2. Add the field type to the `FieldType` union in `types.ts`
3. Update the `FieldRenderer` to handle the new type
4. Export the component from `index.ts`

Example:

```tsx
// src/components/fields/CustomFieldComponent.tsx
import React from 'react';
import { TextField } from '@mui/material';
import { FieldComponentProps } from '../../types';

export const CustomFieldComponent: React.FC<FieldComponentProps> = ({
  field,
  value,
  onChange,
  error,
  ...props
}) => {
  return (
    <TextField
      {...props}
      label={field.label}
      value={value || ''}
      onChange={(e) => onChange(e.target.value)}
      error={!!error}
      helperText={error}
      // Custom implementation here
    />
  );
};
```

## 🧪 Testing

The library includes comprehensive test configurations and examples:

- **Unit Tests**: Component-level testing
- **Integration Tests**: Form validation and submission
- **Demo Tests**: Example configurations in `test/testConfig.ts`

## 📦 Bundle Information

- **Build Tool**: Rollup with TypeScript
- **Module Formats**: CommonJS and ESM
- **Bundle Size**: Optimized with tree-shaking
- **Dependencies**: Peer dependencies for React and Material-UI
- **TypeScript**: Full type definitions included

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch: `git checkout -b feature-name`
3. Make your changes and add tests
4. Build the library: `npm run build`
5. Test your changes: Run demos and examples
6. Commit your changes: `git commit -m 'Add feature'`
7. Push to the branch: `git push origin feature-name`
8. Submit a pull request

## 📄 License

MIT License - see LICENSE file for details.

## 🎯 Roadmap

- [ ] Advanced validation rules
- [ ] More field types (rich text editor, color picker, etc.)
- [ ] Form templates and presets
- [ ] Better accessibility support
- [ ] Performance optimizations
- [ ] Additional DataGrid features (sorting, filtering, pagination)
- [ ] Form analytics and tracking

## 🆘 Support

- **Documentation**: Check this README and demo examples
- **Issues**: Report bugs and feature requests on GitHub
- **Examples**: Comprehensive examples in the `examples/` folder
- **Community**: Join discussions and get help

---

<p align="center">
  Made with ❤️ for the React community
</p>
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
