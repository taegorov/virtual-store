import React, { useState, useContext } from 'react'
import { connect } from 'react-redux'
import { Rating } from 'react-simple-star-rating'
import { addRating } from '../../store/products'
import { AuthContext } from '../../context/Auth'


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
      <Rating onClick={handleRating} ratingValue={rating} allowHalfIcon="true" />
      {!service.totalRatings
        ? <p>Service Not Yet Rated</p>
        : <p> rating is: {service.averageRating / 20} from {service.totalRatings} ratings</p>
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
