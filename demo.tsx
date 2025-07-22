import React from 'react';
import { createRoot } from 'react-dom/client';
import { ThemeProvider, createTheme } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';
import { Container, Typography, Box, Tabs, Tab } from '@mui/material';
import BasicExample from './examples/BasicExample';
import AdvancedExample from './examples/AdvancedExample';

interface TabPanelProps {
  children?: React.ReactNode;
  index: number;
  value: number;
}

function TabPanel({ children, value, index }: TabPanelProps) {
  return (
    <div role="tabpanel" hidden={value !== index}>
      {value === index && <Box sx={{ p: 3 }}>{children}</Box>}
    </div>
  );
}

const theme = createTheme({
  palette: {
    primary: {
      main: '#1976d2',
    },
    secondary: {
      main: '#dc004e',
    },
  },
  typography: {
    h2: {
      marginBottom: '1rem',
    },
  },
});

function Demo() {
  const [tabValue, setTabValue] = React.useState(0);

  const handleTabChange = (event: React.SyntheticEvent, newValue: number) => {
    setTabValue(newValue);
  };

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <Container maxWidth="lg">
        <Box sx={{ py: 4 }}>
          <Typography variant="h2" component="h1" align="center" gutterBottom>
            React Dynamic Forms with Material-UI
          </Typography>
          
          <Typography variant="h6" align="center" color="textSecondary" paragraph>
            A powerful React library for creating dynamic forms with beautiful Material-UI components
          </Typography>

          <Box sx={{ borderBottom: 1, borderColor: 'divider', mb: 3 }}>
            <Tabs value={tabValue} onChange={handleTabChange} centered>
              <Tab label="Basic Example" />
              <Tab label="Advanced Example" />
            </Tabs>
          </Box>

          <TabPanel value={tabValue} index={0}>
            <Typography variant="h4" gutterBottom>
              Basic Contact Form
            </Typography>
            <Typography variant="body1" paragraph>
              A simple contact form demonstrating basic field types, validation, and form submission.
            </Typography>
            <BasicExample />
          </TabPanel>

          <TabPanel value={tabValue} index={1}>
            <Typography variant="h4" gutterBottom>
              Advanced Registration Form
            </Typography>
            <Typography variant="body1" paragraph>
              A comprehensive form showcasing all field types, sections, validation rules, and advanced features.
            </Typography>
            <AdvancedExample />
          </TabPanel>
        </Box>
      </Container>
    </ThemeProvider>
  );
}

const container = document.getElementById('root');
if (container) {
  const root = createRoot(container);
  root.render(<Demo />);
}
