import * as types from './types';
import { AUTH_API_GATEWAY, USER_API_GATEWAY } from './microservices';
import setAuthToken from '../utils/setAuthToken';
import axios from 'axios';
import jwt_decode from 'jwt-decode';
import {
  startJWTRefreshChecker,
  stopJWTRefreshChecker
} from '../utils/RefreshToken';
import isEmpty from '../validation/is-empty';

// Get Admins List
export const getUsers = (role, id) => dispatch => {
  dispatch(setUserLoading());
  axios
    .get(USER_API_GATEWAY + `/get/${role}/${id}/`)
    .then(res =>
      dispatch({
        type: types.GET_USERS,
        payload: res.data
      })
    )
    .catch(err => {
      dispatch({
        type: types.GET_ERRORS,
        payload: err.request.response
      });
      dispatch(setUserUpdated());
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
  startJWTRefreshChecker();
  // Set token to Auth header
  setAuthToken(tokenId);
  // Decode Token to get User Data from tokenId, not from tokenObj
  const decoded = jwt_decode(tokenId);
  // Set current user
  dispatch(loadUserInfo(decoded));
};

export const loadUserInfo = decoded => dispatch => {
  dispatch(setCurrentUser(decoded));
  dispatch(getUserByEmail(decoded.email));
};

// Set logged in user
export const setCurrentUser = googleProfile => {
  return {
    type: types.SET_CURRENT_USER,
    payload: googleProfile
  };
};

// Get user by email
export const getUserByEmail = () => dispatch => {
  dispatch(setUserLoading());
  axios
    .get(AUTH_API_GATEWAY + `/userData`)
    .then(res => {
      dispatch({
        type: types.GET_USER_BY_EMAIL,
        payload: res.data
      });
      dispatch(setUserUpdated());
    })
    .catch(err => {
      dispatch({
        type: types.GET_USER_BY_EMAIL,
        payload: {}
      });
      dispatch(setUserUpdated());
    });
};

// create or update user info
export const createOrUpdateProfile = profileData => dispatch => {
  dispatch(setUserLoading());
  axios
    .put(USER_API_GATEWAY + '/save', profileData)
    .then(res =>
      dispatch({
        type: types.USER_PROFILE_UPDATE,
        payload: res.data
      })
    )
    .catch(err => {
      dispatch({
        type: types.GET_ERRORS,
        payload: err.request.response
      });
      dispatch(setUserUpdated());
    });
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
    if (!isEmpty(window.gapi.auth2)) {
      const auth2 = window.gapi.auth2.getAuthInstance();
      if (auth2 != null) {
        auth2.signOut();
        auth2.disconnect();
      }
    }
  }

  axios.put(AUTH_API_GATEWAY + '/logout');

  // Remove token from localStorage
  localStorage.removeItem('GrizzGoogleToken');
  stopJWTRefreshChecker();
  localStorage.removeItem('check_jwt_refresh_timer');
  // Remove auth header for future requests
  setAuthToken(false);
  // Clear current user, isAuthenticated to false
  dispatch(clearCurrentUser());
};

export const addOrder = newOrder => dispatch => {
  axios
    .put(USER_API_GATEWAY + '/addOrder', newOrder)
    .then(res => {
      dispatch({
        type: types.ORDER_ADDING,
        payload: res.data
      });
    })
    .catch(err => {
      dispatch({
        type: types.GET_ERRORS,
        payload: err.response.data
      });
    });
};

// ORDER ACTIONS
// Get User Orders
export const getUserOrder = () => dispatch => {
  dispatch(setUserLoading());
  axios
    .get(USER_API_GATEWAY + `/get/orders`)
    .then(res =>
      dispatch({
        type: types.GET_USER_WITH_ORDER,
        payload: res.data
      })
    )
    .catch(err => {
      dispatch({
        type: types.GET_ERRORS,
        payload: err.request.response
      });
      dispatch(setUserUpdated());
    });
};
