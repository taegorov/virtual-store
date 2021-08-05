import React from 'react';
import { useSelector } from 'react-redux';

import { useParams } from 'react-router-dom';
import { Link } from 'react-router-dom';
import { Button } from '@material-ui/core';
import ArrowBackIosTwoToneIcon from '@material-ui/icons/ArrowBackIosTwoTone';
import { Card, CardMedia, Grid } from '@material-ui/core';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';
import { addToCart } from '../../store/cart.js';

import Accordion from '@material-ui/core/Accordion';
import AccordionSummary from '@material-ui/core/AccordionSummary';
import AccordionDetails from '@material-ui/core/AccordionDetails';


export default function Details(props) {


  let products = useSelector(state => state.products)
  const { id } = useParams();
  // console.log('🎨', products)
  const result = products.productList.filter(product => product._id === id);
  let shownItem = result[0];


  const useStyles = makeStyles({
    root: {
      margin: '0 auto',
      marginBottom: '0em',
      maxWidth: '45em',
      color: 'white',
      background: 'linear-gradient(75deg, #000000 30%, #31364a 90%)',
      border: 0,
      borderRadius: 3,
      // boxShadow: '0 3px 5px 2px rgba(255, 105, 135, .3)',
    },
    title: {
      fontSize: 30,
      textAlign: 'center',
      marginBottom: '-1em',
    },
    p: {
      textAlign: 'center',
      marginBottom: 12,
    },
    buy: {
      marginTop: '1em',
      marginBottom: '.5em',
      backgroundColor: 'green',
      color: 'white',
    },
    description: {
      marginTop: '1em',
    },
    accordion: {
      color: 'white',
      maxWidth: '45em',
      minWidth: '45em',
      padding: '-2em',
      margin: '.5em',
      background: 'linear-gradient(45deg, #000000 30%, #31364a 90%)',
      textAlign: 'center',
    },
    productDetails: {
      marginBottom: '0em',
    }
  });


  const classes = useStyles();


  function productImage(description) {
    if (!description) {
      return 'https://picsum.photos/200/300';
    }
    return description.split('$')[1]
  }


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

      <Typography className={classes.title}>
        <h1>{shownItem.name}</h1>
      </Typography>

      <Card className={classes.root}>
        <CardMedia
          image={productImage(shownItem.description)}
          style={{ maxWidth: '50em', height: 10, paddingTop: '100%' }}
        />

        <Typography className={classes.p}>
          <p>${shownItem.price}</p>
          <p>{shownItem.inStock} in stock</p>
        </Typography>
      </Card>

      <Grid container justify="center">
        <Button className={classes.buy} variant="contained" style={{ maxWidth: '50em', maxHeight: '3em', minWidth: '50em', minHeight: '3em' }} onClick={() => addToCart(shownItem)} > Add to Cart </Button>
      </Grid>

      <Grid container justify="center">

        <Accordion className={classes.accordion}>
          <AccordionSummary>
            <Typography className={classes.productDetails}>
              <p>Product Details</p>
            </Typography>
          </AccordionSummary>
          <AccordionDetails className={classes.description}>
            <Typography>
              <p>{shownItem.description}</p>
              <p>Category: {shownItem.category}</p>
            </Typography>
          </AccordionDetails>
        </Accordion>

      </Grid>


      <Grid container justify="center">

        <Accordion className={classes.accordion}>
          <AccordionSummary>
            <Typography className={classes.productDetails}>
              <p>User Reviews</p>
            </Typography>
          </AccordionSummary>
          <AccordionDetails className={classes.description}>
            <Typography>
              <p>Reviews Go Here...</p>
            </Typography>
          </AccordionDetails>
        </Accordion>

      </Grid>

    </>
  )
}
