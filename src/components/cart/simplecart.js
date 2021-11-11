import React, { useEffect, useState } from 'react';
import { connect } from 'react-redux';

import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import { makeStyles, IconButton } from '@material-ui/core';
import DeleteTwoToneIcon from '@material-ui/icons/DeleteTwoTone';
import { removeFromCart } from '../../store/cart.js';

import './simplecart.css';

// === === JSS styling === === //
const useStyles = makeStyles({
  container: {
    fontFamily: 'Inter',
    width: '12em',
    color: 'white',
    background: 'linear-gradient(45deg, #000000 30%, #616161 90%)',
    borderRadius: 3,
    boxShadow: '0 3px 5px 2px rgba(255, 105, 135, .3)',
    padding: '0 10px',
    position: 'fixed',
    marginRight: '.5em',
    opacity: '0.9',
  },
  textContainer: {
    textAlign: 'left',
    padding: '0',
  },
  hideButton: {
    position: 'absolute',
    top: '8px',
    right: '8px',
    cursor: 'pointer',
  },
  cartText: {
    fontFamily: 'Inter',
    marginTop: '.5em',
    marginBottom: '.8em',
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
  }
})


const SimpleCart = (props) => {
  const [showSimpleCart, setShowSimpleCart] = useState(false);
  const cart = useStyles();

  useEffect(() => {
    if (props.cart.cart.length > 0 && !showSimpleCart) {
      setShowSimpleCart(!showSimpleCart)
    }
    // eslint-disable-next-line
  }, [props.cart.cart.length])

  if (showSimpleCart) {
    return (

      <Grid id="main-grid" container justifyContent="flex-end">
        <Card className={cart.container}>
          <CardContent className={cart.textContainer}>

            <Typography className={cart.cartText}>Cart ({props.cart.cart.length}) </Typography>
            <Typography className={cart.hideButton} onClick={() => setShowSimpleCart(!showSimpleCart)}>❌</Typography>
            {props.cart.cart.map((product, item) => {
              return (
                <div key={product.id} id="grid">

                  <Typography className={cart.productName}>{product.name}</Typography>
                  <IconButton className={cart.deleteButton} size='medium' onClick={() => props.removeFromCart(product)} >
                    <DeleteTwoToneIcon />
                  </IconButton>

                </div>
              )
            })}


          </CardContent>
        </Card>
      </Grid >

    )

  } else {
    return null

  }
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
