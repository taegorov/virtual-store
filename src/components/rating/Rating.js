import React, { useState, useContext } from 'react';
import { connect } from 'react-redux'
// import { Rating } from 'react-simple-star-rating'
import StarRatings from 'react-star-ratings';
import { addRating } from '../../store/products';
import { AuthContext } from '../../context/Auth';


function StarRating({ serviceId, addRating, service }) {
  const [rating, setRating] = useState(0) // initial rating value
  const { user } = useContext(AuthContext);


  const handleRating = (rate) => {
    console.log(rate, serviceId);
    setRating(rate);
    addRating({ rate, serviceId, user });
  }

  return (
    <div>
      <StarRatings changeRating={handleRating} rating={rating} starDimension="25px" starSpacing="3px" starRatedColor="#e6bf05" />
      {!service.totalRatings
        ? <p>Service Not Yet Rated</p>
        : <p> rating is: {Math.round(service.averageRating)} from {service.totalRatings} ratings</p>
      }
    </div>
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
