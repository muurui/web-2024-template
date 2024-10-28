import React from 'react';
import { Paper, Typography, Box } from '@mui/material';

interface LogWindowProps {
  logs: string[];
}

const LogWindow: React.FC<LogWindowProps> = ({ logs }) => {
  return (
    <Paper
      sx={{
        position: 'fixed',
        top: 20,
        right: 20,
        width: 300,
        maxHeight: 300,
        overflowY: 'auto',
        padding: 2,
        zIndex: 1000,
        backgroundColor: 'rgba(255, 255, 255, 0.9)',
        borderRadius: '15px',
      }}
    >
      <Typography variant="h6" gutterBottom sx={{ fontWeight: 600 }}>
        Логи
      </Typography>
      {logs.map((log, index) => (
        <Box key={index} sx={{ mb: 1 }}>
          <Typography variant="body2">{log}</Typography>
        </Box>
      ))}
    </Paper>
  );
};

export default LogWindow;