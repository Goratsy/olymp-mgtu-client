import React, { createContext, useContext, useEffect, useState } from 'react';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import Navbar from './components/navbar/Navbar';
import Banner from './components/banner/Banner';
import { Box, Button, TextField } from '@mui/material';
import Filters from './components/filters/Filters';
import Catalog from './components/catalog/Catalog';

import '@fontsource/roboto/300.css';
import '@fontsource/roboto/400.css';
import '@fontsource/roboto/500.css';
import '@fontsource/roboto/700.css';
import './App.css'

const ArrayContext = createContext();
const InfoSolutionContext = createContext();

const theme = createTheme({
  palette: {
    primary: {
      main: '#000',
    },

    secondary: {
      main: '#8573b6',
      white: '#ffffff',
      black: '#000000',
      grey_surface: '#49454F'
    },

    violet: {
      dark: '#483872',
      dark_light: '#8573b6',
      main: '#6750A4',
      light_dark: '#E3DDE4',
      light: '#FEF7FF',
      title: '#B0A7C0',
    },
    grey: {
      light: '#EADDFF',
      main: '#79747E',
      dark: '#49454F',
    },
    black: {
      dark: '#000000',
      main: '#1D1B20',
      light: '#322F35'
    },
    white: {
      light: '#ffffff',
      main: '#fff'
    }
  },

  typography: {
    body: {
      large: {
        fontFamily: 'Roboto, sans-serif',
        fontSize: '16px',
        fontWeight: '400',
      },
      main: {
        fontFamily: 'Roboto, sans-serif',
        fontSize: '14px',
        fontWeight: '400',
        lineHeight: '20px'
      },
    },
    label: {
      large: {
        fontFamily: 'Roboto, sans-serif',
        fontSize: '14px',
        fontWeight: '500',
      },
      main: {
        fontFamily: 'Roboto, sans-serif',
        fontSize: '12px',
        fontWeight: '500',
      }
    },
    titles: {
      h1: {
        fontFamily: 'Pobeda',
        fontWeight:'bold', 
        fontSize: '80px'
      },
      medium: {
        fontFamily: 'Roboto, sans-serif',
        fontSize: '16px',
        fontWeight: '500',
      },
      subtitle1: {
        fontFamily: 'Roboto, sans-serif',
        fontSize: '28px',
        fontWeight: '500',
      }
    },
    
  },
});

function App() {
  let [contextArrayTasks, setContextArrayTasks] = useState([]);
  let [numberOfPage, setNumberOfPage] = useState(0);
  let [page, setPage] = useState(1);

  let [answerValue, setAnswerValue] = useState('');
  let [isHideAnswer, setIsHideAnswer] = useState(true);

  function uploadFile() {
    const fileInput = document.getElementById('fileInput');
    const file = fileInput.files[0];

    const formData = new FormData();
    formData.append('file', file);

    fetch('/upload', {
        method: 'POST',
        body: formData
    })
      .then(response => {
          if (!response.ok) {
              throw new Error(`Ошибка! Код http-ответа: ${response.status}`);
          }
          return response.json();
      })
      .then(data => {
          console.log('Файл успешно загружен:', data);
      })
      .catch(error => {
          console.error('Ошибка:', error);
      });
    }


  return (
    <ThemeProvider theme={theme}>
      <ArrayContext.Provider value={{contextArrayTasks, setContextArrayTasks, numberOfPage, setNumberOfPage, page, setPage}}>
        <InfoSolutionContext.Provider value={{answerValue, setAnswerValue, isHideAnswer, setIsHideAnswer}}>
            <Box sx={{
              pt: "12px",
              pb: '12px'
            }}>
              <Navbar></Navbar>
              <Banner></Banner>
              
              <TextField type="file" id="fileInput"></TextField>
              <Button variant='succes' onClick={uploadFile} accept=".py">Отправить файлы</Button>
            <Box>
              <Filters></Filters>
              <Catalog></Catalog>
            </Box>
          </Box>
        </InfoSolutionContext.Provider>
      </ArrayContext.Provider>
    </ThemeProvider>
      
  );
}

export default App;
export const useArrayContext = () => useContext(ArrayContext);
export const useInfoSolutionContext = () => useContext(InfoSolutionContext);