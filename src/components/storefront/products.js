import React, { useEffect, useState, useContext } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
// import StarRating from '../rating/Rating.js';
import StarRatings from 'react-star-ratings';
import { Paper, Typography, IconButton, Grid, Card, CardContent, CardActions, CardMedia, makeStyles } from '@material-ui/core'
import CircularProgress from '@mui/material/CircularProgress';
import { inactive, active } from '../../store/categories.js';
// import { getProducts } from '../../store/products.js';
import { addToCart } from '../../store/cart.js';
import CategoryViewer from './categories.js';
import { loadProducts, getProducts } from '../../store/products';
import { AuthContext } from '../../context/Auth'
import InfoOutlinedIcon from '@mui/icons-material/InfoOutlined';
import AddIcon from '@mui/icons-material/Add';
import { CardActionArea } from '@mui/material';
// import Masonry from '@mui/lab/Masonry';

import './products.css';


// === === JSS styling === === //
const useStyles = makeStyles({
  container: {
    // textAlign: 'center',
    fontSize: '',
    color: 'black',
    height: '30em',
    width: '18em',
    maxWidth: '20em',
    backgroundColor: 'white',
    position: 'relative',
    padding: '1em',
    borderRadius: '25px',
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'space-between',

  },
  textContainer: {
    // backgroundColor: 'grey',
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'space-around',
  },
  loader: {
    // backgroundColor: 'green',
    display: 'flex',
    justifyContent: 'center',
    marginTop: '5em',
    // margin: '0 auto',
  },
  nameContainer: {
    padding: 0,
    marginTop: '.5em',
    display: "-webkit-box",
    boxOrient: "vertical",
    lineClamp: 2,
    // wordBreak: "break-all",
    overflow: "hidden",
    // display: 'flex',
    // flex: 1,
    // backgroundColor: 'green',
  },
  // nameContainer2: {
  //   flex: 1,
  // },
  name: {
    fontFamily: 'Inter',
    fontSize: '1.4em',
    marginBottom: '0em',
    margin: 0,
    lineHeight: '120% !important'
  },
  category: {
    fontFamily: 'Inter',
    fontSize: '14px',
    marginBottom: '0em',
  },
  buttonsContainer: {
    alignSelf: 'flex-end',
    margin: '0',
    padding: '0',
    // backgroundColor: 'red',
    display: 'flex',
    alignContent: 'flex-end',
    // alignItems: 'center',
    justifyContent: 'space-between',
    width: '100%',
    // flex: 1,
    // height: '100%',
    // marginTop: 'auto',
    // marginBottom: 'auto',
    position: 'relative',
    bottom: 0,
  },
  button: {
    // margin: '1em',
    // marginBottom: '0em',
    padding: 0,
    margin: '.2em',
  },
  cardContent: {
    fontFamily: 'Inter',
    marginBottom: '0em',
    paddingBottom: '0',
    paddingTop: '0em',
  },
  price: {
    fontFamily: 'Inter',
    fontSize: '1.3em',
    // alignSelf: 'flex-end',

  },
  freelancer: {
    fontFamily: 'Inter',
  },
  // form: {
  // backgroundColor: 'red',
  // }
  rating: {
    fontFamily: 'Inter',
    textAlign: 'left',
    // backgroundColor: 'rgba(230, 193, 5, .05)',
    // display: 'inline',
    color: '#e6bf05',
    borderRadius: '5px',
    // backgroundColor: 'brown',
    padding: '.5em',
    // margin: '0 auto',
    marginTop: '0',
    // width: '45%',
    // marginBottom: '1em',
    // marginTop: '.3em',
  }
})


// timeout after X seconds
const wait = ms => new Promise(resolve => setTimeout(resolve, ms));


const ProductsViewer = ({ loadProducts, products, activatedCategory, addToCart }) => {

  const cardStyle = useStyles();
  const [isLoading, setIsLoading] = useState(true)
  const { user } = useContext(AuthContext);

  useEffect(() => {
    _loadProducts();
    // loadProducts();
    // eslint-disable-next-line
  }, [loadProducts]);

  useEffect(() => {
    if (products.productList.length > 0) {
      setIsLoading(false);
    }
  }, [products])

  const _loadProducts = async () => {
    await wait(1000); // change to 1 second for production
    loadProducts();
  }

  // const renderProducts = (productList, isCatActivated) => {
  //   if (isCatActivated) {
  //     return productList.filter(product => product.category === activatedCategory)
  //   } else {
  //     return productList
  //   }
  // }


  const renderProducts = (productList, isCatActivated) => {
    if (isCatActivated) {
      return productList.filter(product => {
        if (product.category === activatedCategory) {
          return true
        }
        if (activatedCategory === 'My Services') {
          return product.freelancer === user.id
        }
        return false
      })
    } else {
      return productList
    }
  }

  if (isLoading) {
    return (
      <div className={cardStyle.loader}>
        <CircularProgress />
      </div>
    )
  }

  const productImage = (image) => {
    if (!image) {
      return 'https://images.unsplash.com/photo-1581922814484-0b48460b7010?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=880&q=80';
    }
    return image
  }

  return (
    <>

      <CategoryViewer />
      <Paper className="paper" elevation={3}>

        <Grid
          style={{ backgroundColor: 'white', padding: '.4em', }}
          id="grid-categories"
          // columns={4}
          spacing={3}
          container
          justifyContent="center"
          alignItems="baseline"
        >
          {renderProducts(products.productList, activatedCategory).map((product, index) => {
            // if (product.category === activatedCategory) {
            // console.log('🎭', products);

            const ratingText = () => {
              console.log('product dot totalratings', product.totalRatings)
              if (product.totalRatings === '1') {
                return 'rating'
              } else {
                return 'ratings'
              }
            }
            // console.log('rating text here: ', ratingText());


            return (
              <Grid item key={index}>
                <Card className={cardStyle.container}>
                  <CardActionArea
                    component={Link}
                    to={{ pathname: `/products/${product.id}` }}>
                    <CardMedia
                      // image={product.image}
                      image={productImage(product.image)}
                      style={{
                        maxHeight: '100%',
                        width: '100%',
                        paddingTop: '100%',
                        borderRadius: '25px'
                      }}
                    />
                    <CardContent className={cardStyle.nameContainer}>
                      <Typography className={cardStyle.name}> {product.name} </Typography>
                      {/* <Typography className={cardStyle.category}> {product.category} </Typography> */}
                    </CardContent>
                  </CardActionArea>
                  <CardContent className={cardStyle.rating}>

                    {!parseInt(product.totalRatings)
                      ? <p style={{
                        fontFamily: 'Inter',
                        fontSize: '.8em',
                        margin: 0
                      }}>
                        Service Not Yet Rated
                      </p>
                      : <>
                        <StarRatings
                          rating={Number(product.averageRating)}
                          starDimension="15px"
                          starSpacing="2px"
                          starRatedColor="#e6bf05"
                        />
                        <p style={{
                          fontFamily: 'Inter',
                          fontSize: '.8em',
                          margin: 0
                        }}>
                          {(Math.round(product.averageRating * 10) / 10).toFixed(1)} ({product.totalRatings} {ratingText()})
                        </p>
                      </>
                    }
                    {/* } */}
                  </CardContent>

                  <div className={cardStyle.textContainer}>
                    <CardActions className={cardStyle.buttonsContainer}>
                      <div>
                        <IconButton
                          className={cardStyle.button}
                          size="small"
                          // color="primary"
                          style={{ backgroundColor: '#729ec4', color: 'white', width: '2em', height: '2em' }}
                          variant="contained"
                          onClick={() => addToCart(product)} >
                          <AddIcon />
                        </IconButton>

                        <IconButton
                          className={cardStyle.button}
                          size="small"
                          // color="primary"
                          style={{ backgroundColor: '#729ec4', color: 'white', width: '2em', height: '2em' }}
                          variant="contained"
                          component={Link}
                          to={{ pathname: `/products/${product.id}` }}
                        >
                          <InfoOutlinedIcon />
                        </IconButton>
                      </div>
                      <Typography className={cardStyle.price}> ${product.price}</Typography>
                    </CardActions>
                  </div>
                </Card>
              </Grid>
            )

            // } else {
            //   return null;
            // }

          })}
        </Grid>
      </Paper>
    </>
  )
}

const mapStateToProps = (state) => {
  // console.log('🎲 state.cart ', state.cart)
  return {
    products: state.products,
    activatedCategory: state.categories.activatedCategory,
    activatedDescription: state.description
  }
}

const mapDispatchToProps = {
  inactive,
  active,
  getProducts,
  addToCart,
  loadProducts,
}


export default connect(mapStateToProps, mapDispatchToProps)(ProductsViewer);
