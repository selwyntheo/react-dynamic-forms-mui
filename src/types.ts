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
  | 'autocomplete'
  | 'datagrid';

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

export interface DataGridColumn {
  field: string;
  headerName: string;
  displayName?: string;
  type?: 'string' | 'number' | 'date' | 'boolean' | 'select';
  dataType?: 'varchar' | 'int' | 'decimal' | 'float' | 'datetime' | 'date' | 'boolean' | 'text' | 'uuid' | 'json';
  width?: number;
  minWidth?: number;
  maxWidth?: number;
  editable?: boolean;
  required?: boolean;
  isPrimaryKey?: boolean;
  isUnique?: boolean;
  isIndexed?: boolean;
  sortable?: boolean;
  filterable?: boolean;
  order?: number;
  defaultValue?: any;
  gridDisplayOption?: 'visible' | 'hidden' | 'readonly' | 'editable';
  format?: {
    type: 'none' | 'financial' | 'date' | 'percentage' | 'custom';
    pattern?: string; // For custom formatting
    currency?: string; // For financial formatting
    dateFormat?: string; // For date formatting
    decimals?: number; // For numeric formatting
  };
  canCreate?: boolean;
  canUpdate?: boolean;
  formatLookup?: {
    enabled: boolean;
    endpoint?: string;
    method?: 'GET' | 'POST';
    valueField?: string;
    displayField?: string;
    params?: Record<string, any>;
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
      params?: Record<string, any>;
      headers?: Record<string, string>;
      searchParam?: string; // Parameter name for search queries
    };
    functionConfig?: {
      name: string; // Function name to call
      params?: Record<string, any>;
    };
  };
  validation?: {
    min?: number;
    max?: number;
    minLength?: number;
    maxLength?: number;
    pattern?: string;
    custom?: (value: any) => string | null;
  };
  options?: SelectOption[]; // For select type columns
  apiConfig?: {
    endpoint?: string;
    valueField?: string;
    labelField?: string;
    params?: Record<string, any>;
    headers?: Record<string, string>;
    method?: 'GET' | 'POST';
  };
}

export interface DataGridField extends FormFieldBase {
  type: 'datagrid';
  columns: DataGridColumn[];
  minRows?: number;
  maxRows?: number;
  allowAdd?: boolean;
  allowDelete?: boolean;
  allowEdit?: boolean;
  allowReorder?: boolean;
  allowSort?: boolean;
  allowFilter?: boolean;
  initialRows?: any[];
  eventButtons?: {
    insert?: {
      enabled: boolean;
      label?: string;
      position?: 'top' | 'bottom' | 'both';
      icon?: string;
      style?: Record<string, any>;
      permissions?: string[];
    };
    update?: {
      enabled: boolean;
      label?: string;
      position?: 'row' | 'toolbar' | 'both';
      icon?: string;
      style?: Record<string, any>;
      permissions?: string[];
      mode?: 'inline' | 'dialog' | 'page';
    };
    delete?: {
      enabled: boolean;
      label?: string;
      position?: 'row' | 'toolbar' | 'both';
      icon?: string;
      style?: Record<string, any>;
      permissions?: string[];
      confirmDialog?: boolean;
      confirmMessage?: string;
    };
  };
  dataSource?: {
    type: 'static' | 'api';
    apiConfig?: {
      endpoint: string;
      method?: 'GET' | 'POST';
      headers?: Record<string, string>;
      params?: Record<string, any>;
      dataPath?: string; // JSONPath to extract data from response
      totalPath?: string; // JSONPath to extract total count
      errorPath?: string; // JSONPath to extract error message
    };
    pagination?: {
      enabled: boolean;
      pageSize: number;
      serverSide?: boolean;
    };
    caching?: {
      enabled: boolean;
      ttl?: number; // Time to live in seconds
    };
  };
  actions?: {
    onCreate?: {
      endpoint: string;
      method?: 'POST' | 'PUT';
      headers?: Record<string, string>;
    };
    onUpdate?: {
      endpoint: string;
      method?: 'PUT' | 'PATCH';
      headers?: Record<string, string>;
    };
    onDelete?: {
      endpoint: string;
      method?: 'DELETE';
      headers?: Record<string, string>;
    };
  };
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
  | AutocompleteField
  | DataGridField;

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
