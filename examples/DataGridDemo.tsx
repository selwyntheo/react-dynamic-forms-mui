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
  Chip,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  IconButton,
  TextField,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  Checkbox,
  FormControlLabel
} from '@mui/material';
import {
  Add as AddIcon,
  Edit as EditIcon,
  Delete as DeleteIcon,
  Save as SaveIcon,
  Cancel as CancelIcon,
  Settings as SettingsIcon
} from '@mui/icons-material';
import { DataGridFieldConfig } from '../src/components/DataGridFieldConfig';

// Sample data for different scenarios
const sampleUsers = [
  { id: 1, name: 'John Doe', email: 'john@example.com', department: 'Engineering', salary: 75000, startDate: '2023-01-15', active: true },
  { id: 2, name: 'Jane Smith', email: 'jane@example.com', department: 'Marketing', salary: 65000, startDate: '2023-03-20', active: true },
  { id: 3, name: 'Bob Johnson', email: 'bob@example.com', department: 'Sales', salary: 55000, startDate: '2022-11-10', active: false },
  { id: 4, name: 'Alice Brown', email: 'alice@example.com', department: 'Engineering', salary: 80000, startDate: '2023-05-05', active: true },
];

const sampleProducts = [
  { id: 1, sku: 'LAPTOP001', name: 'Gaming Laptop', category: 'Electronics', price: 1299.99, stock: 15, active: true },
  { id: 2, sku: 'SHIRT001', name: 'Cotton T-Shirt', category: 'Clothing', price: 29.99, stock: 50, active: true },
  { id: 3, sku: 'BOOK001', name: 'JavaScript Guide', category: 'Books', price: 39.99, stock: 25, active: true },
  { id: 4, sku: 'PLANT001', name: 'Indoor Plant', category: 'Home & Garden', price: 24.99, stock: 8, active: false },
];

// Default column configurations
const userColumns = [
  { field: 'id', headerName: 'ID', width: 70, editable: false },
  { field: 'name', headerName: 'Name', width: 150, editable: true },
  { field: 'email', headerName: 'Email', width: 200, editable: true },
  { field: 'department', headerName: 'Department', width: 120, editable: true },
  { field: 'salary', headerName: 'Salary', width: 100, editable: true, type: 'number' },
  { field: 'startDate', headerName: 'Start Date', width: 120, editable: true, type: 'date' },
  { field: 'active', headerName: 'Active', width: 80, editable: true, type: 'boolean' },
];

const productColumns = [
  { field: 'id', headerName: 'ID', width: 70, editable: false },
  { field: 'sku', headerName: 'SKU', width: 100, editable: true },
  { field: 'name', headerName: 'Product Name', width: 200, editable: true },
  { field: 'category', headerName: 'Category', width: 120, editable: true },
  { field: 'price', headerName: 'Price', width: 100, editable: true, type: 'number' },
  { field: 'stock', headerName: 'Stock', width: 80, editable: true, type: 'number' },
  { field: 'active', headerName: 'Active', width: 80, editable: true, type: 'boolean' },
];

interface SimpleDataGridProps {
  data: any[];
  columns: any[];
  title: string;
  onDataChange: (newData: any[]) => void;
  allowAdd?: boolean;
  allowEdit?: boolean;
  allowDelete?: boolean;
}

const SimpleDataGrid: React.FC<SimpleDataGridProps> = ({
  data,
  columns,
  title,
  onDataChange,
  allowAdd = true,
  allowEdit = true,
  allowDelete = true
}) => {
  const [editingRow, setEditingRow] = useState<number | null>(null);
  const [editingData, setEditingData] = useState<any>({});
  const [showAddDialog, setShowAddDialog] = useState(false);
  const [newRowData, setNewRowData] = useState<any>({});

  const handleEditStart = (rowIndex: number) => {
    setEditingRow(rowIndex);
    setEditingData({ ...data[rowIndex] });
  };

  const handleEditSave = () => {
    if (editingRow !== null) {
      const newData = [...data];
      newData[editingRow] = editingData;
      onDataChange(newData);
      setEditingRow(null);
      setEditingData({});
    }
  };

  const handleEditCancel = () => {
    setEditingRow(null);
    setEditingData({});
  };

  const handleDelete = (rowIndex: number) => {
    if (window.confirm('Are you sure you want to delete this row?')) {
      const newData = data.filter((_, index) => index !== rowIndex);
      onDataChange(newData);
    }
  };

  const handleAddNew = () => {
    const newRow = { ...newRowData, id: Math.max(...data.map(row => row.id || 0)) + 1 };
    onDataChange([...data, newRow]);
    setNewRowData({});
    setShowAddDialog(false);
  };

  const renderCellValue = (row: any, column: any, isEditing: boolean) => {
    const value = isEditing ? editingData[column.field] : row[column.field];

    if (isEditing && column.editable) {
      if (column.type === 'boolean') {
        return (
          <Checkbox
            checked={value || false}
            onChange={(e) => setEditingData({ ...editingData, [column.field]: e.target.checked })}
          />
        );
      } else if (column.field === 'department') {
        return (
          <Select
            value={value || ''}
            onChange={(e) => setEditingData({ ...editingData, [column.field]: e.target.value })}
            size="small"
            fullWidth
          >
            <MenuItem value="Engineering">Engineering</MenuItem>
            <MenuItem value="Marketing">Marketing</MenuItem>
            <MenuItem value="Sales">Sales</MenuItem>
            <MenuItem value="HR">HR</MenuItem>
          </Select>
        );
      } else if (column.field === 'category') {
        return (
          <Select
            value={value || ''}
            onChange={(e) => setEditingData({ ...editingData, [column.field]: e.target.value })}
            size="small"
            fullWidth
          >
            <MenuItem value="Electronics">Electronics</MenuItem>
            <MenuItem value="Clothing">Clothing</MenuItem>
            <MenuItem value="Books">Books</MenuItem>
            <MenuItem value="Home & Garden">Home & Garden</MenuItem>
          </Select>
        );
      } else {
        return (
          <TextField
            value={value || ''}
            onChange={(e) => setEditingData({ ...editingData, [column.field]: e.target.value })}
            size="small"
            type={column.type === 'number' ? 'number' : column.type === 'date' ? 'date' : 'text'}
            fullWidth
          />
        );
      }
    }

    if (column.type === 'boolean') {
      return value ? '✓' : '✗';
    }
    if (column.type === 'number' && column.field === 'price') {
      return `$${value?.toFixed(2) || '0.00'}`;
    }
    if (column.type === 'number' && column.field === 'salary') {
      return `$${value?.toLocaleString() || '0'}`;
    }
    
    return value;
  };

  return (
    <Card>
      <CardContent>
        <Box display="flex" justifyContent="space-between" alignItems="center" mb={2}>
          <Typography variant="h6">{title}</Typography>
          {allowAdd && (
            <Button
              variant="contained"
              startIcon={<AddIcon />}
              onClick={() => setShowAddDialog(true)}
            >
              Add Row
            </Button>
          )}
        </Box>

        <TableContainer component={Paper} variant="outlined">
          <Table size="small">
            <TableHead>
              <TableRow>
                {columns.map((column) => (
                  <TableCell key={column.field} style={{ width: column.width }}>
                    {column.headerName}
                  </TableCell>
                ))}
                {(allowEdit || allowDelete) && <TableCell>Actions</TableCell>}
              </TableRow>
            </TableHead>
            <TableBody>
              {data.map((row, rowIndex) => (
                <TableRow key={row.id || rowIndex}>
                  {columns.map((column) => (
                    <TableCell key={column.field}>
                      {renderCellValue(row, column, editingRow === rowIndex)}
                    </TableCell>
                  ))}
                  {(allowEdit || allowDelete) && (
                    <TableCell>
                      {editingRow === rowIndex ? (
                        <Box display="flex" gap={1}>
                          <IconButton size="small" onClick={handleEditSave} color="primary">
                            <SaveIcon />
                          </IconButton>
                          <IconButton size="small" onClick={handleEditCancel}>
                            <CancelIcon />
                          </IconButton>
                        </Box>
                      ) : (
                        <Box display="flex" gap={1}>
                          {allowEdit && (
                            <IconButton size="small" onClick={() => handleEditStart(rowIndex)}>
                              <EditIcon />
                            </IconButton>
                          )}
                          {allowDelete && (
                            <IconButton size="small" onClick={() => handleDelete(rowIndex)} color="error">
                              <DeleteIcon />
                            </IconButton>
                          )}
                        </Box>
                      )}
                    </TableCell>
                  )}
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>

        <Box mt={2} display="flex" justifyContent="space-between" alignItems="center">
          <Typography variant="body2" color="text.secondary">
            Total: {data.length} rows
          </Typography>
          <Box display="flex" gap={1}>
            <Chip label={`Add: ${allowAdd ? 'ON' : 'OFF'}`} color={allowAdd ? 'success' : 'default'} size="small" />
            <Chip label={`Edit: ${allowEdit ? 'ON' : 'OFF'}`} color={allowEdit ? 'success' : 'default'} size="small" />
            <Chip label={`Delete: ${allowDelete ? 'ON' : 'OFF'}`} color={allowDelete ? 'success' : 'default'} size="small" />
          </Box>
        </Box>
      </CardContent>

      {/* Add New Row Dialog */}
      <Dialog open={showAddDialog} onClose={() => setShowAddDialog(false)} maxWidth="sm" fullWidth>
        <DialogTitle>Add New Row</DialogTitle>
        <DialogContent>
          <Grid container spacing={2} sx={{ mt: 1 }}>
            {columns.filter(col => col.field !== 'id').map((column) => (
              <Grid item xs={12} sm={6} key={column.field}>
                {column.type === 'boolean' ? (
                  <FormControlLabel
                    control={
                      <Checkbox
                        checked={newRowData[column.field] || false}
                        onChange={(e) => setNewRowData({ ...newRowData, [column.field]: e.target.checked })}
                      />
                    }
                    label={column.headerName}
                  />
                ) : column.field === 'department' ? (
                  <FormControl fullWidth>
                    <InputLabel>{column.headerName}</InputLabel>
                    <Select
                      value={newRowData[column.field] || ''}
                      onChange={(e) => setNewRowData({ ...newRowData, [column.field]: e.target.value })}
                    >
                      <MenuItem value="Engineering">Engineering</MenuItem>
                      <MenuItem value="Marketing">Marketing</MenuItem>
                      <MenuItem value="Sales">Sales</MenuItem>
                      <MenuItem value="HR">HR</MenuItem>
                    </Select>
                  </FormControl>
                ) : column.field === 'category' ? (
                  <FormControl fullWidth>
                    <InputLabel>{column.headerName}</InputLabel>
                    <Select
                      value={newRowData[column.field] || ''}
                      onChange={(e) => setNewRowData({ ...newRowData, [column.field]: e.target.value })}
                    >
                      <MenuItem value="Electronics">Electronics</MenuItem>
                      <MenuItem value="Clothing">Clothing</MenuItem>
                      <MenuItem value="Books">Books</MenuItem>
                      <MenuItem value="Home & Garden">Home & Garden</MenuItem>
                    </Select>
                  </FormControl>
                ) : (
                  <TextField
                    fullWidth
                    label={column.headerName}
                    value={newRowData[column.field] || ''}
                    onChange={(e) => setNewRowData({ ...newRowData, [column.field]: e.target.value })}
                    type={column.type === 'number' ? 'number' : column.type === 'date' ? 'date' : 'text'}
                    InputLabelProps={column.type === 'date' ? { shrink: true } : undefined}
                  />
                )}
              </Grid>
            ))}
          </Grid>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setShowAddDialog(false)}>Cancel</Button>
          <Button onClick={handleAddNew} variant="contained">Add</Button>
        </DialogActions>
      </Dialog>
    </Card>
  );
};

export const DataGridDemo: React.FC = () => {
  const [userData, setUserData] = useState(sampleUsers);
  const [productData, setProductData] = useState(sampleProducts);
  const [showConfig, setShowConfig] = useState(false);
  const [currentConfigType, setCurrentConfigType] = useState<'users' | 'products'>('users');

  const handleConfigSave = (config: any) => {
    console.log('Configuration saved:', config);
    setShowConfig(false);
  };

  const openConfiguration = (type: 'users' | 'products') => {
    setCurrentConfigType(type);
    setShowConfig(true);
  };

  return (
    <Box p={3}>
      <Typography variant="h3" gutterBottom>
        DataGrid Demo
      </Typography>
      
      <Typography variant="h6" color="text.secondary" paragraph>
        Interactive DataGrid components with CRUD operations, inline editing, and configuration management
      </Typography>

      <Grid container spacing={3}>
        {/* Feature Overview */}
        <Grid item xs={12}>
          <Paper sx={{ p: 3, mb: 3 }}>
            <Typography variant="h5" gutterBottom>
              DataGrid Features
            </Typography>
            
            <Grid container spacing={2}>
              <Grid item xs={12} md={3}>
                <Typography variant="h6" color="primary">CRUD Operations</Typography>
                <Typography variant="body2">
                  • Add new rows with dialog form<br/>
                  • Inline editing with save/cancel<br/>
                  • Delete rows with confirmation<br/>
                  • Real-time data updates
                </Typography>
              </Grid>
              
              <Grid item xs={12} md={3}>
                <Typography variant="h6" color="primary">Field Types</Typography>
                <Typography variant="body2">
                  • Text fields with validation<br/>
                  • Number fields (currency, integers)<br/>
                  • Date fields with picker<br/>
                  • Boolean checkboxes<br/>
                  • Dropdown selectors
                </Typography>
              </Grid>
              
              <Grid item xs={12} md={3}>
                <Typography variant="h6" color="primary">Data Formatting</Typography>
                <Typography variant="body2">
                  • Currency formatting ($1,299.99)<br/>
                  • Date formatting (MM/DD/YYYY)<br/>
                  • Boolean indicators (✓/✗)<br/>
                  • Custom field rendering
                </Typography>
              </Grid>
              
              <Grid item xs={12} md={3}>
                <Typography variant="h6" color="primary">Configuration</Typography>
                <Typography variant="body2">
                  • Column management interface<br/>
                  • Data source configuration<br/>
                  • Event button controls<br/>
                  • Field attribute settings
                </Typography>
              </Grid>
            </Grid>
          </Paper>
        </Grid>

        {/* User Management DataGrid */}
        <Grid item xs={12} lg={6}>
          <Box mb={2} display="flex" justifyContent="space-between" alignItems="center">
            <Typography variant="h5">User Management</Typography>
            <Button
              variant="outlined"
              startIcon={<SettingsIcon />}
              onClick={() => openConfiguration('users')}
            >
              Configure
            </Button>
          </Box>
          <SimpleDataGrid
            data={userData}
            columns={userColumns}
            title="Employee Database"
            onDataChange={setUserData}
            allowAdd={true}
            allowEdit={true}
            allowDelete={true}
          />
          
          <Box mt={2}>
            <Typography variant="body2" color="text.secondary">
              <strong>Features:</strong> Department dropdown, salary formatting, date fields, boolean toggles
            </Typography>
          </Box>
        </Grid>

        {/* Product Catalog DataGrid */}
        <Grid item xs={12} lg={6}>
          <Box mb={2} display="flex" justifyContent="space-between" alignItems="center">
            <Typography variant="h5">Product Catalog</Typography>
            <Button
              variant="outlined"
              startIcon={<SettingsIcon />}
              onClick={() => openConfiguration('products')}
            >
              Configure
            </Button>
          </Box>
          <SimpleDataGrid
            data={productData}
            columns={productColumns}
            title="Product Inventory"
            onDataChange={setProductData}
            allowAdd={true}
            allowEdit={true}
            allowDelete={false}
          />
          
          <Box mt={2}>
            <Typography variant="body2" color="text.secondary">
              <strong>Features:</strong> Category dropdown, price formatting, stock management, delete disabled
            </Typography>
          </Box>
        </Grid>

        {/* Usage Instructions */}
        <Grid item xs={12}>
          <Paper sx={{ p: 3 }}>
            <Typography variant="h5" gutterBottom>
              How to Use
            </Typography>
            
            <Grid container spacing={3}>
              <Grid item xs={12} md={4}>
                <Typography variant="h6" gutterBottom>Adding Data</Typography>
                <Typography variant="body2">
                  1. Click the "Add Row" button<br/>
                  2. Fill in the form fields<br/>
                  3. Click "Add" to save<br/>
                  4. New row appears in the table
                </Typography>
              </Grid>
              
              <Grid item xs={12} md={4}>
                <Typography variant="h6" gutterBottom>Editing Data</Typography>
                <Typography variant="body2">
                  1. Click the edit icon (✏️) on any row<br/>
                  2. Fields become editable inline<br/>
                  3. Use dropdown for department/category<br/>
                  4. Click save (✓) or cancel (✗)
                </Typography>
              </Grid>
              
              <Grid item xs={12} md={4}>
                <Typography variant="h6" gutterBottom>Configuration</Typography>
                <Typography variant="body2">
                  1. Click "Configure" button<br/>
                  2. Modify data source settings<br/>
                  3. Configure event buttons<br/>
                  4. Set up column attributes
                </Typography>
              </Grid>
            </Grid>
          </Paper>
        </Grid>

        {/* Data Summary */}
        <Grid item xs={12}>
          <Paper sx={{ p: 3 }}>
            <Typography variant="h5" gutterBottom>
              Live Data Summary
            </Typography>
            
            <Grid container spacing={3}>
              <Grid item xs={12} md={6}>
                <Typography variant="h6">Users ({userData.length} total)</Typography>
                <Box display="flex" flexWrap="wrap" gap={1} mt={1}>
                  {Array.from(new Set(userData.map(u => u.department))).map(dept => (
                    <Chip 
                      key={dept} 
                      label={`${dept}: ${userData.filter(u => u.department === dept).length}`}
                      size="small" 
                    />
                  ))}
                </Box>
                <Typography variant="body2" color="text.secondary" mt={1}>
                  Active: {userData.filter(u => u.active).length} | 
                  Avg Salary: ${Math.round(userData.reduce((sum, u) => sum + u.salary, 0) / userData.length).toLocaleString()}
                </Typography>
              </Grid>
              
              <Grid item xs={12} md={6}>
                <Typography variant="h6">Products ({productData.length} total)</Typography>
                <Box display="flex" flexWrap="wrap" gap={1} mt={1}>
                  {Array.from(new Set(productData.map(p => p.category))).map(cat => (
                    <Chip 
                      key={cat} 
                      label={`${cat}: ${productData.filter(p => p.category === cat).length}`}
                      size="small" 
                    />
                  ))}
                </Box>
                <Typography variant="body2" color="text.secondary" mt={1}>
                  Active: {productData.filter(p => p.active).length} | 
                  Total Stock: {productData.reduce((sum, p) => sum + p.stock, 0)} units
                </Typography>
              </Grid>
            </Grid>
          </Paper>
        </Grid>
      </Grid>

      {/* Configuration Dialog */}
      <DataGridFieldConfig
        open={showConfig}
        onClose={() => setShowConfig(false)}
        onSave={handleConfigSave}
        initialConfig={undefined}
      />
    </Box>
  );
};
