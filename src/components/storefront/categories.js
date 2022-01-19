import React, { useContext } from 'react';
import { connect } from 'react-redux';

import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import { inactive, active, allProducts } from '../../store/categories.js';
import { AuthContext } from '../../context/Auth';


import './categories.css';


const CategoryViewer = (props) => {

  const { isAuthenticated } = useContext(AuthContext);

  return (
    <div id="container">

      <Typography id="filter-text" variant="h6" component='h6'> Filter By Category </Typography>

      <Button id="card-buttons" variant="contained" color={(props.activatedDescription === 'All' || !props.activatedDescription) ? "success" : "primary"} onClick={() => props.allProducts('Accessibility', 'All')}>All</Button>

      <Button id="card-buttons" variant="contained" color={(props.activatedDescription === 'Accessibility') ? "success" : "primary"} onClick={() => props.active('Accessibility', 'Accessibility')}>Accessibility</Button>

      <Button id="card-buttons" variant="contained" color={(props.activatedDescription === 'Web Design') ? "success" : "primary"} onClick={() => props.active('Web Design', 'Web Design')}>Web Design</Button>

      <Button id="card-buttons" variant="contained" color={(props.activatedDescription === 'Design') ? "success" : "primary"} onClick={() => props.active('Design', 'Design')}>Design</Button>

      <Button id="card-buttons" variant="contained" color={(props.activatedDescription === 'Apps') ? "success" : "primary"} onClick={() => props.active('Apps', 'Apps')}>Apps</Button>

      <Button id="card-buttons" variant="contained" color={(props.activatedDescription === 'Tutoring') ? "success" : "primary"} onClick={() => props.active('Tutoring', 'Tutoring')}>Tutoring</Button>

      <Button id="card-buttons" variant="contained" color={(props.activatedDescription === 'Misc') ? "success" : "primary"} onClick={() => props.active('Misc', 'Misc')}>Misc</Button>

      {isAuthenticated
        ? <Button id="card-buttons" variant="contained" color={(props.activatedDescription === 'Your Services') ? "success" : "primary"} onClick={() => props.active('Your Services', 'Your Services')}>Your Services</Button>
        : <div></div>
      }
      {/* <Typography> {props.activatedDescription}</Typography> */}

    </div >
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
  allProducts,
}



export default connect(mapStateToProps, mapDispatchToProps)(CategoryViewer);
