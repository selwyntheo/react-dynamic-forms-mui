import type { Meta, StoryObj } from '@storybook/react';
import { DataGridFieldComponent } from '../components/fields/DataGridFieldComponent';
import { DataGridField } from '../types';

// Sample DataGrid field configurations
const basicDataGridField: DataGridField = {
  id: 'sample-datagrid',
  name: 'sampleDataGrid',
  type: 'datagrid',
  label: 'Sample DataGrid',
  columns: [
    { field: 'id', headerName: 'ID', width: 70, type: 'number' },
    { field: 'name', headerName: 'Name', width: 200, type: 'string', editable: true },
    { field: 'email', headerName: 'Email', width: 250, type: 'string', editable: true },
    { field: 'age', headerName: 'Age', width: 100, type: 'number', editable: true }
  ],
  initialRows: [
    { id: 1, name: 'John Doe', email: 'john@example.com', age: 30 },
    { id: 2, name: 'Jane Smith', email: 'jane@example.com', age: 25 },
    { id: 3, name: 'Bob Johnson', email: 'bob@example.com', age: 35 }
  ],
  allowAdd: true,
  allowDelete: true,
  allowEdit: true
};

const taskManagementField: DataGridField = {
  id: 'task-grid',
  name: 'taskGrid',
  type: 'datagrid',
  label: 'Task Management',
  columns: [
    { field: 'id', headerName: 'ID', width: 70, type: 'number' },
    { field: 'task', headerName: 'Task', width: 250, type: 'string', editable: true, required: true },
    { 
      field: 'priority', 
      headerName: 'Priority', 
      width: 130, 
      type: 'select',
      editable: true,
      options: [
        { value: 'Low', label: 'Low' },
        { value: 'Medium', label: 'Medium' },
        { value: 'High', label: 'High' }
      ]
    },
    { 
      field: 'status', 
      headerName: 'Status', 
      width: 150, 
      type: 'select',
      editable: true,
      options: [
        { value: 'Not Started', label: 'Not Started' },
        { value: 'In Progress', label: 'In Progress' },
        { value: 'Completed', label: 'Completed' }
      ]
    },
    { field: 'dueDate', headerName: 'Due Date', width: 150, type: 'date', editable: true }
  ],
  initialRows: [
    { 
      id: 1, 
      task: 'Complete project documentation', 
      priority: 'High', 
      status: 'In Progress',
      dueDate: '2025-07-30'
    },
    { 
      id: 2, 
      task: 'Review code changes', 
      priority: 'Medium', 
      status: 'Not Started',
      dueDate: '2025-07-25'
    },
    { 
      id: 3, 
      task: 'Deploy to production', 
      priority: 'Low', 
      status: 'Not Started',
      dueDate: '2025-08-01'
    }
  ],
  allowAdd: true,
  allowDelete: true,
  allowEdit: true,
  allowSort: true,
  allowFilter: true
};

const readOnlyDataGridField: DataGridField = {
  id: 'readonly-datagrid',
  name: 'readonlyDataGrid',
  type: 'datagrid',
  label: 'Read-Only DataGrid',
  columns: [
    { field: 'id', headerName: 'ID', width: 70, type: 'number' },
    { field: 'product', headerName: 'Product', width: 200, type: 'string' },
    { field: 'price', headerName: 'Price', width: 120, type: 'number' },
    { field: 'category', headerName: 'Category', width: 150, type: 'string' }
  ],
  initialRows: [
    { id: 1, product: 'Laptop', price: 999.99, category: 'Electronics' },
    { id: 2, product: 'Desk Chair', price: 199.99, category: 'Furniture' },
    { id: 3, product: 'Coffee Mug', price: 9.99, category: 'Kitchen' }
  ],
  allowAdd: false,
  allowDelete: false,
  allowEdit: false,
  allowSort: true
};

const meta: Meta<typeof DataGridFieldComponent> = {
  title: 'Library/DataGridField',
  component: DataGridFieldComponent,
  parameters: {
    layout: 'padded',
    docs: {
      description: {
        component: 'A DataGrid field component for managing tabular data with inline editing, adding, and deleting capabilities.'
      }
    }
  },
  argTypes: {
    field: {
      description: 'DataGrid field configuration',
      control: { type: 'object' }
    },
    value: {
      description: 'Current grid data (array of objects)',
      control: { type: 'object' }
    },
    onChange: {
      description: 'Callback function called when grid data changes',
      action: 'changed'
    },
    error: {
      description: 'Error message to display',
      control: { type: 'text' }
    },
    disabled: {
      description: 'Whether the grid is disabled',
      control: { type: 'boolean' }
    },
    allowConfiguration: {
      description: 'Whether to show configuration options',
      control: { type: 'boolean' }
    }
  }
};

export default meta;
type Story = StoryObj<typeof meta>;

export const BasicDataGrid: Story = {
  args: {
    field: basicDataGridField,
    value: [
      { id: 1, name: 'John Doe', email: 'john@example.com', age: 30 },
      { id: 2, name: 'Jane Smith', email: 'jane@example.com', age: 25 },
      { id: 3, name: 'Bob Johnson', email: 'bob@example.com', age: 35 }
    ],
    disabled: false,
    allowConfiguration: false
  },
  parameters: {
    docs: {
      description: {
        story: 'A basic DataGrid with editable fields and row management capabilities.'
      }
    }
  }
};

export const TaskManagement: Story = {
  args: {
    field: taskManagementField,
    value: [
      { 
        id: 1, 
        task: 'Complete project documentation', 
        priority: 'High', 
        status: 'In Progress',
        dueDate: '2025-07-30'
      },
      { 
        id: 2, 
        task: 'Review code changes', 
        priority: 'Medium', 
        status: 'Not Started',
        dueDate: '2025-07-25'
      },
      { 
        id: 3, 
        task: 'Deploy to production', 
        priority: 'Low', 
        status: 'Not Started',
        dueDate: '2025-08-01'
      }
    ],
    disabled: false,
    allowConfiguration: true
  },
  parameters: {
    docs: {
      description: {
        story: 'A task management DataGrid with select fields for priority and status, plus configuration options.'
      }
    }
  }
};

export const ReadOnlyDataGrid: Story = {
  args: {
    field: readOnlyDataGridField,
    value: [
      { id: 1, product: 'Laptop', price: 999.99, category: 'Electronics' },
      { id: 2, product: 'Desk Chair', price: 199.99, category: 'Furniture' },
      { id: 3, product: 'Coffee Mug', price: 9.99, category: 'Kitchen' }
    ],
    disabled: false,
    allowConfiguration: false
  },
  parameters: {
    docs: {
      description: {
        story: 'A read-only DataGrid for displaying data without editing capabilities.'
      }
    }
  }
};

export const EmptyDataGrid: Story = {
  args: {
    field: basicDataGridField,
    value: [],
    disabled: false,
    allowConfiguration: false
  },
  parameters: {
    docs: {
      description: {
        story: 'An empty DataGrid ready for new data entry.'
      }
    }
  }
};

export const DisabledDataGrid: Story = {
  args: {
    field: basicDataGridField,
    value: [
      { id: 1, name: 'John Doe', email: 'john@example.com', age: 30 },
      { id: 2, name: 'Jane Smith', email: 'jane@example.com', age: 25 }
    ],
    disabled: true,
    allowConfiguration: false
  },
  parameters: {
    docs: {
      description: {
        story: 'A disabled DataGrid that cannot be interacted with.'
      }
    }
  }
};

export const WithError: Story = {
  args: {
    field: basicDataGridField,
    value: [],
    error: 'At least one row is required',
    disabled: false,
    allowConfiguration: false
  },
  parameters: {
    docs: {
      description: {
        story: 'A DataGrid displaying a validation error message.'
      }
    }
  }
};
