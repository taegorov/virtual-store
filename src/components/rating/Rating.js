import React, { useState, useContext } from 'react';
import { connect } from 'react-redux'
// import { Rating } from 'react-simple-star-rating'
import StarRatings from 'react-star-ratings';
import { addRating } from '../../store/products';
import { AuthContext } from '../../context/Auth';
import { makeStyles } from '@mui/styles'


function StarRating({ serviceId, addRating, service }) {

  const useStyles = makeStyles({
    main: {
      fontFamily: 'Inter',
    }
  })


  const [rating, setRating] = useState(0) // initial rating value
  const { user, isAuthenticated } = useContext(AuthContext);
  const ratingStyle = useStyles();


  const handleRating = (rate) => {
    console.log(rate, serviceId);
    setRating(rate);
    addRating({ rate, serviceId, user });
  }

  console.log('service total ratings', service.totalRatings)

  return (
    <div>
      {isAuthenticated && <StarRatings changeRating={handleRating} rating={rating} starDimension="25px" starSpacing="3px" starRatedColor="#e6bf05" />}
      {!parseInt(service.totalRatings)
        ? <p className={ratingStyle.main}> Service Not Yet Rated </p>
        : <p className={ratingStyle.main}> {Math.round(service.averageRating * 10) / 10} from {service.totalRatings} ratings </p>
      }
    </div >
  )
}


const mapStateToProps = (state) => {
  // console.log('🎲 state.cart ', state.cart)
  return {

  }
}

const mapDispatchToProps = {
  addRating,
}


export default connect(mapStateToProps, mapDispatchToProps)(StarRating);
