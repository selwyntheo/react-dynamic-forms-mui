import React, { useState } from 'react';
import {
  Box,
  Paper,
  Typography,
  Button,
  Grid,
  Card,
  CardContent,
  CardActions,
  Chip
} from '@mui/material';
import {
  Settings as SettingsIcon,
  Storage as StorageIcon,
  PlayArrow as PlayIcon,
  Visibility as VisibilityIcon
} from '@mui/icons-material';
import { DataGridFieldConfig } from '../src/components/DataGridFieldConfig';

// Sample configuration structures
const sampleConfigurations = {
  userManagement: {
    dataSource: {
      type: 'api' as const,
      endpoint: 'https://api.example.com/users',
      method: 'GET' as const
    },
    eventButtons: {
      insert: {
        enabled: true,
        label: 'Add User',
        position: 'top' as const
      },
      update: {
        enabled: true,
        label: 'Edit User',
        position: 'row' as const,
        mode: 'dialog' as const
      },
      delete: {
        enabled: true,
        label: 'Remove User',
        position: 'row' as const,
        confirmDialog: true
      }
    },
    columns: [
      {
        field: 'id',
        headerName: 'User ID',
        displayName: 'ID',
        type: 'number' as const,
        dataType: 'int' as const,
        width: 100,
        isPrimaryKey: true,
        gridDisplayOption: 'readonly' as const,
        format: { type: 'none' as const },
        canCreate: false,
        canUpdate: false,
        formatLookup: { enabled: false },
        lookupAttributes: { enabled: false, source: 'static' as const }
      },
      {
        field: 'username',
        headerName: 'Username',
        displayName: 'Username',
        type: 'string' as const,
        dataType: 'varchar' as const,
        width: 150,
        required: true,
        gridDisplayOption: 'editable' as const,
        format: { type: 'none' as const },
        canCreate: true,
        canUpdate: true,
        formatLookup: { enabled: false },
        lookupAttributes: { enabled: false, source: 'static' as const }
      },
      {
        field: 'email',
        headerName: 'Email Address',
        displayName: 'Email',
        type: 'string' as const,
        dataType: 'varchar' as const,
        width: 200,
        required: true,
        gridDisplayOption: 'editable' as const,
        format: { type: 'none' as const },
        canCreate: true,
        canUpdate: true,
        formatLookup: { enabled: false },
        lookupAttributes: { enabled: false, source: 'static' as const }
      },
      {
        field: 'department',
        headerName: 'Department',
        displayName: 'Dept',
        type: 'select' as const,
        dataType: 'varchar' as const,
        width: 150,
        gridDisplayOption: 'editable' as const,
        format: { type: 'none' as const },
        canCreate: true,
        canUpdate: true,
        formatLookup: { enabled: false },
        lookupAttributes: {
          enabled: true,
          source: 'api' as const,
          apiConfig: {
            endpoint: 'https://api.example.com/departments',
            method: 'GET' as const,
            valueField: 'id',
            labelField: 'name'
          }
        }
      },
      {
        field: 'salary',
        headerName: 'Salary',
        displayName: 'Salary',
        type: 'number' as const,
        dataType: 'decimal' as const,
        width: 130,
        gridDisplayOption: 'editable' as const,
        format: {
          type: 'financial' as const,
          currency: 'USD',
          decimals: 2
        },
        canCreate: true,
        canUpdate: true,
        formatLookup: { enabled: false },
        lookupAttributes: { enabled: false, source: 'static' as const }
      },
      {
        field: 'startDate',
        headerName: 'Start Date',
        displayName: 'Start Date',
        type: 'date' as const,
        dataType: 'date' as const,
        width: 130,
        gridDisplayOption: 'editable' as const,
        format: {
          type: 'date' as const,
          dateFormat: 'MM/dd/yyyy'
        },
        canCreate: true,
        canUpdate: true,
        formatLookup: { enabled: false },
        lookupAttributes: { enabled: false, source: 'static' as const }
      }
    ]
  },

  productCatalog: {
    dataSource: {
      type: 'api' as const,
      endpoint: 'https://api.example.com/products',
      method: 'GET' as const
    },
    eventButtons: {
      insert: {
        enabled: true,
        label: 'Add Product',
        position: 'both' as const
      },
      update: {
        enabled: true,
        label: 'Edit',
        position: 'both' as const,
        mode: 'inline' as const
      },
      delete: {
        enabled: false,
        label: 'Delete',
        position: 'row' as const,
        confirmDialog: true
      }
    },
    columns: [
      {
        field: 'sku',
        headerName: 'SKU',
        displayName: 'Product Code',
        type: 'string' as const,
        dataType: 'varchar' as const,
        width: 120,
        isPrimaryKey: true,
        gridDisplayOption: 'editable' as const,
        format: { type: 'none' as const },
        canCreate: true,
        canUpdate: false,
        formatLookup: { enabled: false },
        lookupAttributes: { enabled: false, source: 'static' as const }
      },
      {
        field: 'name',
        headerName: 'Product Name',
        displayName: 'Name',
        type: 'string' as const,
        dataType: 'varchar' as const,
        width: 200,
        required: true,
        gridDisplayOption: 'editable' as const,
        format: { type: 'none' as const },
        canCreate: true,
        canUpdate: true,
        formatLookup: { enabled: false },
        lookupAttributes: { enabled: false, source: 'static' as const }
      },
      {
        field: 'category',
        headerName: 'Category',
        displayName: 'Category',
        type: 'select' as const,
        dataType: 'varchar' as const,
        width: 150,
        gridDisplayOption: 'editable' as const,
        format: { type: 'none' as const },
        canCreate: true,
        canUpdate: true,
        formatLookup: { enabled: false },
        lookupAttributes: {
          enabled: true,
          source: 'static' as const,
          staticData: [
            { value: 'electronics', label: 'Electronics' },
            { value: 'clothing', label: 'Clothing' },
            { value: 'books', label: 'Books' },
            { value: 'home', label: 'Home & Garden' }
          ]
        }
      },
      {
        field: 'price',
        headerName: 'Price',
        displayName: 'Unit Price',
        type: 'number' as const,
        dataType: 'decimal' as const,
        width: 120,
        gridDisplayOption: 'editable' as const,
        format: {
          type: 'financial' as const,
          currency: 'USD',
          decimals: 2
        },
        canCreate: true,
        canUpdate: true,
        formatLookup: { enabled: false },
        lookupAttributes: { enabled: false, source: 'static' as const }
      },
      {
        field: 'stock',
        headerName: 'Stock Quantity',
        displayName: 'Stock',
        type: 'number' as const,
        dataType: 'int' as const,
        width: 100,
        gridDisplayOption: 'editable' as const,
        format: { type: 'none' as const },
        canCreate: true,
        canUpdate: true,
        formatLookup: { enabled: false },
        lookupAttributes: { enabled: false, source: 'static' as const }
      },
      {
        field: 'active',
        headerName: 'Active Status',
        displayName: 'Active',
        type: 'boolean' as const,
        dataType: 'boolean' as const,
        width: 100,
        gridDisplayOption: 'editable' as const,
        format: { type: 'none' as const },
        canCreate: true,
        canUpdate: true,
        formatLookup: { enabled: false },
        lookupAttributes: { enabled: false, source: 'static' as const }
      }
    ]
  }
};

export const EnhancedDataGridDemo: React.FC = () => {
  const [showConfig, setShowConfig] = useState(false);
  const [currentConfig, setCurrentConfig] = useState<any>(null);
  const [configTitle, setConfigTitle] = useState('');

  const handleOpenConfig = (configKey: keyof typeof sampleConfigurations, title: string) => {
    setCurrentConfig(sampleConfigurations[configKey]);
    setConfigTitle(title);
    setShowConfig(true);
  };

  const handleSaveConfig = (config: any) => {
    console.log('Saved configuration:', config);
    // Here you would typically save the configuration to your backend
    setShowConfig(false);
  };

  const renderConfigSummary = (config: any) => {
    const { dataSource, eventButtons, columns } = config;
    const enabledButtons = Object.values(eventButtons).filter((btn: any) => btn.enabled).length;
    const primaryKeys = columns.filter((col: any) => col.isPrimaryKey).length;
    const editableColumns = columns.filter((col: any) => col.gridDisplayOption === 'editable').length;
    
    return (
      <Box>
        <Grid container spacing={1} sx={{ mb: 2 }}>
          <Grid item>
            <Chip
              icon={<StorageIcon />}
              label={`${dataSource.type} data source`}
              size="small"
              color={dataSource.type === 'api' ? 'primary' : 'default'}
            />
          </Grid>
          <Grid item>
            <Chip
              icon={<PlayIcon />}
              label={`${enabledButtons} event buttons`}
              size="small"
              color="secondary"
            />
          </Grid>
          <Grid item>
            <Chip
              label={`${columns.length} columns`}
              size="small"
              color="info"
            />
          </Grid>
          <Grid item>
            <Chip
              label={`${primaryKeys} primary keys`}
              size="small"
              color="warning"
            />
          </Grid>
          <Grid item>
            <Chip
              label={`${editableColumns} editable`}
              size="small"
              color="success"
            />
          </Grid>
        </Grid>

        <Typography variant="body2" color="text.secondary" sx={{ mb: 1 }}>
          <strong>Data Source:</strong> {dataSource.type === 'api' ? dataSource.endpoint : 'Static data'}
        </Typography>

        <Typography variant="body2" color="text.secondary" sx={{ mb: 1 }}>
          <strong>Event Buttons:</strong> {
            Object.entries(eventButtons)
              .filter(([_, btn]: any) => btn.enabled)
              .map(([key, btn]: any) => `${key} (${btn.position})`)
              .join(', ')
          }
        </Typography>

        <Typography variant="body2" color="text.secondary">
          <strong>Columns:</strong> {columns.map((col: any) => col.headerName).join(', ')}
        </Typography>
      </Box>
    );
  };

  return (
    <Box p={3}>
      <Typography variant="h4" gutterBottom>
        Enhanced DataGrid Configuration Demo
      </Typography>
      
      <Typography variant="body1" paragraph>
        This demo showcases the enhanced DataGrid configuration system with:
      </Typography>
      
      <Box component="ul" sx={{ mb: 3 }}>
        <li><strong>Data Source Configuration:</strong> Static data or API endpoints</li>
        <li><strong>Event Buttons:</strong> Insert, Update, Delete with positioning and modes</li>
        <li><strong>Column Attributes:</strong> Field names, display names, data types</li>
        <li><strong>Grid Display Options:</strong> Visible, Hidden, Read-only, Editable</li>
        <li><strong>Format Options:</strong> Financial, Date, Percentage, Custom</li>
        <li><strong>Create/Update Permissions:</strong> Column-level access control</li>
        <li><strong>Format Lookup:</strong> External data formatting</li>
        <li><strong>Lookup Attributes:</strong> Dynamic dropdown data from APIs or static sources</li>
      </Box>

      <Grid container spacing={3}>
        {/* User Management Configuration */}
        <Grid item xs={12} md={6}>
          <Card>
            <CardContent>
              <Typography variant="h6" gutterBottom>
                User Management System
              </Typography>
              <Typography variant="body2" color="text.secondary" paragraph>
                Complete user management with departments lookup, salary formatting, and date fields.
              </Typography>
              
              {renderConfigSummary(sampleConfigurations.userManagement)}
            </CardContent>
            <CardActions>
              <Button
                size="small"
                startIcon={<SettingsIcon />}
                onClick={() => handleOpenConfig('userManagement', 'User Management Configuration')}
              >
                Configure
              </Button>
              <Button size="small" startIcon={<VisibilityIcon />}>
                Preview
              </Button>
            </CardActions>
          </Card>
        </Grid>

        {/* Product Catalog Configuration */}
        <Grid item xs={12} md={6}>
          <Card>
            <CardContent>
              <Typography variant="h6" gutterBottom>
                Product Catalog
              </Typography>
              <Typography variant="body2" color="text.secondary" paragraph>
                Product management with category selection, price formatting, and stock control.
              </Typography>
              
              {renderConfigSummary(sampleConfigurations.productCatalog)}
            </CardContent>
            <CardActions>
              <Button
                size="small"
                startIcon={<SettingsIcon />}
                onClick={() => handleOpenConfig('productCatalog', 'Product Catalog Configuration')}
              >
                Configure
              </Button>
              <Button size="small" startIcon={<VisibilityIcon />}>
                Preview
              </Button>
            </CardActions>
          </Card>
        </Grid>
      </Grid>

      <Paper sx={{ p: 3, mt: 3 }}>
        <Typography variant="h6" gutterBottom>
          Configuration Features
        </Typography>
        
        <Grid container spacing={2}>
          <Grid item xs={12} md={4}>
            <Typography variant="subtitle2" gutterBottom>Data Source</Typography>
            <Typography variant="body2" color="text.secondary">
              • Static data or API endpoints<br/>
              • GET/POST methods<br/>
              • Custom headers and parameters
            </Typography>
          </Grid>
          
          <Grid item xs={12} md={4}>
            <Typography variant="subtitle2" gutterBottom>Event Buttons</Typography>
            <Typography variant="body2" color="text.secondary">
              • Insert: Top, bottom, or both positions<br/>
              • Update: Inline, dialog, or page modes<br/>
              • Delete: With confirmation dialogs
            </Typography>
          </Grid>
          
          <Grid item xs={12} md={4}>
            <Typography variant="subtitle2" gutterBottom>Column Configuration</Typography>
            <Typography variant="body2" color="text.secondary">
              • Field attributes and display names<br/>
              • Data types and grid options<br/>
              • Formatting and lookup configurations
            </Typography>
          </Grid>
        </Grid>
      </Paper>

      {/* Configuration Dialog */}
      <DataGridFieldConfig
        open={showConfig}
        onClose={() => setShowConfig(false)}
        onSave={handleSaveConfig}
        initialConfig={currentConfig}
      />
    </Box>
  );
};
