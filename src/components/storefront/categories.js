import React, { useContext } from 'react';
import { connect } from 'react-redux';

import { makeStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import { inactive, active } from '../../store/categories.js';
import { AuthContext } from '../../context/Auth';


import './categories.css';



const CategoryViewer = (props) => {

  const useStyles = makeStyles({
    header: {
      fontFamily: 'Inter',
      fontSize: '1.2em',
    },
    description: {
      fontFamily: 'Inter',
      fontSize: '.8em',
    },
  })

  const categoryStyle = useStyles();
  const { isAuthenticated } = useContext(AuthContext);

  return (
    <div id="container">

      <p className={categoryStyle.header} > Filter By Category </p>

      <Button id="card-buttons" variant="contained" color={(props.activatedCategory === 'All' || !props.activatedCategory) ? "success" : "primary"} onClick={() => props.inactive('All')}>All</Button>

      <Button id="card-buttons" variant="contained" color={(props.activatedCategory === 'Accessibility') ? "success" : "primary"} onClick={() => props.active('Accessibility')}>Accessibility</Button>

      <Button id="card-buttons" variant="contained" color={(props.activatedCategory === 'Web Design') ? "success" : "primary"} onClick={() => props.active('Web Design')}>Web Design</Button>

      <Button id="card-buttons" variant="contained" color={(props.activatedCategory === 'Design') ? "success" : "primary"} onClick={() => props.active('Design')}>Design</Button>

      <Button id="card-buttons" variant="contained" color={(props.activatedCategory === 'Apps') ? "success" : "primary"} onClick={() => props.active('Apps')}>Apps</Button>

      <Button id="card-buttons" variant="contained" color={(props.activatedCategory === 'Tutoring') ? "success" : "primary"} onClick={() => props.active('Tutoring')}>Tutoring</Button>

      <Button id="card-buttons" variant="contained" color={(props.activatedCategory === 'Misc') ? "success" : "primary"} onClick={() => props.active('Misc')}>Misc</Button>

      {isAuthenticated
        && <Button id="card-buttons" variant="contained" color={(props.activatedDescription === 'Your Services') ? "success" : "primary"} onClick={() => props.active('Your Services')}>Your Services</Button>
      }
      <p className={categoryStyle.description}>{props.activatedDescription}</p>

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
}



export default connect(mapStateToProps, mapDispatchToProps)(CategoryViewer);
