import React from 'react';
import { Typography, Toolbar, IconButton } from '@material-ui/core';
import MenuIcon from '@material-ui/icons/Menu';

import './header.css';


export default function Header(props) {
  return (
    <div id="header">
      {/* <AppBar position="static"> */}
      <Toolbar >

        <IconButton edge="start" aria-label="menu">
          <MenuIcon />
        </IconButton>
        <Typography variant="h4">😎 Le Epic Store 😎</Typography>

      </Toolbar>
      {/* </AppBar> */}
    </div>
  )
}
