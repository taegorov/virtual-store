import React from 'react';
import { connect } from 'react-redux';
// import { useSelector } from 'react-redux';

import ArrowBackIosTwoToneIcon from '@material-ui/icons/ArrowBackIosTwoTone';
import { Link } from 'react-router-dom';
import { List, ListItem, ListItemText, ListItemButton, ListItemAvatar, Avatar, Button, Typography } from '@mui/material';
import { makeStyles } from '@material-ui/core/styles';
import { removeFromCart, addToCart } from '../../store/cart.js';
import _ from 'lodash';



function ShoppingCart(props) {

  // let { cart } = useSelector(state => state.cart);
  // console.log('🥅', cart)
  // const sumTotal = props.cart.price && props.cart.value.reduce((val1, val2) => val1 + val2, 0)
  // console.log(props.cart.price)
  // console.log('💋 sumTotal', sumTotal);

  const useStyles = makeStyles({
    header: {
      fontFamily: 'Inter',
      fontSize: '2.5em',
      textAlign: 'center',
      margin: '.5em',
    },
    listContainer: {
      backgroundColor: 'white',
      margin: '0 auto !important',
      width: '80%',
    },
    rowContainer: {
      background: 'linear-gradient(45deg, #2e2e42 30%, #2b2b2b 90%)',
      border: 'solid',
      borderColor: 'white',
      borderWidth: '.3em',
      // color: 'white',
      // margin: '.2em',
      // textAlign: 'left',
      // maxWidth: '99%',
    },
    totalsContainer: {
      background: 'linear-gradient(45deg, #2e2e42 30%, #2b2b2b 90%)',
      border: 'solid',
      borderColor: 'white',
      borderWidth: '.3em',
      padding: '1em',
      // color: 'white',
      // margin: '.2em',
      // textAlign: 'left',
      // maxWidth: '99%',
    },
    serviceName: {
      fontFamily: 'Inter',
      fontSize: '1.5em',
      marginBottom: '.3em',
    },
    quantity: {
      fontFamily: 'Inter',
      fontSize: '1em',
      margin: '.5em',
      // border: 'solid',
      minWidth: '1.5em',
      textAlign: 'center',
    },
    // image: {
    //   height: 10,
    //   paddingTop: '100%',
    //   marginTop: '.5em',
    //   marginBottom: '.5em',
    //   borderRadius: 5,
    //   border: 'solid',
    //   borderColor: 'black',
    //   borderWidth: '.1em',
    // },
    listPrice: {
      fontFamily: 'Inter',
      width: '6em',
    },
    listQuantity: {
      fontFamily: 'Inter',
    },
    // cardCategory: {
    //   fontFamily: 'Inter',
    // },
    buttonsContainer: {
      backgroundColor: '#4287f5',
    },
    increaseButton: {
      textAlign: 'right',
      border: 'solid',
      backgroundColor: '#4287f5',
    },
    decreaseButton: {
      textAlign: 'right',
      border: 'solid',
      backgroundColor: '#4287f5',
    },
  });


  const shoppingCart = useStyles();

  const sumTotal = Object.keys(props.cart).reduce((acc, curr) => {
    console.log('props cart curr', props.cart[curr].price);
    return acc + props.cart[curr].price * props.cart[curr].quantity
  }, 0);

  return (
    <>

      <Button
        size="large"
        color="primary"
        variant="contained"
        startIcon={<ArrowBackIosTwoToneIcon />}
        component={Link} to={'/'}
      >
        Back to Store
      </Button>

      <h1 className={shoppingCart.header}>Your Cart</h1>

      <List className={shoppingCart.listContainer}>
        {_.map(props.cart, lineItem => { //uses Lodash to map over the entire cart, and the specific line item

          const lineItemTotal = lineItem.price * lineItem.quantity

          return (

            <div key={lineItem.id}>
              <ListItem className={shoppingCart.rowContainer} >
                <ListItemAvatar>
                  <Avatar src={lineItem.image} variant="square" />
                </ListItemAvatar>
                <ListItemText className={shoppingCart.serviceName} >
                  <p>
                    {lineItem.name}
                  </p>


                </ListItemText>
                <ListItemText className={shoppingCart.listPrice}>${lineItemTotal}</ListItemText>
                <div className={shoppingCart.increaseButton}>
                  <ListItemButton onClick={() => props.addToCart(lineItem)} >
                    +
                  </ListItemButton>
                </div>
                <p className={shoppingCart.quantity}>{lineItem.quantity}</p>

                <div className={shoppingCart.decreaseButton}>
                  <ListItemButton onClick={() => props.removeFromCart(lineItem)} >
                    −
                  </ListItemButton>
                </div>
              </ListItem>
            </div>
          )
        })}
        <Typography className={shoppingCart.totalsContainer}>Here is your total: ${sumTotal} </Typography>
      </List>
    </>
  )
}

const mapStateToProps = (state) => {
  return {
    cart: state.cart.cart, // makes it so you don't have to write .cart.cart above. Cart 1 is established in initialState
  }
}


const mapDispatch = {
  removeFromCart,
  addToCart
}

export default connect(mapStateToProps, mapDispatch)(ShoppingCart);