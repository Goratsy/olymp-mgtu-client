import * as React from 'react';
import Navbar from './components/navbar/Navbar';
import Banner from './components/banner/Banner';

import '@fontsource/roboto/300.css';
import '@fontsource/roboto/400.css';
import '@fontsource/roboto/500.css';
import '@fontsource/roboto/700.css';
import { Box } from '@mui/material';

function App() {
  return (
    <Box sx={{
      display: 'flex',
      flexDirection: "column",
      gap: "30px",
      pt: "30px",
      // Исправить отступы
    }}>
      <Navbar></Navbar>
      <Banner></Banner>
    </Box>
      
  );
}

export default App;
