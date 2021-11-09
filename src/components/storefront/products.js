import React, { useEffect } from 'react';
import { connect } from 'react-redux';

import { Paper, Typography, Button, Grid, Card, CardContent, CardActions, CardMedia } from '@material-ui/core'
import { inactive, active } from '../../store/categories.js';
import { getProducts } from '../../store/products.js';
import { addToCart } from '../../store/cart.js';
import CategoryViewer from './categories.js';
import { loadProducts } from '../../store/products';
import { Link } from 'react-router-dom';

import './products.css';
// import dog from '../../assets/dog.jpg'


const ProductsViewer = ({ loadProducts, products, activatedCategory, addToCart }) => {
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
                <Card id="card-image" style={{ backgroundColor: '#e6e8bc' }}>
                  <CardMedia
                    image={product.image}
                    style={{ height: 10, paddingTop: '100%' }}
                  />

                  <CardContent>
                    <Typography variant="h5" component="h5"> {product.name} </Typography>
                  </CardContent>

                  <CardContent>
                    <Typography > ${product.price} - Freelancer: {product.freelancer} </Typography>
                  </CardContent>

                  <CardActions id="card-buttons2">
                    <Button size="small" color="primary" variant="contained" onClick={() => addToCart(product)} > Add </Button>
                    <Button size="small" color="primary" variant="contained" component={Link} to={{ pathname: `/products/${product.id}`, state: { shownItem: product } }}> Details </Button>
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
