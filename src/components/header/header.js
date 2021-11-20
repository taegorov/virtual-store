import React from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';

import { Typography, Toolbar, IconButton, Grid, Button, makeStyles } from '@material-ui/core';
import MenuIcon from '@material-ui/icons/Menu';
// import ShoppingCartIcon from '@material-ui/icons/ShoppingCart';
import ShoppingCartTwoToneIcon from '@material-ui/icons/ShoppingCartTwoTone';
import { StylesProvider } from '@material-ui/styles';
import './header.css';
// import { LineWeightTwoTone } from '@material-ui/icons';


const useStyles = makeStyles({
  text: {
    fontFamily: 'Ceviche One',
    fontSize: '8em',
  },
})

function Header(props) {

  // Reduce method below. reduces several values to a single value. Below we are reducing the *quantity* number to a single value by adding each array "item" together
  const result = Object.keys(props.cart).reduce((acc, curr) => {
    // console.log(acc, curr, props.cart[curr])
    return acc + props.cart[curr].quantity
  }, null);

  // console.log('result', result)

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
            {/* <NavLink id="cart" to="/cart"> Cart: {props.cart.cart.length} </NavLink> */}

            <Button align-content="right" id="nav-button">
              <ShoppingCartTwoToneIcon fontSize="small" />
              <Button id="cart" component={Link} to={`/cart`}> Cart: {result}
              </Button>
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
    cart: state.cart.cart,
  }
}

export default connect(mapStateToProps)(Header);
