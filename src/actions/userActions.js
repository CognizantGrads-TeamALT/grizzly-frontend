import * as types from './types';
import { USER_API_GATEWAY } from './microservices';
import axios from 'axios';

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
        payload: err.request.response
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

// Clear current user
export const clearCurrentUser = () => {
  return {
    type: types.CLEAR_CURRENT_USER
  };
};
