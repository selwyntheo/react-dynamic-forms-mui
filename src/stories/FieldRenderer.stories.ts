import type { Meta, StoryObj } from '@storybook/react';
import { FieldRenderer } from '../components/FieldRenderer';
import { FormField } from '../types';

// Sample field configurations for individual field demos
const textField: FormField = {
  id: 'sample-text',
  name: 'sampleText',
  type: 'text',
  label: 'Sample Text Field',
  placeholder: 'Enter some text...',
  required: true,
  validation: [
    { type: 'required', message: 'This field is required' },
    { type: 'minLength', value: 3, message: 'Minimum 3 characters' }
  ]
};

const selectField: FormField = {
  id: 'sample-select',
  name: 'sampleSelect',
  type: 'select',
  label: 'Sample Select Field',
  required: true,
  options: [
    { value: 'option1', label: 'Option 1' },
    { value: 'option2', label: 'Option 2' },
    { value: 'option3', label: 'Option 3' }
  ],
  validation: [
    { type: 'required', message: 'Please select an option' }
  ]
};

const checkboxField: FormField = {
  id: 'sample-checkbox',
  name: 'sampleCheckbox',
  type: 'checkbox',
  label: 'Sample Checkbox Field',
  options: [
    { value: 'check1', label: 'Checkbox 1' },
    { value: 'check2', label: 'Checkbox 2' },
    { value: 'check3', label: 'Checkbox 3' }
  ]
};

const radioField: FormField = {
  id: 'sample-radio',
  name: 'sampleRadio',
  type: 'radio',
  label: 'Sample Radio Field',
  required: true,
  options: [
    { value: 'radio1', label: 'Radio 1' },
    { value: 'radio2', label: 'Radio 2' },
    { value: 'radio3', label: 'Radio 3' }
  ],
  validation: [
    { type: 'required', message: 'Please select one option' }
  ]
};

const ratingField: FormField = {
  id: 'sample-rating',
  name: 'sampleRating',
  type: 'rating',
  label: 'Sample Rating Field',
  max: 5,
  precision: 0.5
};

const sliderField: FormField = {
  id: 'sample-slider',
  name: 'sampleSlider',
  type: 'slider',
  label: 'Sample Slider Field',
  min: 0,
  max: 100,
  step: 5,
  marks: true
};

const meta: Meta<typeof FieldRenderer> = {
  title: 'Library/FieldRenderer',
  component: FieldRenderer,
  parameters: {
    layout: 'padded',
    docs: {
      description: {
        component: 'Individual field renderer component that can render any field type supported by the dynamic form library.'
      }
    }
  },
  argTypes: {
    field: {
      description: 'Field configuration object',
      control: { type: 'object' }
    },
    value: {
      description: 'Current field value',
      control: { type: 'text' }
    },
    onChange: {
      description: 'Callback function called when field value changes',
      action: 'changed'
    },
    onBlur: {
      description: 'Callback function called when field loses focus',
      action: 'blurred'
    },
    error: {
      description: 'Error message to display',
      control: { type: 'text' }
    },
    disabled: {
      description: 'Whether the field is disabled',
      control: { type: 'boolean' }
    }
  }
};

export default meta;
type Story = StoryObj<typeof meta>;

export const TextField: Story = {
  args: {
    field: textField,
    value: '',
    disabled: false
  },
  parameters: {
    docs: {
      description: {
        story: 'A basic text input field with validation.'
      }
    }
  }
};

export const TextFieldWithValue: Story = {
  args: {
    field: textField,
    value: 'Sample text value',
    disabled: false
  },
  parameters: {
    docs: {
      description: {
        story: 'Text field with a pre-filled value.'
      }
    }
  }
};

export const TextFieldWithError: Story = {
  args: {
    field: textField,
    value: 'x',
    error: 'Minimum 3 characters',
    disabled: false
  },
  parameters: {
    docs: {
      description: {
        story: 'Text field showing validation error.'
      }
    }
  }
};

export const SelectField: Story = {
  args: {
    field: selectField,
    value: '',
    disabled: false
  },
  parameters: {
    docs: {
      description: {
        story: 'A dropdown select field.'
      }
    }
  }
};

export const SelectFieldWithValue: Story = {
  args: {
    field: selectField,
    value: 'option2',
    disabled: false
  },
  parameters: {
    docs: {
      description: {
        story: 'Select field with a pre-selected value.'
      }
    }
  }
};

export const CheckboxField: Story = {
  args: {
    field: checkboxField,
    value: ['check1', 'check3'],
    disabled: false
  },
  parameters: {
    docs: {
      description: {
        story: 'Multiple checkbox field with some options checked.'
      }
    }
  }
};

export const RadioField: Story = {
  args: {
    field: radioField,
    value: 'radio2',
    disabled: false
  },
  parameters: {
    docs: {
      description: {
        story: 'Radio button field with one option selected.'
      }
    }
  }
};

export const RatingField: Story = {
  args: {
    field: ratingField,
    value: 3.5,
    disabled: false
  },
  parameters: {
    docs: {
      description: {
        story: 'Rating field with half-star precision.'
      }
    }
  }
};

export const SliderField: Story = {
  args: {
    field: sliderField,
    value: 75,
    disabled: false
  },
  parameters: {
    docs: {
      description: {
        story: 'Slider field with marks and custom step value.'
      }
    }
  }
};

export const DisabledField: Story = {
  args: {
    field: textField,
    value: 'This field is disabled',
    disabled: true
  },
  parameters: {
    docs: {
      description: {
        story: 'Example of a disabled field.'
      }
    }
  }
};
