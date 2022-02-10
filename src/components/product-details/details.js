import React, { useEffect, useState, useContext } from 'react';
import { connect } from 'react-redux';
import { Link, useHistory } from 'react-router-dom';
import { Button } from '@material-ui/core';
import ArrowBackIosTwoToneIcon from '@material-ui/icons/ArrowBackIosTwoTone';
import { Card, CardMedia, Paper, Tab, Tabs } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import { addToCart, removeFromCart } from '../../store/cart.js';
import PutModal from './Modal';
import axios from 'axios';
import { AuthContext } from '../../context/Auth';
import Auth from '../../components/auth/Auth';
import { root } from '../../helper';
import { openSnackbar } from '../../store/misc';
import StarRating from '../rating/Rating.js';
import { getProductById } from '../../store/products'


require('dotenv').config();


function Details(props) {
  console.log('props: ', props)
  const { activeProduct, getProductById } = props
  const useStyles = makeStyles({
    container: {
      background: 'linear-gradient(65deg, #ffffff 25%, #f2f2f2 10%)',
      // background: 'linear-gradient(65deg, #ffffff 25%, #ebebeb 10%)',
      marginBottom: '1em',
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
      maxWidth: '100%',
      color: 'black',
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
      width: '30em',
      padding: '-2em',
      margin: '.5em',
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
      // width: '20em',
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
    login: {
      fontFamily: 'Inter',
    },
    deleteStyling: {
      padding: '1em',
      fontFamily: 'Inter',
      // width: '30em',
      maxWidth: '20em',
      margin: '0 auto',
      marginBottom: '1em',
      marginTop: '1em',
      textAlign: 'center',
      // border: 'solid',
    },
    deleteButton: {
      backgroundColor: '#fa9191',
      // border: 'solid',
      // borderColor: 'red',
      // marginTop: '.5em',
      // marginBottom: '-1em',
      // margin: '0 auto',
      margin: '.5em',
    },
  });

  const { user, isAuthenticated } = useContext(AuthContext);
  console.log('user is: ', user);

  const classes = useStyles();

  useEffect(() => {
    // scroll window to top at page load
    window.scrollTo(0, 0)
    getProductById({ serviceId: props.match.params.id })
    // props.getProductById(props.match.params.id);
  }, [getProductById, props.match.params.id])

  // renders correct product/service
  // const { shownItem } = props.location.state;
  // console.log('shown item ID is', shownItem.id)

  // Tabs/Tab functionality 
  const [value, setValue] = useState(0);
  const handleTabs = (event, val) => {
    setValue(val);
  }


  const history = useHistory();
  // const [open, setOpen] = useState(false);

  async function deleteService() {
    // const res = await axios.delete(root + `/services/${shownItem.id}`)

    const res = await axios({
      method: 'delete',
      url: `${root}/services/${activeProduct.id}`,
      headers: {
        'Authorization': 'Bearer ' + user.token
      }
    });

    // console.log('response data', res.data)
    if (!!res.data.success) {
      // if (res.data.deleted === 1) {
      console.log('front end RES', res.data);
      // setOpen(true);
      props.openSnackbar({ open: true, message: res.data.message, severity: 'warning' })
      history.push("/");
    } else {
      // alert(`ALERT: ${res.data.message}`);
      props.openSnackbar({ open: true, message: res.data.message, severity: 'error' });
    }
  }


  // // === === === snackbar behavior from MUI docs === === === //
  // const handleClose = (event, reason) => {
  //   if (reason === 'clickaway') {
  //     return;
  //   }
  //   setOpen(false);
  //   history.push("/")
  // };

  // const action = (
  //   <>
  //     <IconButton
  //       size="small"
  //       aria-label="close"
  //       color="inherit"
  //       onClick={handleClose}
  //     >
  //       <CancelIcon />
  //     </IconButton>
  //   </>
  // );


  const productImage = (image) => {
    if (!image) {
      return 'https://images.unsplash.com/photo-1581922814484-0b48460b7010?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=880&q=80';
    }
    return image
  }

  // console.log(activeProduct.freelancer, 'SHOWN ITEM FREELANCER')
  // console.log(user.id, 'USER ID')
  console.log(activeProduct, 'active product is')
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
          {activeProduct.name}
        </p>
        <p className={classes.category}>
          {activeProduct.category}
        </p>

        <Card className={classes.photoContainer}>
          <CardMedia
            // image={shownItem.image}
            image={productImage(activeProduct.image)}
            className={classes.photo}
          />
        </Card>

        <div className={classes.bodyContainer}>
          <div className={classes.priceContainer}>
            <p className={classes.priceText}>
              Price
            </p>
            <p className={classes.price}>
              ${activeProduct.price}
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
                disabled={!activeProduct.quantity}
                onClick={() => props.removeFromCart(activeProduct)} >
                −
              </button>
              <p className={classes.quantityNumber}>
                {activeProduct.quantity || 0}
              </p>
              <button
                className={classes.quantityButton}
                onClick={() => props.addToCart(activeProduct)} >
                +
              </button>
            </div>
          </div>
        </div>

        <div className={classes.tabs}>

          < Tabs value={value} onChange={handleTabs}>
            <Tab className={classes.tabHeader} label='Details' />
            <Tab className={classes.tabHeader} label='Rating' />
            {user.id === activeProduct.freelancer &&
              (<Tab className={classes.tabHeader} label='Manage' />)
            }
          </Tabs>

          <TabSelection className={classes.tabText} value={value} index={0}> {activeProduct.details} </TabSelection>
          <TabSelection className={classes.tabText} value={value} index={1}>
            <StarRating serviceId={activeProduct.id} service={activeProduct} />
            {!isAuthenticated && <p className={classes.login}>Log in to rate service</p>
            }
          </TabSelection>
          <TabSelection className={classes.tabText} value={value} index={2}>
            <Auth capability="update">
              <PutModal service={activeProduct} />
            </Auth>
            <Auth capability="delete">
              <Button
                variant="outlined"
                className={classes.deleteButton}
                onClick={() => {
                  // eslint-disable-next-line no-restricted-globals
                  if (confirm('Are you sure? This action is final!')) {
                    deleteService().catch(err => alert(err))
                  }
                }}
              >
                delete this service
              </Button>
            </Auth>
          </TabSelection>
        </div>

        {/* {
          user.id === shownItem.freelancer
            ? < Card className={classes.deleteStyling} elevation={10}>
              <Auth capability="update">
                <PutModal service={shownItem} />
              </Auth>

              <Auth capability="delete">
                <Button
                  className={classes.deleteButton}
                  onClick={() => {
                    // eslint-disable-next-line no-restricted-globals
                    if (confirm('Are you sure? This action is final!')) {
                      deleteService().catch(err => alert(err))
                    }
                  }}
                >
                  delete this service
                </Button>
              </Auth>
            </Card>
            : <div></div>
        } */}

        {/* <Snackbar
          severity="error"
          open={open}
          autoHideDuration={4000}
          onClose={handleClose}
          message="Service Deleted!"
          action={action}
        >
          <MuiAlert action={action} onClose={handleClose} severity="error">Service Deleted!</MuiAlert>
        </Snackbar> */}

      </Paper >

    </div >
  );

  // below snippet created with the help of 'Code Step By Step' Youtube channel
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
  console.log(state, 'state:')
  return {
    cart: state.cart.cart,
    activeProduct: state.products.activeProduct
  }
}

const mapDispatchToProps = {
  addToCart,
  removeFromCart,
  openSnackbar,
  getProductById
}

export default connect(mapStateToProps, mapDispatchToProps)(Details);
