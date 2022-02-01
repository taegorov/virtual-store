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
    button: {
      margin: '.5em',
    }
  })

  const categoryStyle = useStyles();
  const { isAuthenticated } = useContext(AuthContext);

  return (
    <div id="container">

      <p className={categoryStyle.header} > Filter By Category </p>

      <Button className={categoryStyle.button} variant="contained" color={(props.activatedCategory === 'All' || !props.activatedCategory) ? "default" : "primary"} onClick={() => props.inactive('All')}>All</Button>

      {isAuthenticated
        && <Button className={categoryStyle.button} variant="contained" color={(props.activatedCategory === 'My Services') ? "default" : "primary"} onClick={() => props.active('My Services')}>My Services</Button>
      }

      <Button className={categoryStyle.button} variant="contained" color={(props.activatedCategory === 'Accessibility') ? "default" : "primary"} onClick={() => props.active('Accessibility')}>Accessibility</Button>

      <Button className={categoryStyle.button} variant="contained" color={(props.activatedCategory === 'Web Design') ? "default" : "primary"} onClick={() => props.active('Web Design')}>Web Design</Button>

      <Button className={categoryStyle.button} variant="contained" color={(props.activatedCategory === 'Design') ? "default" : "primary"} onClick={() => props.active('Design')}>Design</Button>

      <Button className={categoryStyle.button} variant="contained" color={(props.activatedCategory === 'Apps') ? "default" : "primary"} onClick={() => props.active('Apps')}>Apps</Button>

      <Button className={categoryStyle.button} variant="contained" color={(props.activatedCategory === 'Tutoring') ? "default" : "primary"} onClick={() => props.active('Tutoring')}>Tutoring</Button>

      <Button className={categoryStyle.button} variant="contained" color={(props.activatedCategory === 'Misc') ? "default" : "primary"} onClick={() => props.active('Misc')}>Misc</Button>

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
