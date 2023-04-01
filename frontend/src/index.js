import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import { Provider } from "react-redux";
import { store, persistor } from "./redux/store";
import { PersistGate } from "redux-persist/integration/react";
import { BrowserRouter } from "react-router-dom";
import 'react-tooltip/dist/react-tooltip.css'
import ProductProvider from "./Admin/Components/SelectContext";

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
     <BrowserRouter>
    <Provider store={store}>
      <PersistGate loading={null} persistor={persistor}>
        <ProductProvider>
            <App />
          </ProductProvider>
        </PersistGate>
      </Provider>
    </BrowserRouter>
);