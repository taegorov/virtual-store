import React, { useEffect, useState } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import { useLocation } from 'react-router';
import { Typography, Toolbar, IconButton, Grid, Button, makeStyles } from '@material-ui/core';
import { Spin as Hamburger } from 'hamburger-react'
// import MenuIcon from '@material-ui/icons/Menu';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import { StylesProvider } from '@material-ui/styles';
import './header.css';



const useStyles = makeStyles({
  text: {
    fontFamily: 'Ceviche One',
    fontSize: '8em',
  },
  cart: {
    fontFamily: 'Mukta',
    padding: '0em',
    minWidth: '5em',
    color: 'white',
    fontSize: '1.2em',
    // -webkit-text-stroke: .5px black;
    textDecoration: 'none',
    marginLeft: '0em',
    textTransform: 'capitalize',
  },
  cartLogo: {
    marginRight: '0em',
    backgroundColor: 'red',
  }
})

function Header(props) {

  // Reduce method below. reduces several values to a single value. Below we are reducing the *quantity* number to a single value by adding each array "item" together
  const result = Object.keys(props.cart).reduce((acc, curr) => {
    // console.log(acc, curr, props.cart[curr])
    return acc + props.cart[curr].quantity
  }, null);


  // === menu bar functionality below (credit to Material-UI Docs)=== //
  const [anchorEl, setAnchorEl] = React.useState(null);
  const open = Boolean(anchorEl);

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };


  // === hamburger functionality, credit to Hamburger-React docs) === //
  const [isOpen, setOpen] = useState(false)


  // hamburger resets when navigating to new page //
  let location = useLocation();
  useEffect(() => {
    // console.log('location pathname', location.pathname)
    if (location.pathname) {
      setOpen(false)
    }
  }, [location.pathname]);


  const header = useStyles();

  return (
    <div id="header">
      {/* <AppBar position="static"> */}
      <Toolbar>
        <Grid container justifyContent="space-between" alignItems="center">

          <IconButton
            edge="start"
            aria-label="menu"
            id="basic-button"
            aria-controls="basic-menu"
            aria-haspopup="true"
            aria-expanded={open ? 'true' : undefined}
            onClick={handleClick}
          >
            <Hamburger
              id="nav-button"
              toggled={isOpen}
              toggle={setOpen}
              size={25}
            />

          </IconButton>

          <Menu
            id="basic-menu"
            anchorEl={anchorEl}
            open={open}
            onClose={handleClose}
            MenuListProps={{
              'aria-labelledby': 'basic-button',
            }}
          >
            <MenuItem component={Link} to={'/'} onClick={handleClose} >Home</MenuItem>
            <MenuItem component={Link} to={'/profile'} onClick={handleClose} >Profile</MenuItem>
            <MenuItem component={Link} to={'/cart'} onClick={handleClose} >Cart</MenuItem>
          </Menu>

          <Typography className={header.text} variant="h3"> Nile </Typography>
          <Grid className={StylesProvider.button}>
            {/* <NavLink id="cart" to="/cart"> Cart: {props.cart.cart.length} </NavLink> */}
            {/* <Button align-content="right" id="nav-button"> */}
            {/* <ShoppingCartTwoToneIcon fontSize="small" className={header.cartLogo} /> */}
            <Button className={header.cart} component={Link} to={`/cart`}> Cart ({result || 0})
            </Button>
            {/* </Button> */}
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
