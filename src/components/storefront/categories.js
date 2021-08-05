import React from 'react';
import { connect } from 'react-redux';

import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import { inactive, active } from '../../store/categories.js';

import './categories.css';


const CategoryViewer = (props) => {
  return (
    <>

      <Typography variant="h4" component='h4'> Browse By Category </Typography>

      <Button id="card-buttons" variant="contained" color="primary" onClick={() => props.active('Electronics', 'Electronics')}>Electronics</Button>

      <Button id="card-buttons" variant="contained" color="primary" onClick={() => props.active('Food', 'Food')}>Food</Button>

      <Button id="card-buttons" variant="contained" color="primary" onClick={() => props.active('Phones', 'Phones')}>Phones</Button>

      <Button id="card-buttons" variant="contained" color="primary" onClick={() => props.active('Console', 'Console')}>Consoles</Button>

      <Button id="card-buttons" variant="contained" color="primary" onClick={() => props.active('Shirts', 'Shirts')}>Shirts</Button>

      <Typography id="p-tag" variant="p" component="p"> {props.activatedDescription}</Typography>

    </>
  )
}


const mapStateToProps = (state) => {
  return {
    products: state.products,
    activatedCategory: state.categories.activatedCategory,
    activatedDescription: state.categories.activatedDescription
  }
}


const mapDispatchToProps = {
  inactive,
  active,
}



export default connect(mapStateToProps, mapDispatchToProps)(CategoryViewer);
