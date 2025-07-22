import React, { useState, useCallback } from 'react';
import {
  Box,
  Paper,
  Typography,
  Grid,
  Card,
  CardContent,
  Button,
  Divider,
  Chip,
  IconButton,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  TextField,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  Switch,
  FormControlLabel
} from '@mui/material';
import {
  DragIndicator as DragIcon,
  Add as AddIcon,
  Edit as EditIcon,
  Delete as DeleteIcon,
  Preview as PreviewIcon,
  Save as SaveIcon
} from '@mui/icons-material';
import { DynamicForm, FormConfig, FormField, FormSection } from '../src/index';

// Available field types for the field palette
const FIELD_TYPES = [
  { type: 'text', label: 'Text Input', icon: '📝' },
  { type: 'email', label: 'Email', icon: '📧' },
  { type: 'password', label: 'Password', icon: '🔒' },
  { type: 'number', label: 'Number', icon: '🔢' },
  { type: 'textarea', label: 'Textarea', icon: '📄' },
  { type: 'select', label: 'Dropdown', icon: '📋' },
  { type: 'multiselect', label: 'Multi-Select', icon: '☑️' },
  { type: 'radio', label: 'Radio Group', icon: '🔘' },
  { type: 'checkbox', label: 'Checkbox', icon: '✅' },
  { type: 'switch', label: 'Toggle Switch', icon: '🔄' },
  { type: 'rating', label: 'Star Rating', icon: '⭐' },
  { type: 'slider', label: 'Range Slider', icon: '🎚️' },
  { type: 'date', label: 'Date Picker', icon: '📅' },
  { type: 'time', label: 'Time Picker', icon: '⏰' }
];

interface FieldBuilderProps {
  onFormChange: (config: FormConfig) => void;
}

export const DragDropFormBuilder: React.FC<FieldBuilderProps> = ({ onFormChange }) => {
  const [formConfig, setFormConfig] = useState<FormConfig>({
    id: 'dynamic-form',
    title: 'Dynamic Form Builder',
    description: 'Build your form by dragging and dropping fields',
    sections: [{
      id: 'main-section',
      title: 'Form Fields',
      fields: []
    }],
    submitText: 'Submit Form',
    showReset: true
  });

  const [editingField, setEditingField] = useState<FormField | null>(null);
  const [editDialogOpen, setEditDialogOpen] = useState(false);
  const [previewMode, setPreviewMode] = useState(false);
  const [draggedField, setDraggedField] = useState<string | null>(null);

  // Handle drag start from field palette
  const handleDragStart = (e: React.DragEvent, fieldType: string) => {
    e.dataTransfer.setData('fieldType', fieldType);
    setDraggedField(fieldType);
  };

  // Handle drop in form builder area
  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    const fieldType = e.dataTransfer.getData('fieldType');
    if (fieldType) {
      addField(fieldType);
    }
    setDraggedField(null);
  };

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
  };

  // Add a new field to the form
  const addField = (fieldType: string) => {
    const fieldId = `field_${Date.now()}`;
    const fieldTypeInfo = FIELD_TYPES.find(f => f.type === fieldType);
    
    const newField: FormField = {
      id: fieldId,
      name: fieldId,
      label: fieldTypeInfo?.label || 'New Field',
      type: fieldType as any,
      required: false,
      ...(fieldType === 'select' || fieldType === 'multiselect' || fieldType === 'radio' || fieldType === 'checkbox' ? {
        options: [
          { value: 'option1', label: 'Option 1' },
          { value: 'option2', label: 'Option 2' }
        ]
      } : {}),
      ...(fieldType === 'rating' ? { max: 5 } : {}),
      ...(fieldType === 'slider' ? { min: 0, max: 100, step: 1 } : {})
    };

    const updatedConfig = {
      ...formConfig,
      sections: formConfig.sections.map(section => 
        section.id === 'main-section' 
          ? { ...section, fields: [...section.fields, newField] }
          : section
      )
    };

    setFormConfig(updatedConfig);
    onFormChange(updatedConfig);
  };

  // Remove a field from the form
  const removeField = (fieldId: string) => {
    const updatedConfig = {
      ...formConfig,
      sections: formConfig.sections.map(section => ({
        ...section,
        fields: section.fields.filter(field => field.id !== fieldId)
      }))
    };

    setFormConfig(updatedConfig);
    onFormChange(updatedConfig);
  };

  // Open field editor
  const editField = (field: FormField) => {
    setEditingField({ ...field });
    setEditDialogOpen(true);
  };

  // Save field changes
  const saveFieldChanges = () => {
    if (!editingField) return;

    const updatedConfig = {
      ...formConfig,
      sections: formConfig.sections.map(section => ({
        ...section,
        fields: section.fields.map(field => 
          field.id === editingField.id ? editingField : field
        )
      }))
    };

    setFormConfig(updatedConfig);
    onFormChange(updatedConfig);
    setEditDialogOpen(false);
    setEditingField(null);
  };

  // Render field palette
  const renderFieldPalette = () => (
    <Paper sx={{ p: 2, height: 'fit-content' }}>
      <Typography variant="h6" gutterBottom>
        🎨 Field Palette
      </Typography>
      <Typography variant="body2" color="textSecondary" sx={{ mb: 2 }}>
        Drag fields to add them to your form
      </Typography>
      
      <Grid container spacing={1}>
        {FIELD_TYPES.map((fieldType) => (
          <Grid item xs={12} sm={6} key={fieldType.type}>
            <Card
              draggable
              onDragStart={(e) => handleDragStart(e, fieldType.type)}
              sx={{
                cursor: 'grab',
                transition: 'all 0.2s',
                opacity: draggedField === fieldType.type ? 0.5 : 1,
                '&:hover': {
                  transform: 'translateY(-2px)',
                  boxShadow: 2
                },
                '&:active': {
                  cursor: 'grabbing'
                }
              }}
            >
              <CardContent sx={{ p: 1.5, '&:last-child': { pb: 1.5 } }}>
                <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                  <span style={{ fontSize: '16px' }}>{fieldType.icon}</span>
                  <Typography variant="body2" sx={{ fontSize: '12px' }}>
                    {fieldType.label}
                  </Typography>
                </Box>
              </CardContent>
            </Card>
          </Grid>
        ))}
      </Grid>
    </Paper>
  );

  // Render form builder area
  const renderFormBuilder = () => (
    <Paper 
      sx={{ p: 3, minHeight: 400 }}
      onDrop={handleDrop}
      onDragOver={handleDragOver}
    >
      <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 2 }}>
        <Typography variant="h6">
          🏗️ Form Builder
        </Typography>
        <Box>
          <IconButton onClick={() => setPreviewMode(!previewMode)} color="primary">
            <PreviewIcon />
          </IconButton>
          <Button
            startIcon={<SaveIcon />}
            variant="outlined"
            size="small"
            sx={{ ml: 1 }}
          >
            Save Form
          </Button>
        </Box>
      </Box>

      {formConfig.sections[0].fields.length === 0 ? (
        <Box
          sx={{
            border: '2px dashed #ccc',
            borderRadius: 2,
            p: 4,
            textAlign: 'center',
            backgroundColor: draggedField ? '#f5f5f5' : 'transparent'
          }}
        >
          <Typography variant="h6" color="textSecondary">
            Drop fields here to build your form
          </Typography>
          <Typography variant="body2" color="textSecondary">
            Drag any field type from the palette on the left
          </Typography>
        </Box>
      ) : (
        <Box>
          {formConfig.sections[0].fields.map((field, index) => (
            <Card key={field.id} sx={{ mb: 2, position: 'relative' }}>
              <CardContent>
                <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                  <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
                    <DragIcon sx={{ color: 'gray', cursor: 'grab' }} />
                    <Box>
                      <Typography variant="subtitle1">
                        {field.label}
                      </Typography>
                      <Box sx={{ display: 'flex', gap: 1, mt: 0.5 }}>
                        <Chip 
                          label={field.type} 
                          size="small" 
                          color="primary" 
                          variant="outlined" 
                        />
                        {field.required && (
                          <Chip 
                            label="Required" 
                            size="small" 
                            color="error" 
                            variant="outlined" 
                          />
                        )}
                      </Box>
                    </Box>
                  </Box>
                  
                  <Box>
                    <IconButton 
                      size="small" 
                      onClick={() => editField(field)}
                      color="primary"
                    >
                      <EditIcon />
                    </IconButton>
                    <IconButton 
                      size="small" 
                      onClick={() => removeField(field.id)}
                      color="error"
                    >
                      <DeleteIcon />
                    </IconButton>
                  </Box>
                </Box>
              </CardContent>
            </Card>
          ))}
        </Box>
      )}
    </Paper>
  );

  // Render field edit dialog
  const renderEditDialog = () => (
    <Dialog open={editDialogOpen} onClose={() => setEditDialogOpen(false)} maxWidth="sm" fullWidth>
      <DialogTitle>Edit Field: {editingField?.label}</DialogTitle>
      <DialogContent>
        {editingField && (
          <Box sx={{ pt: 1 }}>
            <TextField
              fullWidth
              label="Field Label"
              value={editingField.label}
              onChange={(e) => setEditingField({ ...editingField, label: e.target.value })}
              sx={{ mb: 2 }}
            />
            
            <TextField
              fullWidth
              label="Field Name"
              value={editingField.name}
              onChange={(e) => setEditingField({ ...editingField, name: e.target.value })}
              sx={{ mb: 2 }}
            />
            
            <TextField
              fullWidth
              label="Placeholder"
              value={editingField.placeholder || ''}
              onChange={(e) => setEditingField({ ...editingField, placeholder: e.target.value })}
              sx={{ mb: 2 }}
            />
            
            <TextField
              fullWidth
              label="Helper Text"
              value={editingField.helperText || ''}
              onChange={(e) => setEditingField({ ...editingField, helperText: e.target.value })}
              sx={{ mb: 2 }}
            />

            <FormControlLabel
              control={
                <Switch
                  checked={editingField.required || false}
                  onChange={(e) => setEditingField({ ...editingField, required: e.target.checked })}
                />
              }
              label="Required Field"
              sx={{ mb: 2 }}
            />

            {/* Options for select/radio/checkbox fields */}
            {['select', 'multiselect', 'radio', 'checkbox'].includes(editingField.type) && (
              <Box sx={{ mt: 2 }}>
                <Typography variant="subtitle2" gutterBottom>
                  Options (one per line, format: value|label)
                </Typography>
                <TextField
                  fullWidth
                  multiline
                  rows={4}
                  value={(editingField as any).options?.map((opt: any) => `${opt.value}|${opt.label}`).join('\n') || ''}
                  onChange={(e) => {
                    const options = e.target.value.split('\n').filter(line => line.trim()).map(line => {
                      const [value, label] = line.split('|');
                      return { value: value?.trim() || '', label: label?.trim() || value?.trim() || '' };
                    });
                    setEditingField({ ...editingField, options } as any);
                  }}
                  placeholder="option1|Option 1&#10;option2|Option 2"
                />
              </Box>
            )}
          </Box>
        )}
      </DialogContent>
      <DialogActions>
        <Button onClick={() => setEditDialogOpen(false)}>Cancel</Button>
        <Button onClick={saveFieldChanges} variant="contained">Save</Button>
      </DialogActions>
    </Dialog>
  );

  return (
    <Box>
      <Typography variant="h4" gutterBottom>
        🎯 Drag & Drop Form Builder Demo
      </Typography>
      
      <Typography variant="body1" sx={{ mb: 3 }}>
        This demo shows how to build dynamic forms using drag and drop functionality with the React Dynamic Forms library.
      </Typography>

      <Grid container spacing={3}>
        {/* Field Palette */}
        <Grid item xs={12} md={3}>
          {renderFieldPalette()}
        </Grid>

        {/* Form Builder */}
        <Grid item xs={12} md={9}>
          {previewMode ? (
            <Paper sx={{ p: 3 }}>
              <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 2 }}>
                <Typography variant="h6">📱 Form Preview</Typography>
                <Button onClick={() => setPreviewMode(false)} variant="outlined">
                  Back to Builder
                </Button>
              </Box>
              <Divider sx={{ mb: 3 }} />
              {formConfig.sections[0].fields.length > 0 ? (
                <DynamicForm
                  config={formConfig}
                  onSubmit={(data, isValid) => {
                    console.log('Form submitted:', data, 'Valid:', isValid);
                    alert('Form submitted! Check console for data.');
                  }}
                  onChange={(data, fieldName) => {
                    console.log('Field changed:', fieldName, data[fieldName]);
                  }}
                />
              ) : (
                <Typography color="textSecondary" sx={{ textAlign: 'center', py: 4 }}>
                  No fields added yet. Switch back to builder to add fields.
                </Typography>
              )}
            </Paper>
          ) : (
            renderFormBuilder()
          )}
        </Grid>
      </Grid>

      {/* Edit Dialog */}
      {renderEditDialog()}

      {/* Instructions */}
      <Paper sx={{ p: 3, mt: 3, backgroundColor: '#f8f9fa' }}>
        <Typography variant="h6" gutterBottom>
          📖 How to Use This Demo
        </Typography>
        <Grid container spacing={2}>
          <Grid item xs={12} md={6}>
            <Typography variant="subtitle2" gutterBottom>🔥 Building Forms:</Typography>
            <ul style={{ margin: 0, paddingLeft: '20px' }}>
              <li>Drag field types from the palette to the builder area</li>
              <li>Click the edit icon to customize field properties</li>
              <li>Use the delete icon to remove unwanted fields</li>
              <li>Fields can be reordered by dragging the drag handle</li>
            </ul>
          </Grid>
          <Grid item xs={12} md={6}>
            <Typography variant="subtitle2" gutterBottom>👀 Preview & Test:</Typography>
            <ul style={{ margin: 0, paddingLeft: '20px' }}>
              <li>Click the preview icon to see your form in action</li>
              <li>Test validation, field interactions, and form submission</li>
              <li>Form data is logged to console on submission</li>
              <li>Switch back to builder to make more changes</li>
            </ul>
          </Grid>
        </Grid>
      </Paper>
    </Box>
  );
};

export default DragDropFormBuilder;
