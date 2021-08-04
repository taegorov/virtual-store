import React from 'react';
import { connect } from 'react-redux';

import { Typography, Toolbar, IconButton, Grid, Button } from '@material-ui/core';
import MenuIcon from '@material-ui/icons/Menu';
import ShoppingCartIcon from '@material-ui/icons/ShoppingCart';
import { StylesProvider } from '@material-ui/styles';

import './header.css';



function Header(props) {

  return (
    <div id="header">
      {/* <AppBar position="static"> */}
      <Toolbar>
        <Grid container justify="space-between" alignItems="center">

          <IconButton edge="start" aria-label="menu">
            <MenuIcon id="nav-button" />
          </IconButton>
          <Typography variant="h3">😎 Le Epic Store 😎</Typography>
          <Grid className={StylesProvider.button}>
            <Button align-content="right" id="nav-button">
              <ShoppingCartIcon /> Cart Items: {props.cart.cart.length}
            </Button>
          </Grid>

        </Grid>
      </Toolbar>
      {/* </AppBar> */}
    </div>
  )
}

const mapStateToProps = (state) => {
  return {
    cart: state.cart,
  }
}

export default connect(mapStateToProps)(Header);
