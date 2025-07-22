import React from 'react';
import { FormField, FieldComponentProps } from '../types';
import { TextFieldComponent } from './fields/TextFieldComponent';
import { SelectFieldComponent } from './fields/SelectFieldComponent';
import { 
  CheckboxFieldComponent, 
  RadioFieldComponent, 
  SwitchFieldComponent 
} from './fields/CheckboxRadioFieldComponent';
import { RatingFieldComponent, SliderFieldComponent } from './fields/RatingSliderFieldComponent';

export const FieldRenderer: React.FC<FieldComponentProps> = (props) => {
  const { field } = props;

  if (field.hidden) {
    return null;
  }

  switch (field.type) {
    case 'text':
    case 'email':
    case 'password':
    case 'tel':
    case 'url':
    case 'number':
      return <TextFieldComponent {...props} />;
    
    case 'textarea':
      return <TextFieldComponent {...props} multiline />;
    
    case 'select':
    case 'multiselect':
      return <SelectFieldComponent {...props} field={field as any} />;
    
    case 'radio':
      return <RadioFieldComponent {...props} />;
    
    case 'checkbox':
      return <CheckboxFieldComponent {...props} field={field as any} />;
    
    case 'switch':
      return <SwitchFieldComponent {...props} />;
    
    case 'rating':
      return <RatingFieldComponent {...props} field={field as any} />;
    
    case 'slider':
      return <SliderFieldComponent {...props} field={field as any} />;
    
    case 'date':
    case 'datetime':
    case 'time':
      return (
        <TextFieldComponent 
          {...props} 
          field={{ ...field, type: field.type === 'datetime' ? 'datetime-local' : field.type } as any}
        />
      );
    
    case 'file':
      // File input would be implemented here
      return <TextFieldComponent {...props} field={{ ...field, type: 'file' } as any} />;
    
    case 'autocomplete':
      // Autocomplete would be implemented here - for now fallback to select
      return <SelectFieldComponent {...props} field={field as any} />;
    
    default:
      return <TextFieldComponent {...props} />;
  }
};
