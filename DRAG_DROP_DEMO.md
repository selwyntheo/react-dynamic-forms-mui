# React Dynamic Forms - Drag & Drop Builder Demo

This demo showcases the powerful drag-and-drop form building capabilities of the React Dynamic Forms library. You can dynamically create complex forms by simply dragging field types from a palette into a form builder area.

## 🎯 Demo Features

### 1. **Interactive Field Palette**
- **Basic Fields**: Text, Email, Password, Number, Textarea
- **Selection Fields**: Dropdown, Multi-select, Radio, Checkbox, Switch
- **Advanced Fields**: Rating, Slider, Date Picker, Time Picker
- **Visual Feedback**: Hover effects and drag indicators

### 2. **Drag & Drop Form Builder**
- **Visual Drop Zone**: Clear indication of where to drop fields
- **Real-time Updates**: Form structure updates instantly
- **Field Management**: Edit, delete, and reorder fields easily
- **Live Preview**: Switch between builder and preview modes

### 3. **Field Customization**
- **Basic Properties**: Label, name, placeholder, helper text
- **Validation**: Required fields, custom validation rules
- **Options Management**: Dynamic options for select/radio/checkbox fields
- **Advanced Settings**: Min/max values, step sizes, etc.

### 4. **Form Preview & Testing**
- **Live Form**: Fully functional form with Material-UI styling
- **Validation Testing**: Real-time validation feedback
- **Form Submission**: Complete form data handling
- **Responsive Design**: Mobile-friendly layout

## 🚀 Getting Started

### Running the Demo

1. **Open the Demo**: Open `drag-drop-demo.html` in your browser
2. **Drag Fields**: Drag field types from the left palette to the builder area
3. **Customize Fields**: Click the edit icon on any field to customize it
4. **Preview Form**: Use the preview button to test your form
5. **Test Functionality**: Fill out and submit the form to see it in action

### Using in Your Project

```bash
npm install react-dynamic-forms-mui
```

```tsx
import React from 'react';
import { DynamicForm, FormConfig } from 'react-dynamic-forms-mui';

// Your form configuration (can be built with the drag & drop builder)
const formConfig: FormConfig = {
  id: 'my-form',
  title: 'Contact Form',
  sections: [
    {
      id: 'contact-info',
      title: 'Contact Information',
      fields: [
        {
          id: 'name',
          name: 'name',
          label: 'Full Name',
          type: 'text',
          required: true,
          validation: [
            { type: 'required', message: 'Name is required' }
          ]
        },
        {
          id: 'email',
          name: 'email',
          label: 'Email Address',
          type: 'email',
          required: true
        }
      ]
    }
  ]
};

function MyApp() {
  const handleSubmit = (data: any, isValid: boolean) => {
    if (isValid) {
      console.log('Form Data:', data);
      // Process your form data here
    }
  };

  return (
    <DynamicForm 
      config={formConfig} 
      onSubmit={handleSubmit}
      onChange={(data, fieldName) => {
        console.log(`Field ${fieldName} changed:`, data[fieldName]);
      }}
    />
  );
}
```

## 🎨 Customization Examples

### Custom Validation

```tsx
const fieldWithValidation = {
  id: 'age',
  name: 'age',
  label: 'Age',
  type: 'number',
  validation: [
    { type: 'required', message: 'Age is required' },
    { type: 'min', value: 18, message: 'Must be 18 or older' },
    { type: 'max', value: 100, message: 'Must be under 100' }
  ]
};
```

### Select Field with Options

```tsx
const selectField = {
  id: 'country',
  name: 'country',
  label: 'Country',
  type: 'select',
  options: [
    { value: 'us', label: 'United States' },
    { value: 'ca', label: 'Canada' },
    { value: 'uk', label: 'United Kingdom' }
  ]
};
```

### Multi-Section Form

```tsx
const complexForm: FormConfig = {
  id: 'registration-form',
  title: 'User Registration',
  sections: [
    {
      id: 'personal',
      title: 'Personal Information',
      fields: [
        // Personal fields...
      ]
    },
    {
      id: 'preferences',
      title: 'Preferences',
      fields: [
        // Preference fields...
      ]
    }
  ]
};
```

## 🔧 Advanced Features

### Real-time Form Configuration Export

The demo includes a feature to copy the form configuration as JSON:

```tsx
// Click the copy button in the demo to get JSON like this:
{
  "id": "dynamic-form",
  "title": "My Dynamic Form",
  "sections": [
    {
      "id": "main-section",
      "title": "Form Fields",
      "fields": [
        {
          "id": "field_1642601234567",
          "name": "field_1642601234567",
          "label": "Full Name",
          "type": "text",
          "required": true,
          "placeholder": "Enter your full name..."
        }
      ]
    }
  ]
}
```

### Dynamic Field Addition

```tsx
// Add fields programmatically
const addField = (fieldType: string) => {
  const newField = {
    id: `field_${Date.now()}`,
    name: `field_${Date.now()}`,
    label: `New ${fieldType} Field`,
    type: fieldType,
    required: false
  };
  
  // Update form configuration
  setFormConfig(prevConfig => ({
    ...prevConfig,
    sections: prevConfig.sections.map(section => ({
      ...section,
      fields: [...section.fields, newField]
    }))
  }));
};
```

### Form State Management

```tsx
import { useDynamicForm } from 'react-dynamic-forms-mui';

function CustomFormComponent() {
  const {
    data,
    errors,
    updateField,
    validateAllFields,
    resetForm,
    isValid
  } = useDynamicForm(formConfig);

  // Access form state directly
  console.log('Current form data:', data);
  console.log('Validation errors:', errors);
  console.log('Is form valid:', isValid);

  return (
    <div>
      {/* Custom form implementation */}
    </div>
  );
}
```

## 📱 Responsive Design

The demo is fully responsive and works great on:
- 📱 **Mobile devices** (phones, small tablets)
- 💻 **Desktop computers** (laptops, desktops)
- 📺 **Large screens** (monitors, TVs)

The field palette stacks vertically on smaller screens, and the form builder adapts its layout automatically.

## 🎯 Key Benefits

1. **Visual Form Building**: No coding required for basic form creation
2. **Instant Preview**: See exactly how your form will look and behave
3. **Export Configuration**: Copy JSON configuration for use in your app
4. **Full Customization**: Edit every aspect of each field
5. **Material-UI Integration**: Beautiful, consistent design out of the box
6. **TypeScript Support**: Full type safety and IntelliSense
7. **Validation System**: Built-in validation with custom rules
8. **Responsive Design**: Works perfectly on all devices

## 🔗 Integration with Existing Apps

### Next.js Integration

```tsx
// pages/form-builder.tsx
import dynamic from 'next/dynamic';

const DragDropFormBuilder = dynamic(
  () => import('../components/DragDropFormBuilder'),
  { ssr: false }
);

export default function FormBuilderPage() {
  return <DragDropFormBuilder />;
}
```

### React Router Integration

```tsx
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import DragDropFormBuilder from './components/DragDropFormBuilder';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/form-builder" element={<DragDropFormBuilder />} />
      </Routes>
    </BrowserRouter>
  );
}
```

## 🎉 Try It Now!

Open the `drag-drop-demo.html` file in your browser and start building forms immediately. The demo runs entirely in the browser with no setup required!

**Pro tip**: Build a form in the demo, copy the JSON configuration, and paste it directly into your React application to use the same form structure.
