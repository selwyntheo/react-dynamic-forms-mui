# Build Instructions

## Development Setup

1. Install dependencies:
```bash
npm install
```

2. Start development build with watch mode:
```bash
npm run dev
```

3. Build for production:
```bash
npm run build
```

## Testing

Run tests:
```bash
npm test
```

Run linting:
```bash
npm run lint
```

Fix linting issues:
```bash
npm run lint:fix
```

## Demo Server

Start demo server to test examples:
```bash
npm run demo
```

This starts a Vite development server on port 3000 serving the examples.

## Storybook

Start Storybook for component development:
```bash
npm run storybook
```

Build Storybook:
```bash
npm run build-storybook
```

## Publishing

1. Build the library:
```bash
npm run build
```

2. Test the build locally:
```bash
npm pack
```

3. Publish to NPM:
```bash
npm publish
```

## Project Structure

```
src/
├── components/           # React components
│   ├── fields/          # Individual field components
│   ├── DynamicForm.tsx  # Main form component
│   └── FieldRenderer.tsx# Field type renderer
├── hooks/               # React hooks
│   └── useDynamicForm.ts# Main form logic hook
├── utils/               # Utility functions
│   └── validation.ts    # Validation utilities
├── types.ts             # TypeScript type definitions
└── index.ts             # Main export file

examples/                # Usage examples
├── BasicExample.tsx     # Simple form example
└── AdvancedExample.tsx  # Complex form with all features

dist/                    # Built library (generated)
```

## Key Features Implemented

### Core Components
- ✅ DynamicForm - Main form component
- ✅ FieldRenderer - Dynamic field rendering
- ✅ Individual field components for all field types

### Field Types Supported
- ✅ Text inputs (text, email, password, number, tel, url)
- ✅ Textarea
- ✅ Select (single and multiple)
- ✅ Radio buttons
- ✅ Checkboxes (single and multiple)
- ✅ Switch/toggle
- ✅ Rating
- ✅ Slider
- ✅ Date/time inputs
- ⚠️  File upload (basic implementation)
- ⚠️  Autocomplete (fallback to select)

### Features
- ✅ Form validation with multiple rule types
- ✅ Sectioned forms with collapsible sections
- ✅ Material-UI theming integration
- ✅ Responsive grid layout
- ✅ Real-time validation
- ✅ TypeScript support
- ✅ Custom hooks for form management

### Advanced Features
- ✅ Custom validation rules
- ✅ Field dependencies
- ✅ Loading states
- ✅ Read-only mode
- ✅ Form reset functionality
- ✅ Change event handling

## Notes

The library is designed to be:
- **Modular**: Each field type has its own component
- **Extensible**: Easy to add new field types
- **Type-safe**: Full TypeScript support
- **Accessible**: Built on Material-UI components
- **Performant**: Optimized re-rendering with React hooks
