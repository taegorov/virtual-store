import React from 'react';
import { connect } from 'react-redux';
import { useSelector } from 'react-redux';
import { Button } from '@material-ui/core';
import ArrowBackIosTwoToneIcon from '@material-ui/icons/ArrowBackIosTwoTone';
import { Link } from 'react-router-dom';
// import { useParams } from 'react-router-dom';
import { Card, Grid, CardActions } from '@material-ui/core';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';
// import DeleteTwoToneIcon from '@material-ui/icons/DeleteTwoTone';
import { removeFromCart } from '../../store/cart.js';


function ShoppingCart(props) {

  let { cart } = useSelector(state => state.cart);
  // console.log('🥅', products)

  const useStyles = makeStyles({
    header: {
      fontFamily: 'Inter',
      fontSize: '2.5em',
      textAlign: 'center',
    },
    grid: {
      display: 'flex',
      justifyContent: 'center',
      flexWrap: 'wrap',
    },
    cardContainer: {
      background: 'linear-gradient(45deg, #2e2e42 30%, #2b2b2b 90%)',
      border: 'solid',
      borderColor: 'black',
      borderWidth: '.1em',
      margin: '1em',
      maxWidth: '15em',
      height: '15em',
      width: '15em',
      padding: '2em',
      color: 'white',
    },
    cardName: {
      fontFamily: 'Inter',
      fontSize: '1.5em',
      textAlign: 'center',
      marginBottom: '.3em',
    },
    image: {
      height: 10,
      paddingTop: '100%',
      marginTop: '.5em',
      marginBottom: '.5em',
      borderRadius: 5,
      border: 'solid',
      borderColor: 'black',
      borderWidth: '.1em',
    },
    cardPrice: {
      fontFamily: 'Inter',
    },
    cardFreelancer: {
      fontFamily: 'Inter',
    },
    cardCategory: {
      fontFamily: 'Inter',
    },
    buttonsContainer: {
      // justifyContent: 'center',
      // position: 'absolute',
      // backgroundColor: 'red',
    },
    deleteButton: {
      color: 'rgb(245, 145, 145)',
      border: 'solid',
      margin: '0 auto',
      left: 0,
      right: 0,
      top: '2em',
    },
  });

  const shoppingCart = useStyles();

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

      <Typography className={shoppingCart.header}>Your Cart</Typography>
      <Grid className={shoppingCart.grid}>
        {cart.map(rendered => {
          return (
            <div key={rendered.id}>
              <Card className={shoppingCart.cardContainer} >

                <Typography className={shoppingCart.cardName}>
                  {rendered.name}
                </Typography>
                {/* <CardMedia
                  image={rendered.image}
                  className={shoppingCart.image}
                /> */}
                <Typography className={shoppingCart.cardPrice}>${rendered.price}</Typography>
                <Typography className={shoppingCart.cardFreelancer}>Freelancer ID: {rendered.freelancer}</Typography>
                <Typography className={shoppingCart.cardCategory}>Category: {rendered.category}</Typography>

                <CardActions className={shoppingCart.buttonsContainer}>
                  <Button className={shoppingCart.deleteButton} onClick={() => props.removeFromCart(rendered)} >
                    Remove
                    {/* <DeleteTwoToneIcon /> */}
                  </Button>
                </CardActions>

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


const mapDispatch = {
  removeFromCart
}

export default connect(mapStateToProps, mapDispatch)(ShoppingCart);