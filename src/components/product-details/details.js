import React from 'react';
// import { useSelector } from 'react-redux';
// import { useParams } from 'react-router-dom';
import { Link } from 'react-router-dom';
import { Button } from '@material-ui/core';
import ArrowBackIosTwoToneIcon from '@material-ui/icons/ArrowBackIosTwoTone';
import { Card, CardMedia, Grid, Paper } from '@material-ui/core';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';
import { addToCart } from '../../store/cart.js';

import { connect } from 'react-redux';



function Details(props, mapDispatchToProps) {

  const { shownItem } = props.location.state;
  console.log('shownitem', shownItem);

  const useStyles = makeStyles({
    container: {
      background: 'linear-gradient(45deg, #2e2e42 30%, #2b2b2b 90%)',
    },
    root: {
      fontFamily: 'Inter',
      margin: '0 auto',
      marginBottom: '0em',
      maxWidth: '45em',
      color: 'white',
      background: 'linear-gradient(75deg, #000000 30%, #2b2b2b 90%)',
      border: 'solid',
      borderColor: 'black',
      borderWidth: '.1em',
      borderRadius: 3,
    },
    title: {
      fontFamily: 'Inter',
      color: 'white',
      fontSize: '3em',
      textAlign: 'center',
      marginBottom: '.2em',
    },
    price: {
      fontFamily: 'Inter',
      textAlign: 'center',
      marginBottom: 12,
    },
    freelancer: {
      fontFamily: 'Inter',
      textAlign: 'center',
      marginBottom: 12,
    },
    buyButton: {
      marginTop: '1em',
      marginBottom: '.5em',
      backgroundColor: 'green',
      color: 'white',
      border: 'solid',
      borderColor: 'black',
      borderWidth: '.1em',
    },
    paper: {
      color: 'white',
      maxWidth: '45em',
      minWidth: '45em',
      padding: '-2em',
      margin: '.5em',
      background: 'linear-gradient(25deg, #000000 30%, #2b2b2b 90%)',
      border: 'solid',
      borderColor: 'black',
      borderWidth: '.1em',
    },
    header: {
      fontFamily: 'Inter',
      fontSize: '1.3em',
      marginBottom: '0em',
      textAlign: 'center',
      padding: '.5em',
    },
    details: {
      fontFamily: 'Inter',
      marginBottom: '0em',
      padding: '1em',
    }
  });


  const classes = useStyles();


  return (

    <Paper className={classes.container} elevation={10}>

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
        {shownItem.name}
      </Typography>

      <Card className={classes.root}>
        <CardMedia
          image={shownItem.image}
          style={{ maxWidth: '50em', height: 10, paddingTop: '100%' }}
        />

        <Typography className={classes.price}>
          ${shownItem.price}
        </Typography>
        <Typography className={classes.freelancer}>
          Freelancer ID: {shownItem.freelancer}
        </Typography>
      </Card>

      <Grid container justifyContent="center">
        <Button
          className={classes.buyButton}
          variant="contained"
          style={{ maxWidth: '50em', maxHeight: '3em', minWidth: '50em', minHeight: '3em' }}
          onClick={() => props.addToCart(shownItem)} >
          Add to Cart
        </Button>

        {/* <Button size="small" color="primary" variant="contained" onClick={() => props.addToCart(shownItem)} > Add </Button> */}

      </Grid>

      <Grid container justifyContent="center">

        <Paper className={classes.paper} elevation={5}>
          <Typography className={classes.header}>
            Service Details
          </Typography>
          <Typography className={classes.details}>{shownItem.details}</Typography>
          <Typography className={classes.details}>Category: {shownItem.category}</Typography>
        </Paper>

      </Grid>


      <Grid container justifyContent="center">

        <Paper className={classes.paper} elevation={5}>
          <Typography className={classes.header}>
            User Reviews
          </Typography>
          <Typography className={classes.details}>
            Reviews Go Here...
          </Typography>
        </Paper>
      </Grid>

    </Paper>
  )
}



const mapDispatchToProps = {
  addToCart
}

export default connect(null, mapDispatchToProps)(Details);
