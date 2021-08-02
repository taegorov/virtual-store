import React from 'react';
import { Paper, Typography, Button, Grid, Card, CardHeader, CardContent, CardActions, CardMedia } from '@material-ui/core'
import { connect } from 'react-redux';
import { inactive, active } from '../../store/categories.js';
import { getProducts } from '../../store/products.js';


import './products.css';
// import dog from '../../assets/dog.jpg'



const productsViewer = (props) => {
  return (
    <>
      <Paper className="paper" elevation={3}>
        <Typography variant="h4" component='h4'> Browse A Category: </Typography>
        <Button id="card-buttons" size="small" variant="contained" color="primary" onClick={() => props.active('Electronics')}>Electronics</Button>
        <Button size="small" variant="contained" color="primary" onClick={() => props.active('Food')}>Food</Button>
        <Grid spacing={4} container justify="center" >
          {props.products.productList.map((product, index) => {
            if (product.category === props.activatedCategory) {

              return (
                <Grid item key={index}>
                  <Card>
                    <CardHeader title={product.name} />
                    {/* cardmedia is not working */}
                    <CardMedia
                      image={require('../../assets/dog.jpg')}
                      style={{ height: 5, paddingTop: '50%' }}
                      title='title'
                    />
                    <CardContent>
                      <Typography variant="p" component="p"> ${product.price}</Typography>
                    </CardContent>
                    <CardActions>
                      <Button variant="outlined"> Add to Cart </Button>
                      <Button variant="outlined"> View Details </Button>
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

const mapStateToProps = (state) => {
  return {
    products: state.products, activatedCategory: state.categories.activatedCategory
  }
}

const mapDispatchToProps = {
  inactive,
  active,
  getProducts,
}


export default connect(mapStateToProps, mapDispatchToProps)(productsViewer);
