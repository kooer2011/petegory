import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import 'bootstrap/dist/css/bootstrap.min.css'
import { Provider } from 'react-redux'
import GroomBooking from './page/GroomBooking'
import stores from './redux/stores';
import { StepsProvider } from './page/Context';
const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <Provider store={stores}>
    <React.StrictMode>
      <App />
    </React.StrictMode>
  </Provider>, React.createElement(StepsProvider, null, React.createElement(GroomBooking, null))
  
);

