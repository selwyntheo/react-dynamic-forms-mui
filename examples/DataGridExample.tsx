import React, { useState } from 'react';
import { Box, Typography, Paper, Divider } from '@mui/material';
import { DynamicForm, FormConfig, DataGridField } from '../src/index';

const DataGridExample: React.FC = () => {
  const [formData, setFormData] = useState<any>({});

  const formConfig: FormConfig = {
    id: 'datagrid-demo',
    title: 'DataGrid Field Demo',
    description: 'Demonstration of dynamic grid functionality for tabular data management',
    sections: [
      {
        id: 'basic-info',
        title: 'Basic Information',
        fields: [
          {
            id: 'projectName',
            name: 'projectName',
            label: 'Project Name',
            type: 'text',
            required: true,
            placeholder: 'Enter project name...',
          },
          {
            id: 'description',
            name: 'description',
            label: 'Description',
            type: 'textarea',
            placeholder: 'Enter project description...',
          }
        ]
      },
      {
        id: 'team-members',
        title: 'Team Members',
        description: 'Add and manage team members with their details',
        fields: [
          {
            id: 'teamMembers',
            name: 'teamMembers',
            label: 'Team Members',
            type: 'datagrid',
            helperText: 'Click "Add Row" to add team members. Double-click cells to edit.',
            allowAdd: true,
            allowDelete: true,
            allowEdit: true,
            minRows: 1,
            maxRows: 10,
            columns: [
              {
                field: 'name',
                headerName: 'Full Name',
                type: 'string',
                width: 200,
                editable: true,
                required: true,
              },
              {
                field: 'email',
                headerName: 'Email',
                type: 'string',
                width: 250,
                editable: true,
                required: true,
              },
              {
                field: 'role',
                headerName: 'Role',
                type: 'select',
                width: 150,
                editable: true,
                required: true,
                options: [
                  { value: 'developer', label: 'Developer' },
                  { value: 'designer', label: 'Designer' },
                  { value: 'manager', label: 'Project Manager' },
                  { value: 'tester', label: 'QA Tester' },
                  { value: 'analyst', label: 'Business Analyst' },
                ],
              },
              {
                field: 'startDate',
                headerName: 'Start Date',
                type: 'date',
                width: 150,
                editable: true,
              },
              {
                field: 'salary',
                headerName: 'Salary',
                type: 'number',
                width: 120,
                editable: true,
              },
              {
                field: 'isActive',
                headerName: 'Active',
                type: 'boolean',
                width: 100,
                editable: true,
              },
            ],
            initialRows: [
              {
                name: 'John Doe',
                email: 'john.doe@example.com',
                role: 'developer',
                startDate: '2024-01-15',
                salary: 75000,
                isActive: true,
              },
              {
                name: 'Jane Smith',
                email: 'jane.smith@example.com',
                role: 'designer',
                startDate: '2024-02-01',
                salary: 65000,
                isActive: true,
              },
            ],
          }
        ]
      },
      {
        id: 'project-tasks',
        title: 'Project Tasks',
        description: 'Manage project tasks and their status',
        fields: [
          {
            id: 'tasks',
            name: 'tasks',
            label: 'Tasks',
            type: 'datagrid',
            helperText: 'Track project tasks and their progress',
            allowAdd: true,
            allowDelete: true,
            allowEdit: true,
            maxRows: 20,
            columns: [
              {
                field: 'taskName',
                headerName: 'Task Name',
                type: 'string',
                width: 250,
                editable: true,
                required: true,
              },
              {
                field: 'assignee',
                headerName: 'Assignee',
                type: 'string',
                width: 150,
                editable: true,
              },
              {
                field: 'priority',
                headerName: 'Priority',
                type: 'select',
                width: 120,
                editable: true,
                options: [
                  { value: 'low', label: 'Low' },
                  { value: 'medium', label: 'Medium' },
                  { value: 'high', label: 'High' },
                  { value: 'critical', label: 'Critical' },
                ],
              },
              {
                field: 'status',
                headerName: 'Status',
                type: 'select',
                width: 150,
                editable: true,
                options: [
                  { value: 'todo', label: 'To Do' },
                  { value: 'inprogress', label: 'In Progress' },
                  { value: 'review', label: 'In Review' },
                  { value: 'done', label: 'Done' },
                ],
              },
              {
                field: 'dueDate',
                headerName: 'Due Date',
                type: 'date',
                width: 150,
                editable: true,
              },
              {
                field: 'estimatedHours',
                headerName: 'Est. Hours',
                type: 'number',
                width: 120,
                editable: true,
              },
            ],
            initialRows: [
              {
                taskName: 'Set up project repository',
                assignee: 'John Doe',
                priority: 'high',
                status: 'done',
                dueDate: '2024-01-20',
                estimatedHours: 4,
              },
              {
                taskName: 'Design user interface mockups',
                assignee: 'Jane Smith',
                priority: 'medium',
                status: 'inprogress',
                dueDate: '2024-02-15',
                estimatedHours: 16,
              },
            ],
          }
        ]
      },
      {
        id: 'project-budget',
        title: 'Budget Breakdown',
        fields: [
          {
            id: 'budgetItems',
            name: 'budgetItems',
            label: 'Budget Items',
            type: 'datagrid',
            helperText: 'Track project expenses and budget allocation',
            allowAdd: true,
            allowDelete: true,
            allowEdit: true,
            columns: [
              {
                field: 'category',
                headerName: 'Category',
                type: 'select',
                width: 150,
                editable: true,
                required: true,
                options: [
                  { value: 'development', label: 'Development' },
                  { value: 'design', label: 'Design' },
                  { value: 'testing', label: 'Testing' },
                  { value: 'infrastructure', label: 'Infrastructure' },
                  { value: 'marketing', label: 'Marketing' },
                  { value: 'misc', label: 'Miscellaneous' },
                ],
              },
              {
                field: 'description',
                headerName: 'Description',
                type: 'string',
                width: 250,
                editable: true,
                required: true,
              },
              {
                field: 'budgetedAmount',
                headerName: 'Budgeted ($)',
                type: 'number',
                width: 130,
                editable: true,
                required: true,
              },
              {
                field: 'actualAmount',
                headerName: 'Actual ($)',
                type: 'number',
                width: 130,
                editable: true,
              },
              {
                field: 'isApproved',
                headerName: 'Approved',
                type: 'boolean',
                width: 100,
                editable: true,
              },
            ],
            initialRows: [
              {
                category: 'development',
                description: 'Frontend development costs',
                budgetedAmount: 50000,
                actualAmount: 45000,
                isApproved: true,
              },
              {
                category: 'design',
                description: 'UI/UX design and prototyping',
                budgetedAmount: 20000,
                actualAmount: 18500,
                isApproved: true,
              },
            ],
          }
        ]
      }
    ],
    submitText: 'Save Project Data',
    showReset: true,
  };

  const handleSubmit = (data: any, isValid: boolean) => {
    console.log('Form submitted:', data);
    console.log('Is valid:', isValid);
    if (isValid) {
      setFormData(data);
    }
  };

  const handleChange = (data: any, fieldName: string) => {
    console.log(`Field ${fieldName} changed:`, data[fieldName]);
  };

  return (
    <Box sx={{ maxWidth: 1200, mx: 'auto', p: 3 }}>
      <Typography variant="h3" gutterBottom>
        DataGrid Field Example
      </Typography>
      
      <Typography variant="body1" paragraph>
        This example demonstrates the powerful DataGrid field type that allows users to:
      </Typography>
      
      <Box component="ul" sx={{ mb: 3 }}>
        <li>Add, edit, and delete rows dynamically</li>
        <li>Support multiple column types (text, number, date, select, boolean)</li>
        <li>Inline editing with different input types</li>
        <li>Required field validation</li>
        <li>Configurable row limits and permissions</li>
        <li>Rich data management for complex forms</li>
      </Box>

      <Paper elevation={2} sx={{ p: 3, mb: 3 }}>
        <DynamicForm
          config={formConfig}
          onSubmit={handleSubmit}
          onChange={handleChange}
          initialData={{
            teamMembers: (formConfig.sections[1].fields[0] as DataGridField).initialRows,
            tasks: (formConfig.sections[2].fields[0] as DataGridField).initialRows,
            budgetItems: (formConfig.sections[3].fields[0] as DataGridField).initialRows,
          }}
        />
      </Paper>

      {Object.keys(formData).length > 0 && (
        <>
          <Divider sx={{ my: 3 }} />
          <Typography variant="h5" gutterBottom>
            Form Data Output
          </Typography>
          <Paper elevation={1} sx={{ p: 2, backgroundColor: 'grey.50' }}>
            <pre style={{ margin: 0, fontSize: '0.875rem' }}>
              {JSON.stringify(formData, null, 2)}
            </pre>
          </Paper>
        </>
      )}
    </Box>
  );
};

export default DataGridExample;
