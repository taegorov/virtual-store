import './app.css';

import Header from "./components/header/header.js";
import Footer from "./components/footer/footer.js";
import Products from "./components/storefront/products.js";
// import { Provider } from 'react-redux';
// import store from './store/index.js';
import SimpleCart from './components/cart/simplecart';
import { Route } from 'react-router-dom';
import Details from './components/product-details/details';
import ShoppingCart from './components/cart/shopping-cart';
import Profile from './components/profile/Profile'
import LoginForm from './components/login/Login'
import Auth from './context/Auth'


function App() {
  return (
    <>
      <Header />
      <SimpleCart />
      <LoginForm />
      <Auth capability="delete">
        <p>🙌 hearye hearye, administrator with delete privilege 🙌</p>
        <main>
          <Route exact path='/' component={Products} />
          <Route exact path='/products/:id' component={Details} />
          <Route exact path='/cart' component={ShoppingCart} />
          <Route exact path='/profile' component={Profile} />
        </main>
        <Footer />
      </Auth>
    </>
  );
}

export default App;
