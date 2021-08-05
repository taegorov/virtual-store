import './app.css';

import Header from "./components/header/header.js";
import Footer from "./components/footer/footer.js";
import Products from "./components/storefront/products.js";
// import { Provider } from 'react-redux';
// import store from './store/index.js';
import SimpleCart from './components/cart/simplecart';
import { Route } from 'react-router-dom';
import Details from './components/product-details/details';
import Cart from './components/cart/shopping-cart';


function App() {
  return (
    <>
      {/* <Provider store={store()}> */}
      <Header />
      <SimpleCart />
      <main>
        {/* <Products /> */}
        <Route exact path='/' component={Products} />
        <Route exact path='/products/:id' component={Details} />
        <Route exact path='/cart' component={Cart} />
      </main>
      <Footer />
      {/* </Provider> */}
    </>
  );
}

export default App;
