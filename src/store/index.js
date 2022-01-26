import { createStore, combineReducers, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';
import { composeWithDevTools } from 'redux-devtools-extension';
import categoriesReducer from './categories.js';
import productReducer from './products.js';
import cartReducer from './cart.js';
import miscReducer from './misc.js';


const reducers = combineReducers({
  categories: categoriesReducer,
  products: productReducer,
  cart: cartReducer,
  misc: miscReducer,
})


const store = () => {
  return createStore(reducers, composeWithDevTools(applyMiddleware(thunk)));
}

export default store;
