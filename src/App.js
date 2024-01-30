import * as React from 'react';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import Navbar from './components/navbar/Navbar';
import Banner from './components/banner/Banner';

import '@fontsource/roboto/300.css';
import '@fontsource/roboto/400.css';
import '@fontsource/roboto/500.css';
import '@fontsource/roboto/700.css';
import { Box } from '@mui/material';
import Filters from './components/filters/Filters';
import Catalog from './components/catalog/Catalog';

const theme = createTheme({
  palette: {
    primary: {
      main: '#ffffff',
      violet_dark: '#483872',
      violet_main: '#6750A4',
      violet_light: '#8573b6',
      violet_bgCard: '#FEF7FF',
      violet_subtitle1: '#B0A7C0',
    },
    secondary: {
      main: '#fffff',
      white: '#ffffff',
      black: '#000000',
      grey_surface: '#49454F'
    },
  },
  typography: {
    fontFamily: 'Roboto, sans-serif',
  },
});

function App() {
  return (
    <ThemeProvider theme={theme}>
      <Box sx={{
        pt: "12px",
        pb: '12px'
      }}>
        <Navbar></Navbar>
        <Banner></Banner>
        <Box>
          <Filters></Filters>
          <Catalog></Catalog>
        </Box>
      </Box>
    </ThemeProvider>
      
  );
}

export default App;
