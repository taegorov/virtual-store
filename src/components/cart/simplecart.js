import React, { useEffect, useState } from 'react';
import { connect } from 'react-redux';
import { Link, useLocation } from 'react-router-dom';
import _ from 'lodash';

import Card from '@material-ui/core/Card';
import CardMedia from '@material-ui/core/CardMedia';
import CardContent from '@material-ui/core/CardContent';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import { makeStyles, Button, IconButton } from '@material-ui/core';
import ArrowDropUpIcon from '@mui/icons-material/ArrowDropUp';
import ArrowDropDownIcon from '@mui/icons-material/ArrowDropDown';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import CloseIcon from '@mui/icons-material/Close';
// import DeleteTwoToneIcon from '@material-ui/icons/DeleteTwoTone';
import { removeFromCart, addToCart } from '../../store/cart.js';
// import Snackbar from '@mui/material/Snackbar';

import './simplecart.css';
// import { borderRadius } from '@mui/system';
// import { CardActionArea } from '@material-ui/core';

// === === JSS styling === === //
const useStyles = makeStyles({
  // transition: {
  //   right: '.2em',
  // },
  grid: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'flex-start',
    alignItems: 'center',
    borderBottom: 'solid 1px #c1d9ed',
  },
  container: {
    fontFamily: 'Inter',
    width: '20em',
    color: 'black',
    // background: 'linear-gradient(45deg, #1d212e 30%, #2b2b2b 90%)',
    backgroundColor: 'white',
    // border: 'solid',
    // borderColor: 'black',
    // borderWidth: '.1em',
    // borderRadius: 3,
    position: 'fixed',
    marginRight: '.5em',
    transition: 'right .5s', // this transitions the simple cart from right to left and back again
    // right: '-15em',
    boxShadow: '0 0 15px rgba(0, 0, 0, 0.5)',
    overflow: 'visible'
  },
  scroller: {
    maxHeight: '20em',
    overflow: 'scroll',
  },
  textContainer: {
    textAlign: 'left',
    padding: '0 16px',
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
    fontFamily: 'Inter',
    margin: 0,
    paddingLeft: '.5em',
    // marginTop: '.5em',
    // marginBottom: '.8em',
    // position: 'absolute',
    // top: '-55px',
    // backgroundColor: '#729ec4',
    // padding: '.5em',
    // color: 'white',
    // borderRadius: '5px',
    // display: 'flex',
    // alignItems: 'center',
  },
  productImage: {
    minHeight: '4em',
    // paddingTop: '100%',
    minWidth: '4em',
  },
  productName: {
    fontWeight: 'bold',
    fontFamily: 'Inter',
    fontSize: '.9em',
    margin: 0,
    // marginTop: '.4em',
    display: "-webkit-box",
    boxOrient: "vertical",
    lineClamp: 2,
    // wordBreak: "break-all",
    overflow: "hidden",
  },
  productCategory: {
    fontFamily: 'Inter',
    // fontStyle: 'italic',
    fontSize: '.7em',
    margin: 0,
    // marginTop: '.4em',
  },
  productPrice: {
    fontFamily: 'Inter',
    fontSize: '.8em',
    margin: 0,
    // marginTop: '.4em',
  },
  quantitySelector: {
    fontFamily: 'Inter',
    display: 'flex',
    // right: '10px',
    justifyContent: 'flex-end',
    alignContent: 'center',
    alignItems: 'center',
  },
  productQuantity: {
    fontSize: '.8em',
    fontFamily: 'Inter',
    // color: 'rgb(245, 145, 145)',
    // maxHeight: '1.2em',
    // position: 'absolute',
    // right: '10px',
    // marginRight: '.4em',
  },
  productDetails: {
    // backgroundColor: 'yellow',
    padding: '1em',
    width: '100%',
  },
  priceAndQty: {
    // backgroundColor: 'red',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
    width: '100%',
    maxWidth: '80%',
  },
  checkoutButton: {
    backgroundColor: '#729ec4',
    color: 'white',
    borderRadius: 0,
    borderBottomRightRadius: '4px',
    borderBottomLeftRadius: '4px',
    width: '100%',
    padding: '1em 0 .7em'
  },
  totalPrice: {
    padding: '1em 0',
    fontSize: '1.1em',
    color: '#729ec4',
    display: 'flex',
    justifyContent: 'space-between',
    '& p': {
      fontFamily: 'Inter',
      fontWeight: 'bold',
      margin: 0,
    }
  }
})


const SimpleCart = (props) => {
  // 'result' will just be total qty
  // once props change, run 'result' function
  const result = Object.keys(props.cart).reduce((acc, curr) => {
    return acc + props.cart[curr].quantity
  }, null);


  const [showSimpleCart, setShowSimpleCart] = useState(false); // SET THIS BACK TO FALSE
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

  const productImage = (image) => {
    if (!image) {
      return 'https://images.unsplash.com/photo-1581922814484-0b48460b7010?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=880&q=80';
    }
    return image
  }

  const sumTotal = Object.keys(props.cart).reduce((acc, curr) => {
    console.log('tasty curry', curr);
    console.log('props dot cart', props.cart[curr]);
    console.log('props dot cart curr', props.cart[curr]);
    console.log('props dot cart curr PRICE', props.cart[curr].price);
    return acc + props.cart[curr].price * props.cart[curr].quantity
  }, 0);

  return (
    <Grid id="main-grid" container justifyContent="flex-end">
      <Card className={cart.container} style={{ right: showSimpleCart && isOnCartPage === false ? '.2em' : '-22em' }}>

        <div style={{ position: 'relative' }}>
          <div style={{
            position: 'absolute',
            top: '-55px',
            backgroundColor: '#729ec4',
            color: 'white',
            borderRadius: '5px',
            display: 'flex',
            alignItems: 'center',
            padding: '.5em',
          }}>
            <ShoppingCartIcon />
            <p
              component={Link}
              to={`/cart`}
              className={cart.cartText}>
              {result} Items
            </p>
            <div style={{
              position: 'absolute',
              right: '5px',
              bottom: '-6px',
              backgroundColor: '#729ec4',
              width: '30px',
              height: '30px',
              borderRadius: '5px',
              transform: 'rotate(-45deg)',
              zIndex: '-1',
            }}></div>
          </div>
        </div>

        <CardContent className={cart.textContainer}>
          <Typography className={cart.hideButton} onClick={() => setShowSimpleCart(!showSimpleCart)}>
            <CloseIcon />
          </Typography>
          {/* {props.cart.cart.map((product, item) => { */}
          <div className={cart.scroller}>
            {_.map(props.cart, product => {
              // console.log('🎧 product!', product)
              return (
                <div key={product.id} className={cart.grid}>
                  <CardMedia
                    image={productImage(product.image)}
                    className={cart.productImage}
                  />
                  <div className={cart.productDetails}>
                    <p className={cart.productName}>{product.name}</p>
                    <p className={cart.productCategory}>{product.category}</p>
                    <div className={cart.priceAndQty}>
                      <p className={cart.productPrice}>${product.price}</p>
                      <div className={cart.quantitySelector}>
                        <IconButton disabled={!product.quantity} onClick={() => props.removeFromCart(product)} >
                          <ArrowDropDownIcon style={{ color: '#729ec4' }} />
                        </IconButton>
                        <p className={cart.productQuantity}> {product.quantity} </p>
                        <IconButton onClick={() => props.addToCart(product)} >
                          <ArrowDropUpIcon style={{ color: '#729ec4' }} />
                        </IconButton>
                      </div>
                    </div>
                  </div>
                </div>
              )
            })}
          </div>
          <div className={cart.totalPrice}>
            <p>Total: </p>
            <p>${sumTotal}</p>
          </div>
        </CardContent>
        <Button className={cart.checkoutButton} component={Link} to={`/cart`}>Checkout</Button>
      </Card>
    </Grid >
  )


  // } else {
  //   return null
  // }
}


const mapState = (state) => {
  return {
    cart: state.cart.cart,
  }
}

const mapDispatch = {
  removeFromCart,
  addToCart
}


export default connect(mapState, mapDispatch)(SimpleCart);
