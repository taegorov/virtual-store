let initialState = {
  cart: {},
}

export default function cartReducer(state = initialState, action) {
  const { type, payload } = action;

  switch (type) {
    case 'ADD_TO_CART':
      const cartStateCopy = { ...state.cart }
      if (cartStateCopy[payload.id]) {
        cartStateCopy[payload.id].quantity += 1;
      } else {
        cartStateCopy[payload.id] = payload
        cartStateCopy[payload.id].quantity = 1
      }
      console.log('newCart', cartStateCopy)
      // return { ...state, cart: [...state.cart, payload] }
      return { ...state, cart: cartStateCopy }


    case 'DECREASE_FROM_CART':
      const cartCopyDecrease = { ...state.cart }
      if (cartCopyDecrease[payload.id]) {
        cartCopyDecrease[payload.id].quantity -= 1;
      }
      // let cart = [...state.cart];
      // let deleteOne = true;
      // // const myCart = cart.slice(0, -1);
      // // console.log('myCart', myCart);
      // let newCart = cart.filter(item => {
      //   if (item === payload && deleteOne) {
      //     deleteOne = false;
      //     return false;

      //   } else {
      //     return true;
      //   }
      // })
      // return { ...state, cart: [...newCart] }
      return { ...state, cart: cartCopyDecrease }
    default:
      return state;
  }
}


export function addToCart(name) {
  return {
    type: 'ADD_TO_CART',
    payload: name,
  }
}

export function removeFromCart(name) {
  return {
    type: 'DECREASE_FROM_CART',
    payload: name,
  }
}
