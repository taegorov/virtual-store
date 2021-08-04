import React from 'react';
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
  }
})


const SimpleCart = (props) => {
  const cart = useStyles();

  if (props.cart.cart.length > 0) {
    return (

      <Grid id="main-grid" container justify="flex-end">
        <Card alignContent='center' className={cart.base}>
          <CardContent >

            <p>Cart:</p>
            {props.cart.cart.map((product, item) => {
              return (
                <div id="grid">

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
      </Grid>

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
