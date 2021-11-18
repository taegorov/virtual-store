import React from 'react';
import { connect } from 'react-redux';
import { useSelector } from 'react-redux';

import ArrowBackIosTwoToneIcon from '@material-ui/icons/ArrowBackIosTwoTone';
import { Link } from 'react-router-dom';
import { List, ListItem, ListItemText, ListItemButton, ListItemAvatar, Avatar, Button } from '@mui/material';
import { makeStyles } from '@material-ui/core/styles';
// import DeleteTwoToneIcon from '@material-ui/icons/DeleteTwoTone';
// import DesignServicesIcon from '@mui/icons/DesignServices';
import { removeFromCart } from '../../store/cart.js';


function ShoppingCart(props) {

  let { cart } = useSelector(state => state.cart);
  // console.log('🥅', cart)

  const useStyles = makeStyles({
    header: {
      fontFamily: 'Inter',
      fontSize: '2.5em',
      textAlign: 'center',
      margin: '.5em',
      // backgroundColor: 'red',
    },
    listContainer: {
      backgroundColor: 'white',
      width: '80%',
      // maxWidth: '55em',
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
        {cart.map(rendered => {
          return (

            <div key={rendered.id}>
              {/* <Checkbox edge="end" /> */}
              <ListItem className={shoppingCart.rowContainer} >
                <ListItemAvatar>
                  <Avatar
                    variant="square"
                    src={rendered.image}
                  >
                  </Avatar>
                </ListItemAvatar>
                <ListItemText className={shoppingCart.serviceName} >
                  {rendered.name} ({rendered.name.length})
                  {/* replace rendered.name.length with quantity */}
                </ListItemText>
                <ListItemText className={shoppingCart.listPrice}>${rendered.price * rendered.name.length}</ListItemText>
                <div className={shoppingCart.buttonsContainer}>
                  <ListItemButton className={shoppingCart.deleteButton} onClick={() => props.removeFromCart(rendered)} >
                    Remove
                    {/* <DeleteTwoToneIcon /> */}
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
    cart: state.cart,
  }
}


const mapDispatch = {
  removeFromCart
}

export default connect(mapStateToProps, mapDispatch)(ShoppingCart);