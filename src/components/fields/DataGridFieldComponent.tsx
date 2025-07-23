import React, { useState, useCallback } from 'react';
import {
  Box,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  TextField,
  Button,
  IconButton,
  Select,
  MenuItem,
  FormControl,
  InputLabel,
  Checkbox,
  Typography,
  Tooltip,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Grid,
} from '@mui/material';
import {
  Add as AddIcon,
  Delete as DeleteIcon,
  Edit as EditIcon,
  Save as SaveIcon,
  Cancel as CancelIcon,
  ViewColumn as ViewColumnIcon,
  Settings as SettingsIcon,
} from '@mui/icons-material';
import { DataGridField, DataGridColumn, SelectOption } from '../../types';
// Import will be added when the component is available
// import DataGridFieldConfig from '../DataGridFieldConfig';

interface DataGridFieldComponentProps {
  field: DataGridField;
  value: any[];
  onChange: (value: any[]) => void;
  onFieldChange?: (updatedField: DataGridField) => void;
  error?: string;
  disabled?: boolean;
  allowConfiguration?: boolean;
}

interface EditingCell {
  rowId: string;
  field: string;
  value: any;
}

export const DataGridFieldComponent: React.FC<DataGridFieldComponentProps> = ({
  field,
  value = [],
  onChange,
  onFieldChange,
  error,
  disabled = false,
  allowConfiguration = false,
}) => {
  const [editingCell, setEditingCell] = useState<EditingCell | null>(null);
  const [addDialogOpen, setAddDialogOpen] = useState(false);
  const [configDialogOpen, setConfigDialogOpen] = useState(false);
  const [newRowData, setNewRowData] = useState<any>({});

  // Generate unique ID for new rows
  const generateRowId = () => `row_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`;

  // Initialize rows with IDs if they don't have them
  const ensureRowIds = useCallback((rows: any[]) => {
    if (!Array.isArray(rows)) {
      return [];
    }
    return rows.map(row => ({
      ...row,
      id: row.id || generateRowId()
    }));
  }, []);

  const currentValue = ensureRowIds(value || field.initialRows || []);

  // Handle cell value changes
  const handleCellChange = (rowId: string, fieldName: string, newValue: any) => {
    const updatedRows = currentValue.map(row => 
      row.id === rowId 
        ? { ...row, [fieldName]: newValue }
        : row
    );
    onChange(updatedRows);
    setEditingCell(null);
  };

  // Handle adding new row
  const handleAddRow = () => {
    // Validate required fields
    const requiredFields = field.columns.filter(col => col.required);
    const missingFields = requiredFields.filter(col => !newRowData[col.field]);
    
    if (missingFields.length > 0) {
      return; // Show validation error
    }

    const newRow = {
      ...newRowData,
      id: generateRowId()
    };
    
    onChange([...currentValue, newRow]);
    setNewRowData({});
    setAddDialogOpen(false);
  };

  // Handle deleting row
  const handleDeleteRow = (rowId: string) => {
    const updatedRows = currentValue.filter(row => row.id !== rowId);
    onChange(updatedRows);
  };

  // Start editing cell
  const startEditing = (rowId: string, fieldName: string, currentValue: any) => {
    if (disabled) return;
    setEditingCell({ rowId, field: fieldName, value: currentValue });
  };

  // Cancel editing
  const cancelEditing = () => {
    setEditingCell(null);
  };

  // Save cell edit
  const saveCellEdit = () => {
    if (editingCell) {
      handleCellChange(editingCell.rowId, editingCell.field, editingCell.value);
    }
  };

  // Render cell content based on column type
  const renderCellContent = (row: any, column: DataGridColumn) => {
    const cellValue = row[column.field];
    const isEditing = editingCell?.rowId === row.id && editingCell?.field === column.field;

    if (isEditing) {
      return renderEditingCell(column, editingCell.value, (value) => 
        setEditingCell({ ...editingCell, value })
      );
    }

    if (!column.editable || disabled) {
      return renderDisplayCell(cellValue, column);
    }

    return (
      <Box 
        onClick={() => startEditing(row.id, column.field, cellValue)}
        sx={{ 
          cursor: 'pointer',
          padding: '8px',
          borderRadius: 1,
          '&:hover': {
            backgroundColor: 'action.hover'
          }
        }}
      >
        {renderDisplayCell(cellValue, column)}
      </Box>
    );
  };

  // Render display cell
  const renderDisplayCell = (value: any, column: DataGridColumn) => {
    switch (column.type) {
      case 'boolean':
        return <Checkbox checked={!!value} disabled readOnly />;
      case 'select':
        const option = column.options?.find(opt => opt.value === value);
        return option?.label || value || '';
      case 'date':
        return value ? new Date(value).toLocaleDateString() : '';
      default:
        return value || '';
    }
  };

  // Render editing cell
  const renderEditingCell = (column: DataGridColumn, value: any, onChange: (value: any) => void) => {
    switch (column.type) {
      case 'select':
        return (
          <FormControl size="small" fullWidth>
            <Select
              value={value || ''}
              onChange={(e) => onChange(e.target.value)}
              autoFocus
            >
              {column.options?.map((option) => (
                <MenuItem key={option.value} value={option.value}>
                  {option.label}
                </MenuItem>
              ))}
            </Select>
          </FormControl>
        );
      case 'boolean':
        return (
          <Checkbox
            checked={!!value}
            onChange={(e) => onChange(e.target.checked)}
            autoFocus
          />
        );
      case 'number':
        return (
          <TextField
            type="number"
            value={value || ''}
            onChange={(e) => onChange(Number(e.target.value))}
            size="small"
            fullWidth
            autoFocus
          />
        );
      case 'date':
        return (
          <TextField
            type="date"
            value={value || ''}
            onChange={(e) => onChange(e.target.value)}
            size="small"
            fullWidth
            autoFocus
            InputLabelProps={{
              shrink: true,
            }}
          />
        );
      default:
        return (
          <TextField
            value={value || ''}
            onChange={(e) => onChange(e.target.value)}
            size="small"
            fullWidth
            autoFocus
          />
        );
    }
  };

  // Handle column configuration changes
  const handleColumnConfigSave = (updatedColumns: DataGridColumn[]) => {
    if (onFieldChange) {
      const updatedField: DataGridField = {
        ...field,
        columns: updatedColumns.map((col, index) => ({ ...col, order: index }))
      };
      onFieldChange(updatedField);
    }
    setConfigDialogOpen(false);
  };

  // Check if max rows limit is reached
  const isMaxRowsReached = field.maxRows ? currentValue.length >= field.maxRows : false;

  return (
    <Box>
      <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 2 }}>
        <Typography variant="h6">{field.label}</Typography>
        <Box sx={{ display: 'flex', gap: 1 }}>
          {allowConfiguration && onFieldChange && (
            <Tooltip title="Configure Fields">
              <IconButton
                size="small"
                onClick={() => setConfigDialogOpen(true)}
                disabled={disabled}
              >
                <SettingsIcon />
              </IconButton>
            </Tooltip>
          )}
          {field.allowAdd && !disabled && !isMaxRowsReached && (
            <Button
              startIcon={<AddIcon />}
              variant="outlined"
              size="small"
              onClick={() => setAddDialogOpen(true)}
            >
              Add Row
            </Button>
          )}
        </Box>
      </Box>

      <TableContainer component={Paper} variant="outlined">
        <Table size="small">
          <TableHead>
            <TableRow>
              {field.columns.map((column) => (
                <TableCell 
                  key={column.field}
                  sx={{ 
                    fontWeight: 600,
                    backgroundColor: 'grey.50',
                    width: column.width || 'auto'
                  }}
                >
                  <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                    {column.headerName}
                    {column.required && (
                      <Typography component="span" color="error">*</Typography>
                    )}
                  </Box>
                </TableCell>
              ))}
              {(field.allowEdit || field.allowDelete) && !disabled && (
                <TableCell sx={{ fontWeight: 600, backgroundColor: 'grey.50', width: 120 }}>
                  Actions
                </TableCell>
              )}
            </TableRow>
          </TableHead>
          <TableBody>
            {currentValue.length === 0 ? (
              <TableRow>
                <TableCell 
                  colSpan={field.columns.length + (field.allowEdit || field.allowDelete ? 1 : 0)}
                  sx={{ textAlign: 'center', py: 4, color: 'text.secondary' }}
                >
                  No data available. Click "Add Row" to get started.
                </TableCell>
              </TableRow>
            ) : (
              currentValue.map((row) => (
                <TableRow key={row.id} hover>
                  {field.columns.map((column) => (
                    <TableCell key={column.field}>
                      {renderCellContent(row, column)}
                    </TableCell>
                  ))}
                  {(field.allowEdit || field.allowDelete) && !disabled && (
                    <TableCell>
                      <Box sx={{ display: 'flex', gap: 0.5 }}>
                        {editingCell?.rowId === row.id ? (
                          <>
                            <Tooltip title="Save">
                              <IconButton size="small" onClick={saveCellEdit} color="primary">
                                <SaveIcon />
                              </IconButton>
                            </Tooltip>
                            <Tooltip title="Cancel">
                              <IconButton size="small" onClick={cancelEditing}>
                                <CancelIcon />
                              </IconButton>
                            </Tooltip>
                          </>
                        ) : (
                          <>
                            {field.allowDelete && (
                              <Tooltip title="Delete Row">
                                <IconButton 
                                  size="small" 
                                  onClick={() => handleDeleteRow(row.id)}
                                  color="error"
                                >
                                  <DeleteIcon />
                                </IconButton>
                              </Tooltip>
                            )}
                          </>
                        )}
                      </Box>
                    </TableCell>
                  )}
                </TableRow>
              ))
            )}
          </TableBody>
        </Table>
      </TableContainer>

      {error && (
        <Typography variant="caption" color="error" sx={{ mt: 1, display: 'block' }}>
          {error}
        </Typography>
      )}

      {field.helperText && (
        <Typography variant="caption" color="text.secondary" sx={{ mt: 1, display: 'block' }}>
          {field.helperText}
        </Typography>
      )}

      {/* Add Row Dialog */}
      <Dialog 
        open={addDialogOpen} 
        onClose={() => setAddDialogOpen(false)} 
        maxWidth="md" 
        fullWidth
      >
        <DialogTitle>
          <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
            <AddIcon />
            Add New Row
          </Box>
        </DialogTitle>
        <DialogContent>
          <Grid container spacing={2} sx={{ mt: 1 }}>
            {field.columns.map((column) => (
              <Grid item xs={12} sm={6} key={column.field}>
                {column.type === 'select' ? (
                  <FormControl fullWidth required={column.required}>
                    <InputLabel>{column.headerName}</InputLabel>
                    <Select
                      value={newRowData[column.field] || ''}
                      label={column.headerName}
                      onChange={(e) => setNewRowData({
                        ...newRowData,
                        [column.field]: e.target.value
                      })}
                    >
                      {column.options?.map((option) => (
                        <MenuItem key={option.value} value={option.value}>
                          {option.label}
                        </MenuItem>
                      ))}
                    </Select>
                  </FormControl>
                ) : column.type === 'boolean' ? (
                  <Box>
                    <Typography variant="body2" gutterBottom>
                      {column.headerName}
                      {column.required && <span style={{ color: 'red' }}>*</span>}
                    </Typography>
                    <Checkbox
                      checked={!!newRowData[column.field]}
                      onChange={(e) => setNewRowData({
                        ...newRowData,
                        [column.field]: e.target.checked
                      })}
                    />
                  </Box>
                ) : (
                  <TextField
                    fullWidth
                    label={column.headerName}
                    type={column.type === 'number' ? 'number' : column.type === 'date' ? 'date' : 'text'}
                    value={newRowData[column.field] || ''}
                    onChange={(e) => setNewRowData({
                      ...newRowData,
                      [column.field]: column.type === 'number' ? Number(e.target.value) : e.target.value
                    })}
                    required={column.required}
                    InputLabelProps={column.type === 'date' ? { shrink: true } : undefined}
                  />
                )}
              </Grid>
            ))}
          </Grid>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setAddDialogOpen(false)}>Cancel</Button>
          <Button onClick={handleAddRow} variant="contained">Add Row</Button>
        </DialogActions>
      </Dialog>

      {/* Field Configuration Dialog - Placeholder */}
      {configDialogOpen && (
        <Dialog open={configDialogOpen} onClose={() => setConfigDialogOpen(false)} maxWidth="lg" fullWidth>
          <DialogTitle>Configure DataGrid Fields</DialogTitle>
          <DialogContent>
            <Typography variant="body1">
              Field configuration interface will be available here. This allows you to:
            </Typography>
            <Box component="ul" sx={{ mt: 2 }}>
              <li>Add, edit, and remove columns</li>
              <li>Set primary keys and data types</li>
              <li>Configure field properties (required, unique, indexed)</li>
              <li>Arrange field order</li>
              <li>Set validation rules</li>
              <li>Configure API endpoints for dynamic data</li>
            </Box>
          </DialogContent>
          <DialogActions>
            <Button onClick={() => setConfigDialogOpen(false)}>Close</Button>
          </DialogActions>
        </Dialog>
      )}
    </Box>
  );
};

export default DataGridFieldComponent;
