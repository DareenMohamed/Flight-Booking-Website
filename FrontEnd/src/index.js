import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import { Provider } from 'react-redux';
import { createStore } from 'redux'
import store from './Components/Redux/ReduxStore.js';
import { BrowserRouter } from "react-router-dom";
import { PersistGate } from 'redux-persist/integration/react'
import { StripeProvider } from 'react-stripe-elements';

ReactDOM.render(

  <BrowserRouter>
    <StripeProvider apiKey="pk_test_51K8WOHIYl2C21a0ipNQ7WCFMRnk9uH4PWjzveKHYpTvSZDSpeRiSFzngUad1KrMlMgH4Gj2abYkBKgkiZU0I15k200aw9HHZ2P">
      <Provider store={store.store}>
        <PersistGate loading={null} persistor={store.persistor}>
          <React.StrictMode>

            <App />


          </React.StrictMode>
        </PersistGate>
      </Provider>
    </StripeProvider>
  </BrowserRouter>,
  document.getElementById('root')
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
