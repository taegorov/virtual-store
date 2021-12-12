import React from 'react';
import ReactDOM from 'react-dom';
import App from './app.js';
// import reportWebVitals from './reportWebVitals';
import { BrowserRouter } from 'react-router-dom';
import { Provider } from 'react-redux';
import store from './store/index.js';
import AuthProvider from './context/Auth'

function Main() {
  return (
    // <React.StrictMode>
    <AuthProvider>
      <Provider store={store()}>
        <BrowserRouter>
          <App />
        </BrowserRouter>
      </Provider>
    </AuthProvider>
    // </React.StrictMode>,
    // document.getElementById('root')
  );
}


const rootElement = document.getElementById('root');
ReactDOM.render(<Main />, rootElement);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
// reportWebVitals();
