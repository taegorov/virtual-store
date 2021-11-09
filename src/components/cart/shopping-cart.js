import React from 'react';
import { connect } from 'react-redux';
import { useSelector } from 'react-redux';
import { Button } from '@material-ui/core';
import ArrowBackIosTwoToneIcon from '@material-ui/icons/ArrowBackIosTwoTone';
import { Link } from 'react-router-dom';
// import { useParams } from 'react-router-dom';
import { Card, Grid } from '@material-ui/core';
import Typography from '@material-ui/core/Typography';


function ShoppingCart(props) {

  let { cart } = useSelector(state => state.cart);
  // console.log('🥅', products)

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

      <Typography>Product Detail</Typography>
      <Grid style={{ display: 'flex', justifyContent: 'center', flexWrap: 'wrap' }}>
        {cart.map(rendered => {
          return (
            <div key={rendered.id}>
              <Card style={{ margin: '1em', maxWidth: '15em', padding: '2em' }}>
                <Typography style={{ fontSize: 20 }}>
                  {rendered.name}
                </Typography>
                <Typography>${rendered.price}</Typography>
                <Typography>Freelancer ID: {rendered.freelancer}</Typography>
                <Typography>Category: {rendered.category}</Typography>
              </Card>
            </div>
          )
        })}
      </Grid>

    </>
  )
}

const mapStateToProps = (state) => {
  return {
    cart: state.cart,
  }
}

export default connect(mapStateToProps)(ShoppingCart);