import * as types from './types';
import { USER_API_GATEWAY } from './microservices';
import setAuthToken from '../utils/setAuthToken';
import axios from 'axios';
import jwt_decode from 'jwt-decode';
import isEmpty from '../validation/is-empty';

// Get Admins List
export const getUsers = (userType, id) => dispatch => {
  dispatch(setUserLoading());
  axios
    .get(USER_API_GATEWAY + `/get/${userType}/${id}/`)
    .then(res =>
      dispatch({
        type: types.GET_USERS,
        payload: res.data,
        userType: userType
      })
    )
    .catch(err => {
      dispatch(setUserUpdated());
      dispatch({
        type: types.GET_ERRORS,
        payload: err.response.data
      });
    });
};

// User loading
export const setUserLoading = () => {
  return {
    type: types.USER_LOADING
  };
};

// User update
export const setUserUpdateOnce = () => {
  return {
    type: types.USER_UPDATING
  };
};

export const setUserUpdated = () => {
  return {
    type: types.USER_UPDATED
  };
};

// Log user in
export const loginUser = googleResponse => dispatch => {
  // Save to localStorage
  const { tokenId } = googleResponse;
  // Set token to localStorage
  localStorage.setItem('GrizzGoogleToken', tokenId);
  // Set token to Auth header
  setAuthToken(tokenId);
  // Decode Token to get User Data from tokenId, not from tokenObj
  const decoded = jwt_decode(tokenId);
  // Set current user
  dispatch(setCurrentUser(decoded));
};

// Set logged in user
export const setCurrentUser = googleProfile => {
  return {
    type: types.SET_CURRENT_USER,
    payload: googleProfile
  };
};

// Clear current user
export const clearCurrentUser = () => {
  return {
    type: types.CLEAR_CURRENT_USER
  };
};

// Log user out
export const logoutUser = () => dispatch => {
  if (!isEmpty(window.gapi)) {
    const auth2 = window.gapi.auth2.getAuthInstance();
    if (auth2 != null) {
      auth2.signOut();
      auth2.disconnect();
    }
  }
  // Remove token from localStorage
  localStorage.removeItem('GrizzGoogleToken');
  // Remove auth header for future requests
  setAuthToken(false);
  // Clear current user, isAuthenticated to false
  dispatch(clearCurrentUser());
};

// ORDER ACTIONS
// Get User Orders 
export const getUserOrder = (userId, orderId) => dispatch => {
  dispatch(setUserLoading());
  axios.all([
    axios.get(USER_API_GATEWAY + `/get/orders/${userId}`),
    axios.get(USER_API_GATEWAY + `/getOrder/${userId}/${orderId}`)
  ])  
  .then( axios.spread((orders, orderDetails) => {
    dispatch({
      type: types.GET_USER_ORDER,
      payload: orders.data,
      orderDetails: orderDetails.data
    });
  }))
  .catch(err => {
    dispatch(setUserUpdated());
    dispatch({
      type: types.GET_ERRORS,
      payload: err.response.data
    });
  })
};

// Get An Order with Items
export const getSingleOrderWithOrderItems = (orderId, orderItemId) => dispatch => {
  dispatch(setUserLoading());
  axios.all([
    axios.get(USER_API_GATEWAY + `/get/orderItems/${orderId}`),
    axios.get(USER_API_GATEWAY + `/getOrderItem/${orderId}/${orderItemId}`)
  ])  
  .then(axios.spread( (order, items) => {
    dispatch({
      type: types.GET_ORDER_ITEMS,
      payload: order.data,
      orderItems: items.data
    });
    dispatch(setUserUpdated());
  }))
  .catch(err => {
    dispatch(setUserUpdated());
    dispatch({
      type: types.GET_ERRORS,
      payload: err.response.data
    });
  })
};

