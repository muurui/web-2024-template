import React, { useState } from 'react';
import { Container, Typography, CssBaseline, ThemeProvider, createTheme, Box } from '@mui/material';
import ImageProcessor from './components/ImageProcessor';
import LogWindow from './components/LogWindow';
import './App.css'; // Добавьте эту строку

const theme = createTheme({
  typography: {
    fontFamily: '"Poppins", "Roboto", "Helvetica", "Arial", sans-serif',
    h2: {
      fontWeight: 700,
    },
  },
  components: {
    MuiButton: {
      styleOverrides: {
        root: {
          borderRadius: 30,
          padding: '10px 20px',
          background: 'linear-gradient(45deg, #FE6B8B 30%, #FF8E53 90%)',
          border: 0,
          color: 'white',
          height: 48,
          boxShadow: '0 3px 5px 2px rgba(255, 105, 135, .3)',
          '&:hover': {
            background: 'linear-gradient(45deg, #FE8B8B 30%, #FF9E53 90%)',
          },
        },
      },
    },
  },
});

function App() {
  const [logs, setLogs] = useState<string[]>([]);

  const addLog = (message: string) => {
    setLogs((prevLogs) => [...prevLogs, `${new Date().toLocaleTimeString()}: ${message}`]);
  };

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <Box className="animated-bg">
        <Container maxWidth="md" sx={{ position: 'relative', zIndex: 1 }}>
          <Typography variant="h2" component="h1" gutterBottom align="center" sx={{ mt: 4, color: 'white' }}>
            Обработка изображений
          </Typography>
          <ImageProcessor addLog={addLog} />
          <LogWindow logs={logs} />
        </Container>
      </Box>
    </ThemeProvider>
  );
}

export default App;