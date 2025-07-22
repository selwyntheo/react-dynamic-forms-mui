import React, { useState } from 'react';
import { 
  DynamicForm, 
  DataGridField, 
  DataGridColumn, 
  FormConfig 
} from '../src';

const ConfigurableDataGridExample: React.FC = () => {
  const [formData, setFormData] = useState({});
  const [formConfig, setFormConfig] = useState<FormConfig>({
    id: "configurable-datagrid-form",
    title: "Configurable DataGrid Example",
    description: "Demonstrates advanced DataGrid configuration with primary keys, data types, and field arrangement",
    sections: [
      {
        id: "main-section",
        title: "Database-Style DataGrid",
        fields: [
          {
            id: "users_table",
            name: "users_table",
            label: "Users Table",
            type: "datagrid",
            required: false,
            columns: [
              {
                field: 'id',
                headerName: 'User ID',
                type: 'number',
                dataType: 'int',
                editable: false,
                required: true,
                isPrimaryKey: true,
                isUnique: true,
                isIndexed: true,
                sortable: true,
                filterable: true,
                width: 100,
                order: 0
              },
              {
                field: 'username',
                headerName: 'Username',
                type: 'string',
                dataType: 'varchar',
                editable: true,
                required: true,
                isUnique: true,
                isIndexed: true,
                sortable: true,
                filterable: true,
                width: 150,
                order: 1,
                validation: {
                  minLength: 3,
                  maxLength: 20,
                  pattern: '^[a-zA-Z0-9_]+$'
                }
              },
              {
                field: 'email',
                headerName: 'Email Address',
                type: 'string',
                dataType: 'varchar',
                editable: true,
                required: true,
                isUnique: true,
                isIndexed: true,
                sortable: true,
                filterable: true,
                width: 250,
                order: 2,
                validation: {
                  pattern: '^[^\\s@]+@[^\\s@]+\\.[^\\s@]+$'
                }
              },
              {
                field: 'role',
                headerName: 'User Role',
                type: 'select',
                dataType: 'varchar',
                editable: true,
                required: true,
                isIndexed: true,
                sortable: true,
                filterable: true,
                width: 130,
                order: 3,
                options: [
                  { value: 'admin', label: 'Administrator' },
                  { value: 'editor', label: 'Editor' },
                  { value: 'viewer', label: 'Viewer' },
                  { value: 'guest', label: 'Guest' }
                ]
              },
              {
                field: 'salary',
                headerName: 'Annual Salary',
                type: 'number',
                dataType: 'decimal',
                editable: true,
                required: false,
                sortable: true,
                filterable: true,
                width: 140,
                order: 4,
                validation: {
                  min: 0,
                  max: 1000000
                }
              },
              {
                field: 'hire_date',
                headerName: 'Hire Date',
                type: 'date',
                dataType: 'date',
                editable: true,
                required: true,
                sortable: true,
                filterable: true,
                width: 150,
                order: 5
              },
              {
                field: 'is_active',
                headerName: 'Active',
                type: 'boolean',
                dataType: 'boolean',
                editable: true,
                required: false,
                sortable: true,
                filterable: true,
                width: 100,
                order: 6,
                defaultValue: true
              },
              {
                field: 'created_at',
                headerName: 'Created',
                type: 'date',
                dataType: 'datetime',
                editable: false,
                required: true,
                sortable: true,
                filterable: true,
                width: 180,
                order: 7,
                defaultValue: new Date().toISOString()
              }
            ],
            initialRows: [
              {
                id: 1,
                username: 'admin_user',
                email: 'admin@company.com',
                role: 'admin',
                salary: 95000,
                hire_date: '2022-01-15',
                is_active: true,
                created_at: '2022-01-15T09:00:00Z'
              },
              {
                id: 2,
                username: 'john_editor',
                email: 'john@company.com',
                role: 'editor',
                salary: 75000,
                hire_date: '2022-03-01',
                is_active: true,
                created_at: '2022-03-01T09:00:00Z'
              },
              {
                id: 3,
                username: 'jane_viewer',
                email: 'jane@company.com',
                role: 'viewer',
                salary: 55000,
                hire_date: '2022-06-15',
                is_active: false,
                created_at: '2022-06-15T09:00:00Z'
              }
            ],
            allowAdd: true,
            allowEdit: true,
            allowDelete: true,
            allowReorder: true,
            allowSort: true,
            allowFilter: true,
            maxRows: 100,
            dataSource: {
              type: 'api',
              apiConfig: {
                endpoint: '/api/users',
                method: 'GET',
                headers: {
                  'Authorization': 'Bearer {{token}}',
                  'Content-Type': 'application/json'
                },
                params: {
                  include: 'profile,permissions'
                },
                dataPath: 'data.users',
                totalPath: 'data.total',
                errorPath: 'error.message'
              },
              pagination: {
                enabled: true,
                pageSize: 25,
                serverSide: true
              },
              caching: {
                enabled: true,
                ttl: 300 // 5 minutes
              }
            },
            actions: {
              onCreate: {
                endpoint: '/api/users',
                method: 'POST',
                headers: {
                  'Authorization': 'Bearer {{token}}',
                  'Content-Type': 'application/json'
                }
              },
              onUpdate: {
                endpoint: '/api/users/{{id}}',
                method: 'PUT',
                headers: {
                  'Authorization': 'Bearer {{token}}',
                  'Content-Type': 'application/json'
                }
              },
              onDelete: {
                endpoint: '/api/users/{{id}}',
                method: 'DELETE',
                headers: {
                  'Authorization': 'Bearer {{token}}'
                }
              }
            }
          } as DataGridField,
          {
            id: "product_catalog",
            name: "product_catalog",
            label: "Product Catalog",
            type: "datagrid",
            required: false,
            columns: [
              {
                field: 'sku',
                headerName: 'SKU',
                type: 'string',
                dataType: 'varchar',
                editable: false,
                required: true,
                isPrimaryKey: true,
                isUnique: true,
                isIndexed: true,
                sortable: true,
                filterable: true,
                width: 120,
                order: 0
              },
              {
                field: 'name',
                headerName: 'Product Name',
                type: 'string',
                dataType: 'varchar',
                editable: true,
                required: true,
                sortable: true,
                filterable: true,
                width: 200,
                order: 1,
                validation: {
                  minLength: 2,
                  maxLength: 100
                }
              },
              {
                field: 'category',
                headerName: 'Category',
                type: 'select',
                dataType: 'varchar',
                editable: true,
                required: true,
                isIndexed: true,
                sortable: true,
                filterable: true,
                width: 150,
                order: 2,
                apiConfig: {
                  endpoint: '/api/product-categories',
                  method: 'GET',
                  valueField: 'id',
                  labelField: 'name',
                  headers: {
                    'Authorization': 'Bearer {{token}}'
                  }
                }
              },
              {
                field: 'price',
                headerName: 'Price ($)',
                type: 'number',
                dataType: 'decimal',
                editable: true,
                required: true,
                sortable: true,
                filterable: true,
                width: 120,
                order: 3,
                validation: {
                  min: 0.01,
                  max: 999999.99
                }
              },
              {
                field: 'in_stock',
                headerName: 'In Stock',
                type: 'boolean',
                dataType: 'boolean',
                editable: true,
                required: false,
                sortable: true,
                filterable: true,
                width: 100,
                order: 4,
                defaultValue: true
              },
              {
                field: 'launch_date',
                headerName: 'Launch Date',
                type: 'date',
                dataType: 'date',
                editable: true,
                required: false,
                sortable: true,
                filterable: true,
                width: 150,
                order: 5
              }
            ],
            initialRows: [
              {
                sku: 'LAPTOP-001',
                name: 'Professional Laptop',
                category: 'Electronics',
                price: 1299.99,
                in_stock: true,
                launch_date: '2024-01-15'
              },
              {
                sku: 'MOUSE-001',
                name: 'Wireless Mouse',
                category: 'Accessories',
                price: 29.99,
                in_stock: true,
                launch_date: '2023-12-01'
              }
            ],
            allowAdd: true,
            allowEdit: true,
            allowDelete: true,
            maxRows: 1000
          } as DataGridField
        ]
      }
    ]
  });

  const handleFieldChange = (data: any, fieldName: string) => {
    setFormData(prev => ({
      ...prev,
      [fieldName]: data[fieldName]
    }));
  };

  const handleDataGridFieldChange = (fieldId: string, updatedField: DataGridField) => {
    setFormConfig(prev => ({
      ...prev,
      sections: prev.sections.map(section => ({
        ...section,
        fields: section.fields.map(field => 
          field.id === fieldId ? updatedField : field
        )
      }))
    }));
  };

  const handleSubmit = (data: any) => {
    console.log('Form submitted with data:', data);
    console.log('Current form configuration:', formConfig);
    alert('Form submitted! Check console for details.');
  };

  return (
    <div style={{ padding: '24px', maxWidth: '1200px', margin: '0 auto' }}>
      <div style={{ marginBottom: '24px' }}>
        <h1>Configurable DataGrid Example</h1>
        <p>
          This example demonstrates advanced DataGrid configuration features including:
        </p>
        <ul>
          <li><strong>Primary Keys:</strong> Unique identifiers for database-style operations</li>
          <li><strong>Data Types:</strong> Specify database column types (varchar, int, decimal, etc.)</li>
          <li><strong>Field Properties:</strong> Configure unique, indexed, required constraints</li>
          <li><strong>Validation Rules:</strong> Pattern matching, min/max values, length constraints</li>
          <li><strong>API Integration:</strong> Dynamic data loading and CRUD operations</li>
          <li><strong>Field Arrangement:</strong> Configurable column ordering and display</li>
        </ul>
      </div>

      <DynamicForm
        config={formConfig}
        initialData={formData}
        onChange={handleFieldChange}
        onSubmit={handleSubmit}
      />

      <div style={{ marginTop: '32px', padding: '16px', backgroundColor: '#f5f5f5', borderRadius: '8px' }}>
        <h3>Configuration Notes:</h3>
        <ul>
          <li><strong>Users Table:</strong> Demonstrates a complete user management system with authentication-ready fields</li>
          <li><strong>Product Catalog:</strong> Shows e-commerce product management with dynamic category loading</li>
          <li><strong>API Integration:</strong> Both tables are configured for backend API connections</li>
          <li><strong>Data Types:</strong> Various database column types are specified for proper schema generation</li>
          <li><strong>Constraints:</strong> Primary keys, unique fields, and indexed columns are properly marked</li>
        </ul>
      </div>
    </div>
  );
};

export default ConfigurableDataGridExample;
