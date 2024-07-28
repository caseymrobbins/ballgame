// src/components/Footer.tsx
import React from 'react';
import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';

const Footer: React.FC = () => {
  return (
    <AppBar position="static" color="primary">
      <Toolbar>
        <Typography variant="body1" style={{ flexGrow: 1 }}>
          © 2024 College Ball
        </Typography>
      </Toolbar>
    </AppBar>
  );
};

export default Footer;
