import * as types from "./types";
import { USER_API_GATEWAY } from "./microservices";
import axios from "axios";

// Get User List
export const getUsers = id = dispatch => {
    dispatch(setUserLoading());
    axios
      .get(USER_API_GATEWAY + `/get/${id}/`)
      .then(res =>
        dispatch({
          type: types.GET_USERS,
          payload: res.data
        })
      )
      .catch(err => {
        dispatch(setUserUpdated());
        dispatch({
          type: types.GET_ERRORS,
          payload: err.response.data
        })
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