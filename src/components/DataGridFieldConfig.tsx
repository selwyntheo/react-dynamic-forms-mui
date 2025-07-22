import React, { useState, useCallback } from 'react';
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
  TextField,
  FormControl,
  FormLabel,
  FormControlLabel,
  Checkbox,
  Select,
  MenuItem,
  Box,
  Typography,
  IconButton,
  List,
  ListItem,
  ListItemText,
  ListItemSecondaryAction,
  Chip,
  Accordion,
  AccordionSummary,
  AccordionDetails,
  Grid,
  Divider,
  Paper,
  Tab,
  Tabs,
  InputLabel,
  Switch,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow
} from '@mui/material';
import {
  Add as AddIcon,
  Delete as DeleteIcon,
  Edit as EditIcon,
  ExpandMore as ExpandMoreIcon,
  Key as KeyIcon,
  DataObject as DataObjectIcon,
  ArrowUpward as ArrowUpIcon,
  ArrowDownward as ArrowDownIcon,
  Storage as StorageIcon,
  PlayArrow as PlayIcon,
  Settings as SettingsIcon
} from '@mui/icons-material';
import { DataGridColumn } from '../types';

interface DataGridConfigProps {
  open: boolean;
  onClose: () => void;
  onSave: (config: DataGridConfiguration) => void;
  initialConfig?: DataGridConfiguration;
}

interface DataGridConfiguration {
  dataSource: {
    type: 'static' | 'api';
    endpoint?: string;
    method?: 'GET' | 'POST';
    headers?: Record<string, string>;
    params?: Record<string, any>;
  };
  eventButtons: {
    insert: {
      enabled: boolean;
      label: string;
      position: 'top' | 'bottom' | 'both';
    };
    update: {
      enabled: boolean;
      label: string;
      position: 'row' | 'toolbar' | 'both';
      mode: 'inline' | 'dialog' | 'page';
    };
    delete: {
      enabled: boolean;
      label: string;
      position: 'row' | 'toolbar' | 'both';
      confirmDialog: boolean;
    };
  };
  columns: DataGridColumn[];
}

interface TabPanelProps {
  children?: React.ReactNode;
  index: number;
  value: number;
}

function TabPanel(props: TabPanelProps) {
  const { children, value, index, ...other } = props;
  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`config-tabpanel-${index}`}
      aria-labelledby={`config-tab-${index}`}
      {...other}
    >
      {value === index && <Box sx={{ p: 3 }}>{children}</Box>}
    </div>
  );
}

const defaultColumn: DataGridColumn = {
  field: '',
  headerName: '',
  displayName: '',
  type: 'string',
  dataType: 'varchar',
  width: 150,
  editable: true,
  required: false,
  isPrimaryKey: false,
  gridDisplayOption: 'visible',
  format: {
    type: 'none'
  },
  canCreate: true,
  canUpdate: true,
  formatLookup: {
    enabled: false
  },
  lookupAttributes: {
    enabled: false,
    source: 'static'
  }
};

const defaultConfig: DataGridConfiguration = {
  dataSource: {
    type: 'static'
  },
  eventButtons: {
    insert: {
      enabled: true,
      label: 'Add Row',
      position: 'top'
    },
    update: {
      enabled: true,
      label: 'Edit',
      position: 'row',
      mode: 'inline'
    },
    delete: {
      enabled: true,
      label: 'Delete',
      position: 'row',
      confirmDialog: true
    }
  },
  columns: []
};

export const DataGridFieldConfig: React.FC<DataGridConfigProps> = ({
  open,
  onClose,
  onSave,
  initialConfig
}) => {
  const [currentTab, setCurrentTab] = useState(0);
  const [config, setConfig] = useState<DataGridConfiguration>(initialConfig || defaultConfig);
  const [showColumnDialog, setShowColumnDialog] = useState(false);
  const [editingColumnIndex, setEditingColumnIndex] = useState<number | null>(null);
  const [columnForm, setColumnForm] = useState<DataGridColumn>(defaultColumn);

  const handleTabChange = (event: React.SyntheticEvent, newValue: number) => {
    setCurrentTab(newValue);
  };

  const handleDataSourceChange = (field: string, value: any) => {
    setConfig(prev => ({
      ...prev,
      dataSource: {
        ...prev.dataSource,
        [field]: value
      }
    }));
  };

  const handleEventButtonChange = (buttonType: 'insert' | 'update' | 'delete', field: string, value: any) => {
    setConfig(prev => ({
      ...prev,
      eventButtons: {
        ...prev.eventButtons,
        [buttonType]: {
          ...prev.eventButtons[buttonType],
          [field]: value
        }
      }
    }));
  };

  const handleAddColumn = () => {
    setColumnForm(defaultColumn);
    setEditingColumnIndex(null);
    setShowColumnDialog(true);
  };

  const handleEditColumn = (index: number) => {
    setColumnForm(config.columns[index]);
    setEditingColumnIndex(index);
    setShowColumnDialog(true);
  };

  const handleSaveColumn = () => {
    if (!columnForm.field || !columnForm.headerName) {
      return;
    }

    setConfig(prev => {
      const newColumns = [...prev.columns];
      if (editingColumnIndex !== null) {
        newColumns[editingColumnIndex] = columnForm;
      } else {
        newColumns.push(columnForm);
      }
      return {
        ...prev,
        columns: newColumns
      };
    });

    setShowColumnDialog(false);
    setEditingColumnIndex(null);
  };

  const handleDeleteColumn = (index: number) => {
    setConfig(prev => ({
      ...prev,
      columns: prev.columns.filter((_, i) => i !== index)
    }));
  };

  const handleMoveColumn = (index: number, direction: 'up' | 'down') => {
    setConfig(prev => {
      const newColumns = [...prev.columns];
      if (direction === 'up' && index > 0) {
        [newColumns[index], newColumns[index - 1]] = [newColumns[index - 1], newColumns[index]];
      } else if (direction === 'down' && index < newColumns.length - 1) {
        [newColumns[index], newColumns[index + 1]] = [newColumns[index + 1], newColumns[index]];
      }
      return {
        ...prev,
        columns: newColumns
      };
    });
  };

  const handleColumnFormChange = (field: string, value: any) => {
    setColumnForm(prev => ({
      ...prev,
      [field]: value
    }));
  };

  const handleNestedFormChange = (parentField: string, field: string, value: any) => {
    setColumnForm(prev => ({
      ...prev,
      [parentField]: {
        ...prev[parentField as keyof DataGridColumn],
        [field]: value
      }
    }));
  };

  const handleSave = () => {
    onSave(config);
    onClose();
  };

  return (
    <>
      <Dialog 
        open={open} 
        onClose={onClose} 
        maxWidth="lg" 
        fullWidth
        PaperProps={{
          sx: { height: '90vh' }
        }}
      >
        <DialogTitle>
          <Box display="flex" alignItems="center" gap={1}>
            <SettingsIcon />
            DataGrid Configuration
          </Box>
        </DialogTitle>
        
        <DialogContent>
          <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
            <Tabs value={currentTab} onChange={handleTabChange}>
              <Tab label="Data Source" icon={<StorageIcon />} />
              <Tab label="Event Buttons" icon={<PlayIcon />} />
              <Tab label="Columns" icon={<DataObjectIcon />} />
            </Tabs>
          </Box>

          {/* Data Source Tab */}
          <TabPanel value={currentTab} index={0}>
            <Paper sx={{ p: 3 }}>
              <Typography variant="h6" gutterBottom>Data Source Configuration</Typography>
              
              <Grid container spacing={3}>
                <Grid item xs={12}>
                  <FormControl fullWidth>
                    <InputLabel>Data Source Type</InputLabel>
                    <Select
                      value={config.dataSource.type}
                      onChange={(e) => handleDataSourceChange('type', e.target.value)}
                    >
                      <MenuItem value="static">Static Data</MenuItem>
                      <MenuItem value="api">API Endpoint</MenuItem>
                    </Select>
                  </FormControl>
                </Grid>

                {config.dataSource.type === 'api' && (
                  <>
                    <Grid item xs={12} md={8}>
                      <TextField
                        fullWidth
                        label="API Endpoint"
                        value={config.dataSource.endpoint || ''}
                        onChange={(e) => handleDataSourceChange('endpoint', e.target.value)}
                        placeholder="https://api.example.com/data"
                      />
                    </Grid>
                    <Grid item xs={12} md={4}>
                      <FormControl fullWidth>
                        <InputLabel>Method</InputLabel>
                        <Select
                          value={config.dataSource.method || 'GET'}
                          onChange={(e) => handleDataSourceChange('method', e.target.value)}
                        >
                          <MenuItem value="GET">GET</MenuItem>
                          <MenuItem value="POST">POST</MenuItem>
                        </Select>
                      </FormControl>
                    </Grid>
                  </>
                )}
              </Grid>
            </Paper>
          </TabPanel>

          {/* Event Buttons Tab */}
          <TabPanel value={currentTab} index={1}>
            <Paper sx={{ p: 3 }}>
              <Typography variant="h6" gutterBottom>Event Buttons Configuration</Typography>
              
              <Grid container spacing={3}>
                {/* Insert Button */}
                <Grid item xs={12}>
                  <Accordion>
                    <AccordionSummary expandIcon={<ExpandMoreIcon />}>
                      <Box display="flex" alignItems="center" gap={1}>
                        <AddIcon />
                        <Typography>Insert Button</Typography>
                        <Chip 
                          label={config.eventButtons.insert.enabled ? 'Enabled' : 'Disabled'} 
                          color={config.eventButtons.insert.enabled ? 'success' : 'default'}
                          size="small"
                        />
                      </Box>
                    </AccordionSummary>
                    <AccordionDetails>
                      <Grid container spacing={2}>
                        <Grid item xs={12}>
                          <FormControlLabel
                            control={
                              <Switch
                                checked={config.eventButtons.insert.enabled}
                                onChange={(e) => handleEventButtonChange('insert', 'enabled', e.target.checked)}
                              />
                            }
                            label="Enable Insert Button"
                          />
                        </Grid>
                        <Grid item xs={12} md={6}>
                          <TextField
                            fullWidth
                            label="Button Label"
                            value={config.eventButtons.insert.label}
                            onChange={(e) => handleEventButtonChange('insert', 'label', e.target.value)}
                          />
                        </Grid>
                        <Grid item xs={12} md={6}>
                          <FormControl fullWidth>
                            <InputLabel>Position</InputLabel>
                            <Select
                              value={config.eventButtons.insert.position}
                              onChange={(e) => handleEventButtonChange('insert', 'position', e.target.value)}
                            >
                              <MenuItem value="top">Top</MenuItem>
                              <MenuItem value="bottom">Bottom</MenuItem>
                              <MenuItem value="both">Both</MenuItem>
                            </Select>
                          </FormControl>
                        </Grid>
                      </Grid>
                    </AccordionDetails>
                  </Accordion>
                </Grid>

                {/* Update Button */}
                <Grid item xs={12}>
                  <Accordion>
                    <AccordionSummary expandIcon={<ExpandMoreIcon />}>
                      <Box display="flex" alignItems="center" gap={1}>
                        <EditIcon />
                        <Typography>Update Button</Typography>
                        <Chip 
                          label={config.eventButtons.update.enabled ? 'Enabled' : 'Disabled'} 
                          color={config.eventButtons.update.enabled ? 'success' : 'default'}
                          size="small"
                        />
                      </Box>
                    </AccordionSummary>
                    <AccordionDetails>
                      <Grid container spacing={2}>
                        <Grid item xs={12}>
                          <FormControlLabel
                            control={
                              <Switch
                                checked={config.eventButtons.update.enabled}
                                onChange={(e) => handleEventButtonChange('update', 'enabled', e.target.checked)}
                              />
                            }
                            label="Enable Update Button"
                          />
                        </Grid>
                        <Grid item xs={12} md={4}>
                          <TextField
                            fullWidth
                            label="Button Label"
                            value={config.eventButtons.update.label}
                            onChange={(e) => handleEventButtonChange('update', 'label', e.target.value)}
                          />
                        </Grid>
                        <Grid item xs={12} md={4}>
                          <FormControl fullWidth>
                            <InputLabel>Position</InputLabel>
                            <Select
                              value={config.eventButtons.update.position}
                              onChange={(e) => handleEventButtonChange('update', 'position', e.target.value)}
                            >
                              <MenuItem value="row">Row Actions</MenuItem>
                              <MenuItem value="toolbar">Toolbar</MenuItem>
                              <MenuItem value="both">Both</MenuItem>
                            </Select>
                          </FormControl>
                        </Grid>
                        <Grid item xs={12} md={4}>
                          <FormControl fullWidth>
                            <InputLabel>Edit Mode</InputLabel>
                            <Select
                              value={config.eventButtons.update.mode}
                              onChange={(e) => handleEventButtonChange('update', 'mode', e.target.value)}
                            >
                              <MenuItem value="inline">Inline Edit</MenuItem>
                              <MenuItem value="dialog">Dialog</MenuItem>
                              <MenuItem value="page">New Page</MenuItem>
                            </Select>
                          </FormControl>
                        </Grid>
                      </Grid>
                    </AccordionDetails>
                  </Accordion>
                </Grid>

                {/* Delete Button */}
                <Grid item xs={12}>
                  <Accordion>
                    <AccordionSummary expandIcon={<ExpandMoreIcon />}>
                      <Box display="flex" alignItems="center" gap={1}>
                        <DeleteIcon />
                        <Typography>Delete Button</Typography>
                        <Chip 
                          label={config.eventButtons.delete.enabled ? 'Enabled' : 'Disabled'} 
                          color={config.eventButtons.delete.enabled ? 'success' : 'default'}
                          size="small"
                        />
                      </Box>
                    </AccordionSummary>
                    <AccordionDetails>
                      <Grid container spacing={2}>
                        <Grid item xs={12}>
                          <FormControlLabel
                            control={
                              <Switch
                                checked={config.eventButtons.delete.enabled}
                                onChange={(e) => handleEventButtonChange('delete', 'enabled', e.target.checked)}
                              />
                            }
                            label="Enable Delete Button"
                          />
                        </Grid>
                        <Grid item xs={12} md={4}>
                          <TextField
                            fullWidth
                            label="Button Label"
                            value={config.eventButtons.delete.label}
                            onChange={(e) => handleEventButtonChange('delete', 'label', e.target.value)}
                          />
                        </Grid>
                        <Grid item xs={12} md={4}>
                          <FormControl fullWidth>
                            <InputLabel>Position</InputLabel>
                            <Select
                              value={config.eventButtons.delete.position}
                              onChange={(e) => handleEventButtonChange('delete', 'position', e.target.value)}
                            >
                              <MenuItem value="row">Row Actions</MenuItem>
                              <MenuItem value="toolbar">Toolbar</MenuItem>
                              <MenuItem value="both">Both</MenuItem>
                            </Select>
                          </FormControl>
                        </Grid>
                        <Grid item xs={12} md={4}>
                          <FormControlLabel
                            control={
                              <Switch
                                checked={config.eventButtons.delete.confirmDialog}
                                onChange={(e) => handleEventButtonChange('delete', 'confirmDialog', e.target.checked)}
                              />
                            }
                            label="Show Confirmation Dialog"
                          />
                        </Grid>
                      </Grid>
                    </AccordionDetails>
                  </Accordion>
                </Grid>
              </Grid>
            </Paper>
          </TabPanel>

          {/* Columns Tab */}
          <TabPanel value={currentTab} index={2}>
            <Box>
              <Box display="flex" justifyContent="space-between" alignItems="center" mb={2}>
                <Typography variant="h6">Column Configuration</Typography>
                <Button
                  variant="contained"
                  startIcon={<AddIcon />}
                  onClick={handleAddColumn}
                >
                  Add Column
                </Button>
              </Box>

              <TableContainer component={Paper}>
                <Table>
                  <TableHead>
                    <TableRow>
                      <TableCell>Field</TableCell>
                      <TableCell>Display Name</TableCell>
                      <TableCell>Type</TableCell>
                      <TableCell>Display Option</TableCell>
                      <TableCell>Format</TableCell>
                      <TableCell>Actions</TableCell>
                    </TableRow>
                  </TableHead>
                  <TableBody>
                    {config.columns.map((column, index) => (
                      <TableRow key={index}>
                        <TableCell>
                          <Box display="flex" alignItems="center" gap={1}>
                            {column.isPrimaryKey && <KeyIcon color="primary" fontSize="small" />}
                            {column.field}
                          </Box>
                        </TableCell>
                        <TableCell>{column.displayName || column.headerName}</TableCell>
                        <TableCell>{column.dataType}</TableCell>
                        <TableCell>
                          <Chip 
                            label={column.gridDisplayOption} 
                            size="small"
                            color={column.gridDisplayOption === 'visible' ? 'success' : 'default'}
                          />
                        </TableCell>
                        <TableCell>{column.format?.type || 'none'}</TableCell>
                        <TableCell>
                          <Box display="flex" gap={1}>
                            <IconButton 
                              size="small" 
                              onClick={() => handleMoveColumn(index, 'up')}
                              disabled={index === 0}
                            >
                              <ArrowUpIcon />
                            </IconButton>
                            <IconButton 
                              size="small" 
                              onClick={() => handleMoveColumn(index, 'down')}
                              disabled={index === config.columns.length - 1}
                            >
                              <ArrowDownIcon />
                            </IconButton>
                            <IconButton 
                              size="small" 
                              onClick={() => handleEditColumn(index)}
                            >
                              <EditIcon />
                            </IconButton>
                            <IconButton 
                              size="small" 
                              onClick={() => handleDeleteColumn(index)}
                              color="error"
                            >
                              <DeleteIcon />
                            </IconButton>
                          </Box>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </TableContainer>

              {config.columns.length === 0 && (
                <Box textAlign="center" py={4}>
                  <Typography color="text.secondary">
                    No columns configured. Click "Add Column" to get started.
                  </Typography>
                </Box>
              )}
            </Box>
          </TabPanel>
        </DialogContent>

        <DialogActions>
          <Button onClick={onClose}>Cancel</Button>
          <Button onClick={handleSave} variant="contained">
            Save Configuration
          </Button>
        </DialogActions>
      </Dialog>

      {/* Column Configuration Dialog */}
      <Dialog 
        open={showColumnDialog} 
        onClose={() => setShowColumnDialog(false)}
        maxWidth="md"
        fullWidth
      >
        <DialogTitle>
          {editingColumnIndex !== null ? 'Edit Column' : 'Add Column'}
        </DialogTitle>
        <DialogContent>
          <Grid container spacing={3} sx={{ mt: 1 }}>
            {/* Basic Column Information */}
            <Grid item xs={12}>
              <Typography variant="h6" gutterBottom>Basic Information</Typography>
              <Divider />
            </Grid>
            
            <Grid item xs={12} md={6}>
              <TextField
                fullWidth
                label="Attribute (Field Name)"
                value={columnForm.field}
                onChange={(e) => handleColumnFormChange('field', e.target.value)}
                required
              />
            </Grid>
            
            <Grid item xs={12} md={6}>
              <TextField
                fullWidth
                label="Header Name"
                value={columnForm.headerName || ''}
                onChange={(e) => handleColumnFormChange('headerName', e.target.value)}
                required
              />
            </Grid>
            
            <Grid item xs={12} md={4}>
              <TextField
                fullWidth
                label="Display Name"
                value={columnForm.displayName || ''}
                onChange={(e) => handleColumnFormChange('displayName', e.target.value)}
                placeholder={columnForm.headerName}
              />
            </Grid>

            <Grid item xs={12} md={4}>
              <FormControl fullWidth>
                <InputLabel>Grid Display Option</InputLabel>
                <Select
                  value={columnForm.gridDisplayOption || 'visible'}
                  onChange={(e) => handleColumnFormChange('gridDisplayOption', e.target.value)}
                >
                  <MenuItem value="visible">Visible</MenuItem>
                  <MenuItem value="hidden">Hidden</MenuItem>
                  <MenuItem value="readonly">Read Only</MenuItem>
                  <MenuItem value="editable">Editable</MenuItem>
                </Select>
              </FormControl>
            </Grid>

            <Grid item xs={12} md={4}>
              <FormControl fullWidth>
                <InputLabel>Data Type</InputLabel>
                <Select
                  value={columnForm.dataType || 'varchar'}
                  onChange={(e) => handleColumnFormChange('dataType', e.target.value)}
                >
                  <MenuItem value="varchar">Varchar</MenuItem>
                  <MenuItem value="int">Integer</MenuItem>
                  <MenuItem value="decimal">Decimal</MenuItem>
                  <MenuItem value="float">Float</MenuItem>
                  <MenuItem value="datetime">DateTime</MenuItem>
                  <MenuItem value="date">Date</MenuItem>
                  <MenuItem value="boolean">Boolean</MenuItem>
                  <MenuItem value="text">Text</MenuItem>
                  <MenuItem value="uuid">UUID</MenuItem>
                  <MenuItem value="json">JSON</MenuItem>
                </Select>
              </FormControl>
            </Grid>

            {/* Format Configuration */}
            <Grid item xs={12}>
              <Typography variant="h6" gutterBottom sx={{ mt: 2 }}>Format Configuration</Typography>
              <Divider />
            </Grid>

            <Grid item xs={12} md={6}>
              <FormControl fullWidth>
                <InputLabel>Format Type</InputLabel>
                <Select
                  value={columnForm.format?.type || 'none'}
                  onChange={(e) => handleNestedFormChange('format', 'type', e.target.value)}
                >
                  <MenuItem value="none">None</MenuItem>
                  <MenuItem value="financial">Financial</MenuItem>
                  <MenuItem value="date">Date</MenuItem>
                  <MenuItem value="percentage">Percentage</MenuItem>
                  <MenuItem value="custom">Custom</MenuItem>
                </Select>
              </FormControl>
            </Grid>

            {columnForm.format?.type === 'financial' && (
              <Grid item xs={12} md={6}>
                <TextField
                  fullWidth
                  label="Currency"
                  value={columnForm.format?.currency || 'USD'}
                  onChange={(e) => handleNestedFormChange('format', 'currency', e.target.value)}
                  placeholder="USD"
                />
              </Grid>
            )}

            {columnForm.format?.type === 'date' && (
              <Grid item xs={12} md={6}>
                <TextField
                  fullWidth
                  label="Date Format"
                  value={columnForm.format?.dateFormat || 'MM/dd/yyyy'}
                  onChange={(e) => handleNestedFormChange('format', 'dateFormat', e.target.value)}
                  placeholder="MM/dd/yyyy"
                />
              </Grid>
            )}

            {columnForm.format?.type === 'custom' && (
              <Grid item xs={12} md={6}>
                <TextField
                  fullWidth
                  label="Format Pattern"
                  value={columnForm.format?.pattern || ''}
                  onChange={(e) => handleNestedFormChange('format', 'pattern', e.target.value)}
                  placeholder="Custom format pattern"
                />
              </Grid>
            )}

            {/* Permissions */}
            <Grid item xs={12}>
              <Typography variant="h6" gutterBottom sx={{ mt: 2 }}>Permissions</Typography>
              <Divider />
            </Grid>

            <Grid item xs={12} md={6}>
              <FormControlLabel
                control={
                  <Checkbox
                    checked={columnForm.canCreate || false}
                    onChange={(e) => handleColumnFormChange('canCreate', e.target.checked)}
                  />
                }
                label="Option to Create"
              />
            </Grid>

            <Grid item xs={12} md={6}>
              <FormControlLabel
                control={
                  <Checkbox
                    checked={columnForm.canUpdate || false}
                    onChange={(e) => handleColumnFormChange('canUpdate', e.target.checked)}
                  />
                }
                label="Option to Update"
              />
            </Grid>

            {/* Format Lookup */}
            <Grid item xs={12}>
              <Typography variant="h6" gutterBottom sx={{ mt: 2 }}>Format Lookup</Typography>
              <Divider />
            </Grid>

            <Grid item xs={12}>
              <FormControlLabel
                control={
                  <Switch
                    checked={columnForm.formatLookup?.enabled || false}
                    onChange={(e) => handleNestedFormChange('formatLookup', 'enabled', e.target.checked)}
                  />
                }
                label="Enable Format Lookup"
              />
            </Grid>

            {columnForm.formatLookup?.enabled && (
              <>
                <Grid item xs={12} md={6}>
                  <TextField
                    fullWidth
                    label="Lookup Endpoint"
                    value={columnForm.formatLookup?.endpoint || ''}
                    onChange={(e) => handleNestedFormChange('formatLookup', 'endpoint', e.target.value)}
                    placeholder="https://api.example.com/lookup"
                  />
                </Grid>
                <Grid item xs={12} md={3}>
                  <TextField
                    fullWidth
                    label="Value Field"
                    value={columnForm.formatLookup?.valueField || 'id'}
                    onChange={(e) => handleNestedFormChange('formatLookup', 'valueField', e.target.value)}
                  />
                </Grid>
                <Grid item xs={12} md={3}>
                  <TextField
                    fullWidth
                    label="Display Field"
                    value={columnForm.formatLookup?.displayField || 'name'}
                    onChange={(e) => handleNestedFormChange('formatLookup', 'displayField', e.target.value)}
                  />
                </Grid>
              </>
            )}

            {/* Lookup Attributes */}
            <Grid item xs={12}>
              <Typography variant="h6" gutterBottom sx={{ mt: 2 }}>Lookup Attributes</Typography>
              <Divider />
            </Grid>

            <Grid item xs={12}>
              <FormControlLabel
                control={
                  <Switch
                    checked={columnForm.lookupAttributes?.enabled || false}
                    onChange={(e) => handleNestedFormChange('lookupAttributes', 'enabled', e.target.checked)}
                  />
                }
                label="Enable Lookup Attributes"
              />
            </Grid>

            {columnForm.lookupAttributes?.enabled && (
              <>
                <Grid item xs={12} md={6}>
                  <FormControl fullWidth>
                    <InputLabel>Lookup Source</InputLabel>
                    <Select
                      value={columnForm.lookupAttributes?.source || 'static'}
                      onChange={(e) => handleNestedFormChange('lookupAttributes', 'source', e.target.value)}
                    >
                      <MenuItem value="static">Static Data</MenuItem>
                      <MenuItem value="api">API Endpoint</MenuItem>
                      <MenuItem value="function">Function Call</MenuItem>
                    </Select>
                  </FormControl>
                </Grid>

                {columnForm.lookupAttributes?.source === 'api' && (
                  <>
                    <Grid item xs={12} md={6}>
                      <TextField
                        fullWidth
                        label="API Endpoint"
                        value={columnForm.lookupAttributes?.apiConfig?.endpoint || ''}
                        onChange={(e) => {
                          const apiConfig = columnForm.lookupAttributes?.apiConfig || {};
                          handleNestedFormChange('lookupAttributes', 'apiConfig', {
                            ...apiConfig,
                            endpoint: e.target.value
                          });
                        }}
                      />
                    </Grid>
                    <Grid item xs={12} md={3}>
                      <TextField
                        fullWidth
                        label="Value Field"
                        value={columnForm.lookupAttributes?.apiConfig?.valueField || 'id'}
                        onChange={(e) => {
                          const apiConfig = columnForm.lookupAttributes?.apiConfig || {};
                          handleNestedFormChange('lookupAttributes', 'apiConfig', {
                            ...apiConfig,
                            valueField: e.target.value
                          });
                        }}
                      />
                    </Grid>
                    <Grid item xs={12} md={3}>
                      <TextField
                        fullWidth
                        label="Label Field"
                        value={columnForm.lookupAttributes?.apiConfig?.labelField || 'name'}
                        onChange={(e) => {
                          const apiConfig = columnForm.lookupAttributes?.apiConfig || {};
                          handleNestedFormChange('lookupAttributes', 'apiConfig', {
                            ...apiConfig,
                            labelField: e.target.value
                          });
                        }}
                      />
                    </Grid>
                  </>
                )}
              </>
            )}
          </Grid>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setShowColumnDialog(false)}>Cancel</Button>
          <Button 
            onClick={handleSaveColumn} 
            variant="contained"
            disabled={!columnForm.field || !columnForm.headerName}
          >
            {editingColumnIndex !== null ? 'Update' : 'Add'} Column
          </Button>
        </DialogActions>
      </Dialog>
    </>
  );
};
