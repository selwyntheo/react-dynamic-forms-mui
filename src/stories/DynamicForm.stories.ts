import type { Meta, StoryObj } from '@storybook/react';
import { DynamicForm } from '../components/DynamicForm';
import { FormConfig } from '../types';

// Sample form configurations for different demos
const basicFormConfig: FormConfig = {
  id: 'basic-form',
  title: 'Basic Form',
  description: 'A simple form with basic field types',
  submitText: 'Submit Basic Form',
  sections: [
    {
      id: 'personal-info',
      title: 'Personal Information',
      fields: [
        {
          id: 'firstName',
          name: 'firstName',
          type: 'text',
          label: 'First Name',
          required: true,
          validation: [
            { type: 'required', message: 'First name is required' },
            { type: 'minLength', value: 2, message: 'Minimum 2 characters' }
          ]
        },
        {
          id: 'lastName',
          name: 'lastName',
          type: 'text',
          label: 'Last Name',
          required: true,
          validation: [
            { type: 'required', message: 'Last name is required' },
            { type: 'minLength', value: 2, message: 'Minimum 2 characters' }
          ]
        },
        {
          id: 'email',
          name: 'email',
          type: 'email',
          label: 'Email Address',
          required: true,
          validation: [
            { type: 'required', message: 'Email is required' },
            { type: 'pattern', value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/, message: 'Please enter a valid email' }
          ]
        },
        {
          id: 'age',
          name: 'age',
          type: 'number',
          label: 'Age',
          required: false,
          validation: [
            { type: 'custom', message: 'Must be at least 18', validator: (value) => !value || value >= 18 },
            { type: 'custom', message: 'Must be less than 120', validator: (value) => !value || value <= 120 }
          ]
        }
      ]
    }
  ]
};

const advancedFormConfig: FormConfig = {
  id: 'advanced-form',
  title: 'Advanced Form',
  description: 'Showcasing all available field types',
  submitText: 'Submit Advanced Form',
  sections: [
    {
      id: 'user-details',
      title: 'User Details',
      fields: [
        {
          id: 'username',
          name: 'username',
          type: 'text',
          label: 'Username',
          required: true,
          validation: [
            { type: 'required', message: 'Username is required' },
            { type: 'minLength', value: 3, message: 'Minimum 3 characters' },
            { type: 'maxLength', value: 20, message: 'Maximum 20 characters' }
          ]
        },
        {
          id: 'role',
          name: 'role',
          type: 'select',
          label: 'Role',
          required: true,
          options: [
            { value: 'user', label: 'User' },
            { value: 'admin', label: 'Administrator' },
            { value: 'moderator', label: 'Moderator' }
          ],
          validation: [
            { type: 'required', message: 'Please select a role' }
          ]
        },
        {
          id: 'preferences',
          name: 'preferences',
          type: 'checkbox',
          label: 'Preferences',
          options: [
            { value: 'newsletter', label: 'Subscribe to newsletter' },
            { value: 'notifications', label: 'Enable notifications' },
            { value: 'marketing', label: 'Marketing emails' }
          ]
        },
        {
          id: 'experience',
          name: 'experience',
          type: 'radio',
          label: 'Experience Level',
          required: true,
          options: [
            { value: 'beginner', label: 'Beginner' },
            { value: 'intermediate', label: 'Intermediate' },
            { value: 'advanced', label: 'Advanced' }
          ],
          validation: [
            { type: 'required', message: 'Please select experience level' }
          ]
        },
        {
          id: 'rating',
          name: 'rating',
          type: 'rating',
          label: 'Rate your experience',
          max: 5,
          precision: 1
        },
        {
          id: 'satisfaction',
          name: 'satisfaction',
          type: 'slider',
          label: 'Satisfaction Level',
          min: 0,
          max: 100,
          step: 10,
          marks: true
        }
      ]
    }
  ]
};

const dataGridFormConfig: FormConfig = {
  id: 'datagrid-form',
  title: 'DataGrid Form',
  description: 'Form with DataGrid component',
  submitText: 'Submit with DataGrid',
  sections: [
    {
      id: 'basic-info',
      title: 'Basic Information',
      fields: [
        {
          id: 'name',
          name: 'name',
          type: 'text',
          label: 'Name',
          required: true,
          validation: [
            { type: 'required', message: 'Name is required' },
            { type: 'minLength', value: 2, message: 'Minimum 2 characters' }
          ]
        },
        {
          id: 'tasks',
          name: 'tasks',
          type: 'datagrid',
          label: 'Tasks',
          columns: [
            { field: 'id', headerName: 'ID', width: 70 },
            { field: 'task', headerName: 'Task', width: 200 },
            { field: 'priority', headerName: 'Priority', width: 130 },
            { field: 'status', headerName: 'Status', width: 130 }
          ],
          initialRows: [
            { id: 1, task: 'Complete project', priority: 'High', status: 'In Progress' },
            { id: 2, task: 'Review code', priority: 'Medium', status: 'Pending' },
            { id: 3, task: 'Write documentation', priority: 'Low', status: 'Not Started' }
          ],
          allowAdd: true,
          allowDelete: true,
          allowEdit: true
        }
      ]
    }
  ]
};

const meta: Meta<typeof DynamicForm> = {
  title: 'Library/DynamicForm',
  component: DynamicForm,
  parameters: {
    layout: 'padded',
    docs: {
      description: {
        component: 'A dynamic form component that renders various field types based on configuration. Supports text, email, number, select, checkbox, radio, rating, slider, and DataGrid fields with validation.'
      }
    }
  },
  argTypes: {
    config: {
      description: 'Form configuration object',
      control: { type: 'object' }
    },
    onSubmit: {
      description: 'Callback function called when form is submitted',
      action: 'submitted'
    },
    onChange: {
      description: 'Callback function called when form values change',
      action: 'changed'
    },
    loading: {
      description: 'Whether the form is in loading state',
      control: { type: 'boolean' }
    },
    readOnly: {
      description: 'Whether the form is read-only',
      control: { type: 'boolean' }
    }
  }
};

export default meta;
type Story = StoryObj<typeof meta>;

export const BasicForm: Story = {
  args: {
    config: basicFormConfig
  },
  parameters: {
    docs: {
      description: {
        story: 'A basic form with text, email, and number fields including validation.'
      }
    }
  }
};

export const AdvancedForm: Story = {
  args: {
    config: advancedFormConfig
  },
  parameters: {
    docs: {
      description: {
        story: 'An advanced form showcasing all field types: text, select, checkbox, radio, rating, and slider.'
      }
    }
  }
};

export const DataGridForm: Story = {
  args: {
    config: dataGridFormConfig,
    initialData: {
      name: 'John Doe',
      tasks: [
        { id: 1, task: 'Complete project', priority: 'High', status: 'In Progress' },
        { id: 2, task: 'Review code', priority: 'Medium', status: 'Pending' },
        { id: 3, task: 'Write documentation', priority: 'Low', status: 'Not Started' }
      ]
    }
  },
  parameters: {
    docs: {
      description: {
        story: 'A form that includes a DataGrid field for tabular data input and management.'
      }
    }
  }
};

export const ReadOnlyForm: Story = {
  args: {
    config: basicFormConfig,
    readOnly: true,
    initialData: {
      firstName: 'John',
      lastName: 'Doe',
      email: 'john.doe@example.com',
      age: 30
    }
  },
  parameters: {
    docs: {
      description: {
        story: 'A read-only form with pre-filled data.'
      }
    }
  }
};

export const LoadingForm: Story = {
  args: {
    config: basicFormConfig,
    loading: true
  },
  parameters: {
    docs: {
      description: {
        story: 'A form in loading state.'
      }
    }
  }
};
