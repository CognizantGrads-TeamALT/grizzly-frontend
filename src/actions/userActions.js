import * as types from "./types";
import { USER_API_GATEWAY } from "./microservices";
import setAuthToken from "../utils/setAuthToken";
import axios from "axios";
import jwt_decode from "jwt-decode";
import isEmpty from "../validation/is-empty";

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
  localStorage.setItem("GrizzGoogleToken", tokenId);
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
export const getUserByEmail = email => dispatch => {
  dispatch(setUserLoading());
  axios
    .get(USER_API_GATEWAY + `/get/${email}/`)
    .then(res =>
      dispatch({
        type: types.GET_USER_BY_EMAIL,
        payload: res.data
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

// create or update user info
export const createOrUpdateProfile = profileData => dispatch => {
  dispatch(setUserLoading());
  axios
    .put(USER_API_GATEWAY + "/save", profileData)
    .then(res =>
      dispatch({
        type: types.USER_PROFILE_UPDATE,
        payload: res.data
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
  localStorage.removeItem("GrizzGoogleToken");
  // Remove auth header for future requests
  setAuthToken(false);
  // Clear current user, isAuthenticated to false
  dispatch(clearCurrentUser());
};

export const addOrder = newOrder => dispatch => {
  axios
    .put(USER_API_GATEWAY + "/addorder", newOrder)
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
