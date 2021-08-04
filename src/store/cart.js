let initialState = {
  cart: [],
}

export default function cartReducer(state = initialState, action) {
  const { type, payload } = action;

  switch (type) {
    case 'ADD_TO_CART':
      return { ...state, cart: [...state.cart, payload] }

    case 'REMOVE_FROM_CART':
      let cart = [...state.cart];
      let deleteOne = true;
      let newCart = cart.filter(item => {
        if (item === payload && deleteOne) {
          deleteOne = false;
          return false;

        } else {
          return true;
        }
      })
      return { ...state, cart: [...newCart] }
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
    type: 'REMOVE_FROM_CART',
    payload: name,
  }
}
