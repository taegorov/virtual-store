import React from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';

import { Typography, Toolbar, IconButton, Grid, Button, makeStyles } from '@material-ui/core';
import MenuIcon from '@material-ui/icons/Menu';
// import ShoppingCartIcon from '@material-ui/icons/ShoppingCart';
import ShoppingCartTwoToneIcon from '@material-ui/icons/ShoppingCartTwoTone';
import { StylesProvider } from '@material-ui/styles';

import './header.css';


const useStyles = makeStyles({
  text: {
    fontFamily: 'Ceviche One',
    fontSize: '8em',
  },
})



function Header(props) {
  const header = useStyles();
  return (
    <div id="header">
      {/* <AppBar position="static"> */}
      <Toolbar>
        <Grid container justifyContent="space-between" alignItems="center">

          <IconButton edge="start" aria-label="menu">
            <MenuIcon id="nav-button" />
          </IconButton>
          <Typography className={header.text} variant="h3"> Nile </Typography>
          <Grid className={StylesProvider.button}>
            <Button align-content="right" id="nav-button">
              <ShoppingCartTwoToneIcon fontSize="small" />
              {/* <NavLink id="cart" to="/cart"> Cart: {props.cart.cart.length} </NavLink> */}
              <Button id="cart" component={Link} to={`/cart`}> Cart: {props.cart.cart.length} </Button>
            </Button>
          </Grid>

        </Grid>
      </Toolbar>
      {/* </AppBar> */}
    </div >
  )
}

const mapStateToProps = (state) => {
  return {
    cart: state.cart,
  }
}

export default connect(mapStateToProps)(Header);
