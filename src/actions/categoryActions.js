import {
  GET_CATEGORIES,
  CATEGORY_LOADING,
  CATEGORY_ADDING,
  GET_ERRORS
} from "./types";
import { CATEGORY_API_GATEWAY } from "./microservices";
import axios from "axios";

// Get Category List
export const getCategories = () => dispatch => {
  dispatch(setCategoryLoading());
  axios
    .get(CATEGORY_API_GATEWAY + "/all/default")
    .then(res =>
      dispatch({
        type: GET_CATEGORIES,
        payload: res.data
      })
    )
    .catch(err =>
      dispatch({
        type: GET_CATEGORIES,
        payload: {}
      })
    );
};

// Add Category
export const addCategory = newCat => dispatch => {
  dispatch(setCategoryAdding());
  axios
    .put(CATEGORY_API_GATEWAY + "/add", newCat)
    .then(res => dispatch(getCategories()))
    .catch(err =>
      dispatch({
        type: GET_ERRORS,
        payload: {}
      })
    );
};

// Category loading
export const setCategoryLoading = () => {
  return {
    type: CATEGORY_LOADING
  };
};

// Category loading
export const setCategoryAdding = () => {
  return {
    type: CATEGORY_ADDING
  };
};
