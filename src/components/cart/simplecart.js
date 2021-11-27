import React, { useEffect, useState } from 'react';
import { connect } from 'react-redux';
import { Link, useLocation } from 'react-router-dom';
import _ from 'lodash';

import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import { makeStyles, Button } from '@material-ui/core';
// import DeleteTwoToneIcon from '@material-ui/icons/DeleteTwoTone';
import { removeFromCart } from '../../store/cart.js';
// import Snackbar from '@mui/material/Snackbar';

import './simplecart.css';
// import { CardActionArea } from '@material-ui/core';

// === === JSS styling === === //
const useStyles = makeStyles({
  // transition: {
  //   right: '.2em',
  // },
  container: {
    fontFamily: 'Inter',
    width: '12em',
    color: 'white',
    background: 'linear-gradient(45deg, #000000 30%, #2b2b2b 90%)',
    border: 'solid',
    borderColor: 'black',
    borderWidth: '.1em',
    borderRadius: 3,
    padding: '0 10px',
    position: 'fixed',
    marginRight: '.5em',
    transition: 'right .5s',
    // right: '-15em',
  },
  textContainer: {
    textAlign: 'left',
    padding: '0',
  },
  hideButton: {
    position: 'absolute',
    top: '12px',
    right: '12px',
    cursor: 'pointer',
    fontSize: '1em',
  },
  cartText: {
    // '&:focus, &:hover, &:visited, &:link, &:active': {
    //   textDecoration: 'none',
    // },
    textTransform: 'none',
    paddingLeft: '0',
    fontFamily: 'Inter',
    marginTop: '.5em',
    marginBottom: '.8em',
    color: 'white',
  },
  productName: {
    fontFamily: 'Inter',
    fontSize: '.8em',
    marginTop: '.4em',
  },
  deleteButton: {
    color: 'rgb(245, 145, 145)',
    maxHeight: '1.2em',
    position: 'absolute',
    right: '0px',
    marginRight: '.4em',
  }
})


const SimpleCart = (props) => {
  // 'result' will just be total qty
  // once props change, run 'result' function
  const result = Object.keys(props.cart.cart).reduce((acc, curr) => {
    return acc + props.cart.cart[curr].quantity
  }, null);


  const [showSimpleCart, setShowSimpleCart] = useState(false);
  const cart = useStyles();
  useEffect(() => {
    if (result > 0 && !showSimpleCart) {
      setShowSimpleCart(!showSimpleCart)
      hideComponent();
    }
    // eslint-disable-next-line
  }, [result])


  // timeout after X seconds
  const wait = ms => new Promise(resolve => setTimeout(resolve, ms));
  const hideComponent = async () => {
    await wait(5000);
    setShowSimpleCart(false);
  }


  const location = useLocation();
  // console.log('location', location)
  const isOnCartPage = location.pathname.includes('cart');
  // console.log(isOnCartPage);


  return (
    <Grid id="main-grid" container justifyContent="flex-end">
      <Card className={cart.container} style={{ right: showSimpleCart && isOnCartPage === false ? '.2em' : '-15em' }}>

        <CardContent className={cart.textContainer}>

          <Button component={Link} to={`/cart`} className={cart.cartText}> Cart ({result}) </Button>
          <Typography className={cart.hideButton} onClick={() => setShowSimpleCart(!showSimpleCart)}>X</Typography>
          {/* {props.cart.cart.map((product, item) => { */}

          {_.map(props.cart.cart, product => {
            // console.log('🎧 product!', product)
            return (
              <div key={product.id} id="grid">

                <Typography className={cart.productName}>{product.name}</Typography>
                <div className={cart.deleteButton} >
                  <Typography>
                    {product.quantity}
                  </Typography>
                </div>

              </div>
            )
          })}


        </CardContent>
      </Card>
    </Grid >

  )

  // } else {
  //   return null
  // }
}


const mapState = (state) => {
  return {
    cart: state.cart,
  }
}

const mapDispatch = {
  removeFromCart
}


export default connect(mapState, mapDispatch)(SimpleCart);
