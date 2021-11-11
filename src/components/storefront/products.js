import React, { useEffect } from 'react';
import { connect } from 'react-redux';

import { Paper, Typography, Button, Grid, Card, CardContent, CardActions, CardMedia, makeStyles } from '@material-ui/core'
import { inactive, active } from '../../store/categories.js';
import { getProducts } from '../../store/products.js';
import { addToCart } from '../../store/cart.js';
import CategoryViewer from './categories.js';
import { loadProducts } from '../../store/products';
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
})

const ProductsViewer = ({ loadProducts, products, activatedCategory, addToCart }) => {
  const cardStyle = useStyles();
  useEffect(() => {
    loadProducts();
  }, [loadProducts]);

  const renderProducts = (productList, isCatActivated) => {
    if (isCatActivated) {
      return productList.filter(product => product.category === activatedCategory)
    } else {
      return productList
    }
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
                    image={product.image}
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
