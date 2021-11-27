import React, { useEffect } from 'react';
import { connect } from 'react-redux';
// import { useSelector } from 'react-redux';
// import { useParams } from 'react-router-dom';
import { Link } from 'react-router-dom';
import { Button } from '@material-ui/core';
import ArrowBackIosTwoToneIcon from '@material-ui/icons/ArrowBackIosTwoTone';
import { Card, CardMedia, Paper, Tab, Tabs } from '@material-ui/core';
// import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';
import { addToCart, removeFromCart } from '../../store/cart.js';




// function Details(props, mapDispatchToProps) {
function Details(props) {

  const useStyles = makeStyles({
    container: {
      background: 'linear-gradient(65deg, #ffffff 25%, #f2f2f2 10%)',
    },
    backButton: {
      margin: '1em',
    },
    title: {
      fontFamily: 'Mukta',
      color: 'black',
      fontSize: '3.3em',
      textAlign: 'center',
      marginBottom: '0em',
      marginTop: '0em',
      padding: '0',
      // border: 'solid',
    },
    category: {
      fontFamily: 'Mukta',
      color: 'black',
      fontSize: '1em',
      textAlign: 'center',
      marginBottom: '.5em',
      marginTop: '-1em',
    },
    photoContainer: {
      margin: '0 auto',
      // maxHeight: '50%',
      maxWidth: '30em',

    },
    photo: {
      // margin: '0 auto',
      // maxHeight: '30em',
      // maxWidth: '30em',
      // for some reason necessary to make photo show up:
      paddingTop: '100%',
    },
    bodyContainer: {
      marginTop: '.1em',
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'flex-start',
    },
    priceContainer: {
      fontFamily: 'Inter',
      marginLeft: '1em',
      marginRight: '1em',
      // margin: '0 auto',
      // marginBottom: '0em',
      maxWidth: '100%',
      color: 'black',
      // background: 'linear-gradient(75deg, #000000 30%, #2b2b2b 90%)',
      // borderColor: 'black',
      // borderWidth: '.1em',
      // borderRadius: 3,
      // flexGrow: 5,
      // display: 'flex',
      // alignItems: 'center',
      // alignContent: 'center',
      // justifyContent: 'flex-end'
    },
    priceText: {
      fontFamily: 'Inter',
      alignSelf: 'flex-start',
      // textAlign: 'center',
      marginBottom: '1em',
      marginLeft: '.5em'

    },
    price: {
      fontFamily: 'Inter',
      // textAlign: 'center',
      // marginBottom: 12,
      fontSize: '3em',
      color: '#70b85c',
      alignSelf: 'flex-end',
      margin: 0,
    },
    // freelancer: {
    //   fontFamily: 'Inter',
    //   textAlign: 'center',
    //   marginBottom: 12,
    // },
    quantityContainer: {

      maxWidth: '100%',
      marginLeft: '1em',
      marginRight: '1em',
      fontFamily: 'Inter',
    },
    quantitySelector: {
      // margin: '0 auto',
      width: '8em',
      height: '3em',
      display: 'flex',
      justifyContent: 'space-around',
      alignItems: 'center',
      alignSelf: 'flex-end',
      fontFamily: 'Inter',
      border: 'solid',
      borderWidth: '.1em',
      borderRadius: '50px',
      borderColor: 'white',
      backgroundColor: 'white',
    },
    quantityText: {
      fontFamily: 'Inter',
      marginBottom: '1em',
      marginLeft: '.5em'

    },
    quantityNumber: {
      fontFamily: 'Inter',
      minWidth: '1.5em',
      textAlign: 'center',
      color: 'black',
    },
    quantityButton: {
      height: '2em',
      maxHeight: '2em',
      width: '2em',
      maxWidth: '2em',
      backgroundColor: '#f2f2f2',
      color: '#828282',
      border: 'solid',
      borderColor: '#f2f2f2',
      borderWidth: '.1em',
      borderRadius: '50px',
      // fontSize: '1em',
      justifyContent: 'center',
      alignItems: 'center',
    },
    paper: {
      color: 'black',
      // maxWidth: '45em',
      // minWidth: '45em',
      width: '30em',
      padding: '-2em',
      margin: '.5em',
      // background: 'linear-gradient(25deg, #000000 30%, #2b2b2b 90%)',
      // border: 'solid',
      // borderColor: 'black',
      // borderWidth: '.1em',
    },
    header: {
      fontFamily: 'Inter',
      fontSize: '1.3em',
      marginBottom: '0em',
      textAlign: 'left',
      padding: '.5em',
    },
    details: {
      fontFamily: 'Inter',
      marginBottom: '0em',
      padding: '1em',
    },
    tabs: {
      fontFamily: 'Inter',
      width: '30em',
      maxWidth: '30em',
      margin: '0 auto',
      marginTop: '1em',
      paddingBottom: '1em',
      minHeight: '15em',
    },
    tabHeader: {
      fontFamily: 'Mukta',
    },
    tabText: {
      fontFamily: 'Inter',
    },
  });

  const classes = useStyles();

  // scroll window to top at page load
  useEffect(() => {
    window.scrollTo(0, 0)
  }, [])

  // renders correct product/service
  const { shownItem } = props.location.state;

  // Tabs/Tab functionality 
  const [value, setValue] = React.useState(0);
  const handleTabs = (event, val) => {
    setValue(val);
  }

  return (
    <div>

      <Paper className={classes.container} elevation={10}>
        <Button
          className={classes.backButton}
          size="large"
          color="primary"
          variant="contained"
          startIcon={<ArrowBackIosTwoToneIcon />}
          component={Link} to={'/'}
        >
          Back to Store
        </Button>
        <p className={classes.title}>
          {shownItem.name}
        </p>
        <p className={classes.category}>
          {shownItem.category}
        </p>

        <Card className={classes.photoContainer}>
          <CardMedia
            image={shownItem.image}
            className={classes.photo}
          />
        </Card>

        <div className={classes.bodyContainer}>
          <div className={classes.priceContainer}>
            <p className={classes.priceText}>
              Price
            </p>
            <p className={classes.price}>
              ${shownItem.price}
            </p>
            {/* <p className={classes.freelancer}>
              Freelancer ID: {shownItem.freelancer}
            </p> */}
          </div>

          <div container className={classes.quantityContainer}>
            <p className={classes.quantityText}>Quantity </p>
            <div container className={classes.quantitySelector}>

              <button
                className={classes.quantityButton}
                disabled={!shownItem.quantity}
                onClick={() => props.removeFromCart(shownItem)} >
                −
              </button>
              <p className={classes.quantityNumber}>
                {shownItem.quantity || 0}
              </p>
              <button
                className={classes.quantityButton}
                onClick={() => props.addToCart(shownItem)} >
                +
              </button>
            </div>
          </div>
        </div>

        <div className={classes.tabs}>
          <Tabs value={value} onChange={handleTabs}>
            <Tab className={classes.tabHeader} label='Details' />
            <Tab className={classes.tabHeader} label='Reviews' />
            <Tab className={classes.tabHeader} label='Freelancer' />
          </Tabs>
          <TabSelection className={classes.tabText} value={value} index={0}> {shownItem.details} </TabSelection>
          <TabSelection className={classes.tabText} value={value} index={1}> Reviews </TabSelection>
          <TabSelection className={classes.tabText} value={value} index={2}> Freelancer id: {shownItem.freelancer} </TabSelection>
        </div>


        {/* <Grid container justifyContent="center">
          <Paper className={classes.paper} elevation={5}>
            <p className={classes.header}>
              Description
            </p>
            <p className={classes.details}>{shownItem.details}</p>
          </Paper>
        </Grid> */}

        {/* <Grid container justifyContent="center">
          <Paper className={classes.paper} elevation={5}>
            <p className={classes.header}>
              User Reviews
            </p>
            <p className={classes.details}>
              Reviews Go Here...
            </p>
          </Paper>
        </Grid> */}

      </Paper >

    </div >
  );

  // below snippet created with the help of  'Code Step By Step' Youtube channel
  function TabSelection(props) {
    const { children, value, index } = props
    return (
      <div>
        {
          value === index && (
            <p>{children} </p>
          )
        }

      </div>
    )
  }


}


const mapStateToProps = (state) => {
  return {
    cart: state.cart.cart,
  }
}

const mapDispatchToProps = {
  addToCart,
  removeFromCart
}

export default connect(mapStateToProps, mapDispatchToProps)(Details);
