// Footer.jsx

import React from 'react';
import { AppBar, Toolbar, Typography } from '@mui/material';

const Footer = () => {
  return (
    <AppBar position="static" className="footer" style={{backgroundColor:"#037c47"}}>
      <Toolbar>
        <Typography variant="body1" className="text">
          &copy; {new Date().getFullYear()} Payment processor v-1.0
        </Typography>
      </Toolbar>
    </AppBar>
  );
};

export default Footer;