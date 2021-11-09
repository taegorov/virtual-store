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

// === === JSS styling taken from material-ui docs === === //
const useStyles = makeStyles({
  base: {
    width: '10em',
    color: 'white',
    background: 'linear-gradient(45deg, #000000 30%, #31364a 90%)',
    border: 0,
    borderRadius: 3,
    boxShadow: '0 3px 5px 2px rgba(255, 105, 135, .3)',
    padding: '0 10px',
    position: 'fixed',
    marginRight: '.5em',
    opacity: '0.9',

  },
  text: {
    textAlign: 'left',
    fontSize: '',
  },
  hideButton: {
    position: 'absolute',
    top: '16px',
    right: '10px',
    cursor: 'pointer',
  }
})


const SimpleCart = (props) => {
  const [showSimpleCart, setShowSimpleCart] = useState(false);
  const cart = useStyles();

  useEffect(() => {
    if (props.cart.cart.length > 0 && !showSimpleCart) {
      setShowSimpleCart(!showSimpleCart)
    }
  }, [props.cart.cart.length])

  if (showSimpleCart) {
    return (

      <Grid id="main-grid" container justifyContent="flex-end">
        <Card className={cart.base}>
          <CardContent className={cart.text}>

            <Typography>Cart:</Typography>
            <Typography className={cart.hideButton} onClick={() => setShowSimpleCart(!showSimpleCart)}>❌</Typography>
            {props.cart.cart.map((product, item) => {
              return (
                <div key={product.id} id="grid">

                  <Typography key={item}>
                    {product.name}
                  </Typography>
                  <IconButton id='delete-button' size='medium' onClick={() => props.removeFromCart(product)} >
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
