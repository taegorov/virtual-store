import React, { useEffect } from 'react';
import { connect } from 'react-redux';

import { Paper, Typography, Button, Grid, Card, CardHeader, CardContent, CardActions, CardMedia } from '@material-ui/core'
import { inactive, active } from '../../store/categories.js';
import { getProducts } from '../../store/products.js';
import { addToCart } from '../../store/cart.js';
import CategoryViewer from './categories.js';
import { loadProducts } from '../../store/products';

import './products.css';
// import dog from '../../assets/dog.jpg'


const ProductsViewer = (props) => {
  useEffect(() => {
    props.loadProducts();
  });


  return (
    <>
      <CategoryViewer />
      <Paper className="paper" elevation={3}>

        <Grid id="grid-categories" style={{ backgroundColor: '#97b2bd' }} spacing={4} container justify="center" >
          {props.products.productList.map((product, index) => {
            if (product.category === props.activatedCategory.toLowerCase()) {

              return (
                <Grid item key={index}>
                  <Card style={{ backgroundColor: '#e6e8bc' }}>
                    <CardMedia
                      image={product.image}
                      style={{ height: 10, paddingTop: '100%' }}
                    />
                    <CardHeader title={product.name} />
                    <CardContent>
                      <Typography variant="p" component="p"> ${product.price} - In Stock: {product.inStock} </Typography>
                    </CardContent>
                    <CardActions>

                      <Button size="small" color="primary" variant="contained" onClick={() => props.addToCart(product)} > Add to Cart </Button>
                      <Button size="small" color="primary" variant="contained"> View Details </Button>

                    </CardActions>
                  </Card>
                </Grid>
              )

            } else {
              return null;
            }

          })}
        </Grid>
      </Paper>
    </>
  )
}

const stateToProps = (state) => {
  return {
    products: state.products,
    activatedCategory: state.categories.activatedCategory,
    activatedDescription: state.description
  }
}

const dispatch = {
  inactive,
  active,
  getProducts,
  addToCart,
  loadProducts,
}


export default connect(stateToProps, dispatch)(ProductsViewer);
