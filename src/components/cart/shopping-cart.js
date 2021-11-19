import React from 'react';
import { connect } from 'react-redux';
// import { useSelector } from 'react-redux';

import ArrowBackIosTwoToneIcon from '@material-ui/icons/ArrowBackIosTwoTone';
import { Link } from 'react-router-dom';
import { List, ListItem, ListItemText, ListItemButton, ListItemAvatar, Avatar, Button } from '@mui/material';
import { makeStyles } from '@material-ui/core/styles';
import { removeFromCart, addToCart } from '../../store/cart.js';
import _ from 'lodash';



function ShoppingCart(props) {

  // let { cart } = useSelector(state => state.cart);
  // console.log('🥅', cart)

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
      borderColor: 'black',
      borderWidth: '.1em',
      color: 'white',
      margin: '.2em',
      textAlign: 'left',
      maxWidth: '99%',
    },
    serviceName: {
      fontFamily: 'Inter',
      fontSize: '1.5em',
      marginBottom: '.3em',
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
      // position: 'absolute',
      backgroundColor: 'brown',
    },
    deleteButton: {
      fontFamily: 'Inter',
      textAlign: 'right',
      backgroundColor: 'red',
    },
  });

  const shoppingCart = useStyles();
  // const initial = cart.name.shift().charAt(0)


  // const grouped = _.groupBy(cart, 'id');
  // console.log('groupby 🔥', grouped);
  // const lineItems = _.map(grouped, singleItem => {
  //   console.log('item 🤦🏼‍♂️', singleItem);
  //   return {
  //     ...singleItem[0],
  //     quantity: singleItem.length,
  //   }
  //   // return item
  // })
  // console.log('myproduct 🎊', lineItems);
  // const cartGroups = _.map(grouped[rendered.id], item => {
  //   console.log('item 💀', item);
  // })


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
        {_.map(props.cart, lineItem => {
          // const lineItem = Object.values(singleItem)
          // console.log('props.cart.cart', props.cart.cart);
          // console.log('singleItem', singleItem);
          // console.log('lineItem', lineItem);
          return (
            <div key={lineItem.id}>
              <ListItem className={shoppingCart.rowContainer} >
                <ListItemAvatar>
                  <Avatar src={lineItem.image} variant="square" />
                </ListItemAvatar>
                <ListItemText className={shoppingCart.serviceName} >
                  <p>
                    {lineItem.name} ({lineItem.quantity})
                  </p>


                </ListItemText>
                <ListItemText className={shoppingCart.listPrice}>${lineItem.price * lineItem.quantity}</ListItemText>
                <div className={shoppingCart.buttonsContainer}>
                  <ListItemButton className={shoppingCart.deleteButton} onClick={() => props.addToCart(lineItem)} >
                    ➕
                  </ListItemButton>
                  <ListItemButton className={shoppingCart.deleteButton} onClick={() => props.removeFromCart(lineItem)} >
                    ➖
                  </ListItemButton>
                </div>
              </ListItem>
            </div>
          )
        })}
      </List>

    </>
  )
}

const mapStateToProps = (state) => {
  return {
    cart: state.cart.cart,
  }
}


const mapDispatch = {
  removeFromCart,
  addToCart
}

export default connect(mapStateToProps, mapDispatch)(ShoppingCart);