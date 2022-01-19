import React, { useEffect, useState } from 'react';
import { connect } from 'react-redux';

import { Paper, Typography, Button, Grid, Card, CardContent, CardActions, CardMedia, makeStyles } from '@material-ui/core'
import CircularProgress from '@mui/material/CircularProgress';
import { inactive, active } from '../../store/categories.js';
// import { getProducts } from '../../store/products.js';
import { addToCart } from '../../store/cart.js';
import CategoryViewer from './categories.js';
import { loadProducts, getProducts } from '../../store/products';
import { Link } from 'react-router-dom';

import './products.css';


// === === JSS styling === === //
const useStyles = makeStyles({
  container: {
    textAlign: 'center',
    fontSize: '',
    color: 'black',
    height: '33em',
    width: '20em',
    backgroundColor: 'white',
    position: 'relative',
  },
  loader: {
    // backgroundColor: 'green',
    display: 'flex',
    justifyContent: 'center',
    marginTop: '5em',
    // margin: '0 auto',
  },
  name: {
    fontFamily: 'Inter',
    fontSize: '20px',
    marginBottom: '0em',
  },
  buttonsContainer: {
    margin: '0',
    padding: '0',
    justifyContent: 'center',
    position: 'absolute',
    right: '0',
    left: '0',
    bottom: '1%',
  },
  button: {
    margin: '1em',
    marginBottom: '0em',
  },
  cardContent: {
    fontFamily: 'Inter',
    marginBottom: '0em',
    paddingBottom: '0',
    paddingTop: '0em',
  },
  price: {
    fontFamily: 'Inter',
  },
  freelancer: {
    fontFamily: 'Inter',
  },
  form: {
    backgroundColor: 'white',
  }
})

// timeout after X seconds
const wait = ms => new Promise(resolve => setTimeout(resolve, ms));

const ProductsViewer = ({ loadProducts, products, activatedCategory, addToCart }) => {
  const cardStyle = useStyles();
  const [isLoading, setIsLoading] = useState(true)
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

  const renderProducts = (productList, isCatActivated) => {
    if (isCatActivated) {
      return productList.filter(product => product.category === activatedCategory)
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

        <Grid id="grid-categories" style={{ backgroundColor: '#97b2bd' }} spacing={4} container justifyContent="center" >
          {renderProducts(products.productList, activatedCategory).map((product, index) => {
            // if (product.category === activatedCategory) {
            // console.log('🎭', products);
            return (
              <Grid item key={index}>
                <Card className={cardStyle.container}>
                  <CardMedia
                    // image={product.image}
                    image={productImage(product.image)}
                    style={{ height: 10, paddingTop: '100%' }}
                  />

                  <CardContent>
                    <Typography className={cardStyle.name}> {product.name} </Typography>
                  </CardContent>

                  <CardContent className={cardStyle.cardContent}>
                    <Typography className={cardStyle.price}> ${product.price}</Typography>
                    <Typography className={cardStyle.freelancer}>Freelancer: {product.freelancer} </Typography>
                  </CardContent>

                  <CardActions className={cardStyle.buttonsContainer}>
                    <div>
                      <Button
                        className={cardStyle.button}
                        size="small"
                        color="primary"
                        variant="contained"
                        onClick={() => addToCart(product)} >
                        Add
                      </Button>

                      <Button
                        className={cardStyle.button}
                        size="small"
                        color="primary"
                        variant="contained"
                        component={Link}
                        to={{ pathname: `/products/${product.id}`, state: { shownItem: product } }}>
                        Details
                      </Button>

                    </div>
                  </CardActions>

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
