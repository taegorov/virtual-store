import { createStore, combineReducers } from 'redux';

import { composeWithDevTools } from 'redux-devtools-extension';
import categoriesReducer from './categories.js';
import productReducer from './products.js';

const reducers = combineReducers({
  categories: categoriesReducer,
  products: productReducer,
})


const store = () => {
  return createStore(reducers, composeWithDevTools());
}

export default store;
