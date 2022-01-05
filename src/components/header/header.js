import React, { useState } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import { Typography, IconButton, Grid, Button, makeStyles } from '@material-ui/core';
import { Spin as Hamburger } from 'hamburger-react'
// import MenuIcon from '@material-ui/icons/Menu';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import { StylesProvider } from '@material-ui/styles';
import './header.css';



const useStyles = makeStyles({
  container: {
    display: 'flex',
    backgroundImage: `url(${'https://i.imgur.com/GCJRhiA.png'})`,
    backgroundPosition: 'center',
    backgroundSize: '100%',
    justifyContent: 'space-between',
    alignItems: 'center',
    alignContent: 'space-between',
    marginBottom: '1em',

  },
  text: {
    fontFamily: 'Ceviche One',
    fontSize: '8em',
    lineHeight: '1em',
  },
  cart: {
    fontFamily: 'Inter',
    padding: '0em',
    minWidth: '5em',
    color: 'white',
    fontSize: '1.2em',
    textDecoration: 'none',
    textTransform: 'capitalize',
  },
  leftDiv: {
    flex: 1,
    // backgroundColor: 'red',
  },
  centerDiv: {
    // backgroundColor: 'green',
  },
  rightDiv: {
    // backgroundColor: 'blue',
    flex: 1,
    display: 'flex',
    justifyContent: 'flex-end',
  },
  menu: {
    "& .MuiMenu-list": {
      fontFamily: 'Inter',
      background: 'linear-gradient(45deg, #1d212e 30%, #2b2b2b 90%)',
      // border: 'solid',
      // borderColor: 'black',
      // borderWidth: '.1em',
      borderRadius: 3,
      color: 'white',
      padding: '1em',
      // transition: 'right .5s',

    }
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
    setOpen(false); // makes Hamburger toggle closed
  };


  // === hamburger functionality, credit to Hamburger-React docs) === //
  const [isOpen, setOpen] = useState(false)


  const header = useStyles();

  return (
    <div className={header.container}>
      {/* <Grid container justifyContent="space-between" alignItems="center"> */}
      <div className={header.leftDiv}>
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
          className={header.menu}
          anchorEl={anchorEl}
          open={open}
          onClose={handleClose}
          MenuListProps={{
            'aria-labelledby': 'basic-button',
          }}
        >
          <MenuItem component={Link} to={'/'} onClick={handleClose} >Home</MenuItem>
          <MenuItem component={Link} to={'/profile'} onClick={handleClose} >Profile</MenuItem>
          <MenuItem component={Link} to={'/signup'} onClick={handleClose} >Signup</MenuItem>
          <MenuItem component={Link} to={'/cart'} onClick={handleClose} >Cart</MenuItem>

        </Menu>
      </div>

      <div className={header.centerDiv}>
        <Typography className={header.text} variant="h3"> Nile </Typography>

      </div>

      <div className={header.rightDiv}>
        <Grid className={StylesProvider.button} >

          <Button className={header.cart} component={Link} to={`/cart`}> Cart ({result || 0})
          </Button>
        </Grid>
      </div>
      {/* </Grid> */}
    </div >
  )
}

const mapStateToProps = (state) => {
  return {
    cart: state.cart.cart,
  }
}

export default connect(mapStateToProps)(Header);
