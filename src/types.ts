export interface FormFieldBase {
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
  size?: 'small' | 'medium';
  fullWidth?: boolean;
  variant?: 'outlined' | 'filled' | 'standard';
}

export type FieldType = 
  | 'text'
  | 'email'
  | 'password'
  | 'number'
  | 'tel'
  | 'url'
  | 'textarea'
  | 'select'
  | 'multiselect'
  | 'radio'
  | 'checkbox'
  | 'switch'
  | 'date'
  | 'datetime'
  | 'time'
  | 'file'
  | 'rating'
  | 'slider'
  | 'autocomplete';

export interface SelectOption {
  value: string | number;
  label: string;
  disabled?: boolean;
}

export interface SelectField extends FormFieldBase {
  type: 'select' | 'multiselect' | 'radio';
  options: SelectOption[];
}

export interface CheckboxField extends FormFieldBase {
  type: 'checkbox';
  options?: SelectOption[];
}

export interface NumberField extends FormFieldBase {
  type: 'number';
  min?: number;
  max?: number;
  step?: number;
}

export interface TextareaField extends FormFieldBase {
  type: 'textarea';
  rows?: number;
  maxRows?: number;
}

export interface DateField extends FormFieldBase {
  type: 'date' | 'datetime' | 'time';
  minDate?: string;
  maxDate?: string;
}

export interface FileField extends FormFieldBase {
  type: 'file';
  accept?: string;
  multiple?: boolean;
  maxSize?: number; // in bytes
}

export interface RatingField extends FormFieldBase {
  type: 'rating';
  max?: number;
  precision?: number;
}

export interface SliderField extends FormFieldBase {
  type: 'slider';
  min?: number;
  max?: number;
  step?: number;
  marks?: boolean | Array<{ value: number; label?: string }>;
}

export interface AutocompleteField extends FormFieldBase {
  type: 'autocomplete';
  options: SelectOption[];
  freeSolo?: boolean;
  multiple?: boolean;
}

export type FormField = 
  | FormFieldBase
  | SelectField
  | CheckboxField
  | NumberField
  | TextareaField
  | DateField
  | FileField
  | RatingField
  | SliderField
  | AutocompleteField;

export interface ValidationRule {
  type: 'required' | 'minLength' | 'maxLength' | 'pattern' | 'custom';
  value?: any;
  message: string;
  validator?: (value: any) => boolean;
}

export interface FormSection {
  id: string;
  title?: string;
  description?: string;
  fields: FormField[];
  columns?: number;
  collapsed?: boolean;
}

export interface FormConfig {
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

export interface FormData {
  [fieldName: string]: any;
}

export interface FormErrors {
  [fieldName: string]: string;
}

export interface FormValidationResult {
  isValid: boolean;
  errors: FormErrors;
}

export interface DynamicFormProps {
  config: FormConfig;
  initialData?: FormData;
  onSubmit: (data: FormData, isValid: boolean) => void;
  onChange?: (data: FormData, fieldName: string) => void;
  onValidate?: (result: FormValidationResult) => void;
  loading?: boolean;
  readOnly?: boolean;
  className?: string;
  sx?: any; // MUI sx prop
}

export interface FieldComponentProps {
  field: FormField;
  value: any;
  error?: string;
  onChange: (value: any) => void;
  onBlur?: () => void;
  disabled?: boolean;
  readOnly?: boolean;
}
