import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import 'react-toastify/dist/ReactToastify.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'jquery/dist/jquery.slim.min.js';
import 'popper.js/dist/umd/popper.js';
import 'bootstrap/dist/js/bootstrap.min.js';
import App from './App';
import registerServiceWorker from './registerServiceWorker';
import { Provider } from 'react-redux';
import jwt_decode from 'jwt-decode';
import { loadUserInfo, logoutUser } from './actions/userActions';
import setAuthToken from './utils/setAuthToken';
import { startJWTRefreshChecker } from './utils/RefreshToken';
import store from './store';

startJWTRefreshChecker();
// Check for timeout, log user out if needed
// Check for token
if (localStorage.GrizzGoogleToken) {
  // Refresh token when expired (log user out after 10 refreshes)


  //Decode token and get user info and expiration
  const decoded = jwt_decode(localStorage.GrizzGoogleToken);

  // Check for expired token
  const currentTime = Date.now() / 1000;
  if (decoded.exp < currentTime) {
    // Log user out
    store.dispatch(logoutUser());
    // Redirect
    window.location.href = '/';
  } else {
    //Set auth token header auth
    setAuthToken(localStorage.GrizzGoogleToken);
    store.dispatch(loadUserInfo(decoded));
  }
}

ReactDOM.render(
  <Provider store={store}>
    <App />
  </Provider>,
  document.getElementById('root')
);
registerServiceWorker();
