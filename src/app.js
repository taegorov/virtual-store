import './app.css';

import Header from "./components/header/header.js";
import Footer from "./components/footer/footer.js";
import Products from "./components/storefront/products.js";
import { Provider } from 'react-redux';
import store from './store/index.js';
import SimpleCart from './components/cart/simplecart';


function App() {
  return (
    <>
      <Provider store={store()}>
        <Header />
        <SimpleCart />
        <main>
          <Products />
        </main>
        <Footer />
      </Provider>
    </>
  );
}

export default App;
