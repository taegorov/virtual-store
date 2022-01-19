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
import Profile from './components/profile/Profile';
import Signup from './components/signup/Signup';
import Login from './components/login/Login';
import { LogoutSnackbar } from './components/profile/LogoutSnackbar';
// import LoginForm from './components/login/Login'
// import Auth from './components/auth/Auth'


function App() {
  return (
    <>
      <Header />
      <SimpleCart />
      <LogoutSnackbar />
      {/* <LoginForm /> */}
      {/* <Auth capability="read"> */}
      {/* <p>Login Successful</p> */}
      <main>
        <Route exact path='/' component={Products} />
        <Route exact path='/products/:id' component={Details} />
        <Route exact path='/cart' component={ShoppingCart} />
        <Route exact path='/profile' component={Profile} />
        <Route exact path='/signup' component={Signup} />
        <Route exact path='/signin' component={Login} />
      </main>
      <Footer />
      {/* </Auth> */}
    </>
  );
}

export default App;
