import React, { useContext } from 'react';
import { connect } from 'react-redux';

import { makeStyles } from '@material-ui/core/styles';
import { Button } from '@material-ui/core';
import { inactive, active } from '../../store/categories.js';
import { AuthContext } from '../../context/Auth';
import AccessibleIcon from '@mui/icons-material/Accessible';
import DesignServicesIcon from '@mui/icons-material/DesignServices';
import AppShortcutIcon from '@mui/icons-material/AppShortcut';
import SchoolIcon from '@mui/icons-material/School';
import MoreHorizIcon from '@mui/icons-material/MoreHoriz';
import DensitySmallIcon from '@mui/icons-material/DensitySmall';
import AccountBoxIcon from '@mui/icons-material/AccountBox';

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
      // display: 'block',
      // flexDirection: 'column',
      // backgroundColor: 'red',
      margin: '.7em',
      padding: '.5em 1em',
      fontFamily: 'Inter',
      fontSize: '.6em',
      '& p': {
        margin: 0,
      }
    },
    icon: {
      height: 'unset !important',
      fontSize: '3.5em !important',
      // display: 'block',
      // marginRight: '4px',
    },
  })

  const categoryStyle = useStyles();
  const { isAuthenticated } = useContext(AuthContext);

  return (
    <div id="container">

      <p className={categoryStyle.header} > Filter By Category </p>

      <Button className={categoryStyle.button} variant="contained" style={(props.activatedCategory === 'All' || !props.activatedCategory) ? { backgroundColor: "#729ec4", color: 'white' } : { backgroundColor: "#e3e3e3" }} onClick={() => props.inactive('All')}>
        <div>
          <DensitySmallIcon className={categoryStyle.icon} />
          <p>All</p>
        </div>
      </Button>

      {/* expected color below: */}
      {/* style={{ backgroundColor: '#729ec4', color: 'white' }} */}

      {isAuthenticated
        && <Button className={categoryStyle.button} variant="contained" style={(props.activatedCategory === 'My Services') ? { backgroundColor: "#729ec4", color: 'white' } : { backgroundColor: "#e3e3e3" }} onClick={() => props.active('My Services')}>
          <div>
            <AccountBoxIcon className={categoryStyle.icon} />
            <p>My Services</p>
          </div>
        </Button>
      }

      <Button className={categoryStyle.button} variant="contained" style={(props.activatedCategory === 'Accessibility') ? { backgroundColor: "#729ec4", color: 'white' } : { backgroundColor: "#e3e3e3" }} onClick={() => props.active('Accessibility')}>
        <div>
          <AccessibleIcon className={categoryStyle.icon} />
          <p>Accessibility</p>
        </div>
      </Button>

      {/* <Button className={categoryStyle.button} variant="contained" color={(props.activatedCategory === 'Web Design') ? "default" : "primary"} onClick={() => props.active('Web Design')}>
        Web Design
      </Button> */}

      <Button className={categoryStyle.button} variant="contained" style={(props.activatedCategory === 'Design') ? { backgroundColor: "#729ec4", color: 'white' } : { backgroundColor: "#e3e3e3" }} onClick={() => props.active('Design')}>
        <div>
          <DesignServicesIcon className={categoryStyle.icon} />
          <p>Design</p>
        </div>
      </Button>

      <Button className={categoryStyle.button} variant="contained" style={(props.activatedCategory === 'Apps') ? { backgroundColor: "#729ec4", color: 'white' } : { backgroundColor: "#e3e3e3" }} onClick={() => props.active('Apps')}>
        <div>
          <AppShortcutIcon className={categoryStyle.icon} />
          <p>Apps</p>
        </div>
      </Button>

      <Button className={categoryStyle.button} variant="contained" style={(props.activatedCategory === 'Tutoring') ? { backgroundColor: "#729ec4", color: 'white' } : { backgroundColor: "#e3e3e3" }} onClick={() => props.active('Tutoring')}>
        <div>
          <SchoolIcon className={categoryStyle.icon} />
          <p>Tutoring</p>
        </div>
      </Button>

      <Button className={categoryStyle.button} variant="contained" style={(props.activatedCategory === 'Misc') ? { backgroundColor: "#729ec4", color: 'white' } : { backgroundColor: "#e3e3e3" }} onClick={() => props.active('Misc')}>
        <div>
          <MoreHorizIcon className={categoryStyle.icon} />
          <p>Misc</p>
        </div>
      </Button>

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
