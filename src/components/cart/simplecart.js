import React from 'react';

import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import { connect } from 'react-redux';
import { makeStyles } from '@material-ui/core';


// === === JSS styling taken from material-ui docs === === //
const useStyles = makeStyles({
  base: {
    width: '7em',
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

      <Grid container justify="flex-end">
        <Card alignContent='center' className={cart.base}>
          <CardContent>
            <p>Cart:</p>
            {props.cart.cart.map((product, item) => {
              return (
                <Typography key={item}>
                  {product.name}
                </Typography>
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


export default connect(mapState)(SimpleCart);
