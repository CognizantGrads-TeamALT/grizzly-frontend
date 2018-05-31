import {
  GET_CATEGORIES,
  CATEGORY_LOADING,
  CATEGORY_ADDING,
  CATEGORY_EDITING,
  CATEGORY_EDITED,
  CATEGORY_DELETING,
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

// Edit Category
export const editCategory = newInfo => dispatch => {
  dispatch(setCategoryEditing());
  axios
    .post(CATEGORY_API_GATEWAY + `/edit/${newInfo.categoryId}`, newInfo)
    .then(res =>
      dispatch({
        type: CATEGORY_EDITED,
        payload: newInfo
      })
    )
    .catch(err =>
      dispatch({
        type: GET_CATEGORIES,
        payload: {}
      })
    );
};

//Search Categories
export const searchCategories = keyword => dispatch => {
  dispatch(setCategoryLoading());
  axios
    .get(CATEGORY_API_GATEWAY + `/search/${keyword}`)
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

// Category loading
export const setCategoryLoading = () => {
  return {
    type: CATEGORY_LOADING
  };
};

// Category adding
export const setCategoryAdding = () => {
  return {
    type: CATEGORY_ADDING
  };
};

// Category editing
export const setCategoryEditing = () => {
  return {
    type: CATEGORY_EDITING
  };
};

// Delete Category
export const deleteCategory = id => dispatch => {
  axios
    .delete(CATEGORY_API_GATEWAY + `/delete/${id}`)
    .then(res =>
      dispatch({
        type: CATEGORY_DELETING,
        payload: id
      })
    )
    .catch(err =>
      dispatch({
        type: GET_ERRORS,
        payload: err.response.data
      })
    );
};
