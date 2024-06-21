// Header.jsx
import React from 'react';
import { AppBar, Toolbar, Typography } from '@mui/material';

const Header = () => {
  return (
    <AppBar position="static" className="appBar" style={{backgroundColor:"#037c47"}}>
      <Toolbar>
        <Typography variant="h6" className="title">
        Finalize payment
        </Typography>
        {/* You can add additional components like buttons or icons here */}
      </Toolbar>
    </AppBar>
  );
};

export default Header;