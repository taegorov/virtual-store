// === === imports === === //
// import dog from '../assets/dog.jpg'
import axios from 'axios';
import { root } from '../helper'


require('dotenv').config();



// === === defining product list initial state === === //
const initialState = {
  // productList: [
  //   { _id: '1', name: "1TB USB", category: "Electronics", inStock: 1936, price: 100.99, image: 'https://i.pinimg.com/originals/c2/fb/a5/c2fba56aceb0d5ca0de6b65abef08567.jpg' },
  //   { _id: '2', name: "Monitor", category: "Electronics", inStock: 1926, price: 100.99, image: 'https://i.pinimg.com/originals/c6/a1/f8/c6a1f802ee6da25e2e06017b31c013a3.jpg' },
  //   { _id: '3', name: "Mouse", category: "Electronics", inStock: 886, price: 100.99, image: 'https://i.pinimg.com/originals/00/f2/c5/00f2c564471453d5913b3cffff49245b.jpg' },
  //   { _id: '4', name: "Keyboard", category: "Electronics", inStock: 931, price: 100.99, image: 'https://i.pinimg.com/originals/28/9a/aa/289aaa4d8e15656d83bebd09a0b67a6a.jpg' },
  //   { _id: '5', name: "TV", category: "Electronics", inStock: 1825, price: 698, image: 'https://i.redd.it/lc9fnc4nix411.jpg' },

  //   { _id: '6', name: "Apples", category: "Food", inStock: 792, price: 100.1, image: 'https://blogs-images.forbes.com/bethhoffman/files/2012/04/Apple.jpg' },
  //   { _id: '7', name: "Calzones", category: "Food", inStock: 777, price: 100.1, image: 'https://i0.wp.com/dinnersdishesanddesserts.com/wp-content/uploads/2019/11/Calzones-2-square.jpg?fit=621%2C600&ssl=1' },
  // ],

  productList: [],
  activeProduct: {},
  products: [],
  // image: '',
}


// === === export === === //
export default function productReducer(state = initialState, action) {
  const { type, payload } = action;
  switch (type) {
    case 'ACTIVE':
      const products = getProducts(payload.category);
      return { ...state, products: products }
    case 'LOAD_PRODUCTS':
      return {
        ...state,
        productList: payload,
      }
    case 'GET_ONE_PRODUCT':
      return {
        ...state,
        activeProduct: payload,
      }
    case 'ADD_TO_CART':
      const deductor = state.productList.filter(item => {
        return item === payload;
      })
      payload.inStock -= 1;
      deductor.push(payload);
      return { ...state, newList: deductor };
    case 'UPDATE_RATING':
      console.log(payload, 'UPDATE payload')
      const newList = state.productList.map(product => {
        if (product.id === payload.serviceId) {
          return { ...product, averageRating: payload.averageRating, totalRatings: payload.totalRatings }
        }
        return product
      })
      console.log(newList, 'NEW LIST: ')
      return { ...state, productList: newList, activeProduct: { ...state.activeProduct, ...payload } };
    default:
      return state;
  }
}

// === === export again === === //
export const getProducts = (category) => {
  const products = initialState.productList;
  // console.log('👾 initial state product list', initialState.productList);
  const response = products.filter(product => product.category === category);
  return response;
}

// === === export again again === === //

export const loadProducts = () => (dispatch, getState) => {
  console.log('process.env is: ', process.env)
  console.log('server DEV is: ', process.env.SERVER_DEV)
  console.log('server PROD is: ', process.env.REACT_APP_SERVER_PROD)
  // axios.get((process.env.NODE_ENV === 'production' ? process.env.REACT_APP_SERVER_PROD : process.env.REACT_APP_SERVER_DEV) + '/services')
  axios.get(root + '/services')
    .then(response => {
      console.log('🤬 response.data', response.data);
      dispatch({
        type: 'LOAD_PRODUCTS',
        payload: response.data
      })
    })
}

export const getProductById = ({ serviceId }) => async (dispatch, getState) => {
  console.log(serviceId, 'service ID in redux')
  const singleProduct = await axios.get(`${root}/services/${serviceId}`);
  console.log(singleProduct, 'single product is');
  dispatch({
    type: 'GET_ONE_PRODUCT',
    payload: singleProduct.data,
  })
}

export const addRating = ({ rate, serviceId, user }) => async (dispatch, getState) => {
  console.log('addRating is: ', rate, serviceId)
  const ratingData = await axios({
    method: 'put',
    url: `${root}/services/${serviceId}/rating`,
    data: { rating: rate },
    headers: {
      'Authorization': 'Bearer ' + user.token
    }
  });
  const { averageRating, totalRatings } = ratingData.data.data[0]
  console.log('RATING DATA 2.0: ', averageRating, totalRatings);
  dispatch({
    type: 'UPDATE_RATING',
    payload: { averageRating, totalRatings, serviceId }
  })
}

export function addToCart(name) {
  return {
    type: 'ADD_TO_CART',
    payload: name,
  }
}
