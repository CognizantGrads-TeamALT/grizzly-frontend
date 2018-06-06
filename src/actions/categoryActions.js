import * as types from "./types";
import { CATEGORY_API_GATEWAY } from "./microservices";
import axios from "axios";

// Get Category List
export const getCategories = index => dispatch => {
  dispatch(setCategoryLoading());
  axios
    .get(CATEGORY_API_GATEWAY + `/get/${index}/default`)
    .then(res =>
      dispatch({
        type: types.GET_CATEGORIES,
        payload: res.data
      })
    )
    .catch(err => {
      dispatch(setCategoryUpdated());
      dispatch({
        type: types.GET_ERRORS,
        payload: err.response.data
      })
    });
};

// Add Category
export const addCategory = newCat => dispatch => {
  dispatch(setCategoryAdding());
  axios
    .put(CATEGORY_API_GATEWAY + "/add", newCat)
    .then(res =>
      dispatch({
        type: types.CATEGORY_ADDING,
        payload: res.data
      })
    )
    .catch(err => {
      dispatch(setCategoryUpdated());
      dispatch({
        type: types.GET_ERRORS,
        payload: err.response.data
      })
    });
};

// Edit Category
export const editCategory = newInfo => dispatch => {
  dispatch(setCategoryEditing());
  axios
    .post(CATEGORY_API_GATEWAY + `/edit/${newInfo.categoryId}`, newInfo)
    .then(res =>
      dispatch({
        type: types.CATEGORY_EDITED,
        payload: res.data
      })
    )
    .catch(err => {
      dispatch(setCategoryUpdated());
      dispatch({
        type: types.GET_ERRORS,
        payload: err.response.data
      })
    });
};

//Search Categories
export const searchCategories = keyword => dispatch => {
  dispatch(clearCurrentCategories());
  dispatch(setCategoryLoading());
  axios
    .get(CATEGORY_API_GATEWAY + `/search/${keyword}`)
    .then(res =>
      dispatch({
        type: types.GET_CATEGORIES,
        payload: res.data
      })
    )
    .catch(err => {
      dispatch(setCategoryUpdated());
      dispatch({
        type: types.GET_ERRORS,
        payload: err.response.data
      })
    });
};

// Category loading
export const setCategoryLoading = () => {
  return {
    type: types.CATEGORY_LOADING
  };
};

// Category adding
export const setCategoryAdding = () => {
  return {
    type: types.CATEGORY_ADDING
  };
};

// Category update
export const setCategoryUpdateOnce = () => {
  return {
    type: types.CATEGORY_UPDATING
  };
};

export const setCategoryUpdated = () => {
  return {
    type: types.CATEGORY_UPDATED
  };
};

// Category editing
export const setCategoryEditing = () => {
  return {
    type: types.CATEGORY_EDITING
  };
};

// Delete Category
export const deleteCategory = id => dispatch => {
  dispatch(setCategoryUpdateOnce());
  axios
    .delete(CATEGORY_API_GATEWAY + `/delete/${id}`)
    .then(res =>
      dispatch({
        type: types.CATEGORY_DELETING,
        payload: id
      })
    )
    .catch(err => {
      dispatch(setCategoryUpdated());
      dispatch({
        type: types.GET_ERRORS,
        payload: err.response.data
      })
    });
};

// Block/unlock Category
export const toggleBlockCategory = category => dispatch => {
  dispatch(setCategoryUpdateOnce());
  axios
    .post(CATEGORY_API_GATEWAY + `/setBlock/${category.categoryId}`, category)
    .then(res =>
      dispatch({
        type: types.CATEGORY_TOGGLEBLOCK,
        payload: res.data
      })
    )
    .catch(err => {
      dispatch(setCategoryUpdated());
      dispatch({
        type: types.GET_ERRORS,
        payload: err.response.data
      })
    });
};

// Sort Vendor by @param
export const sortCategoriesByParam = (index, param) => dispatch => {
  dispatch(clearCurrentCategories());
  dispatch(setCategoryLoading());
  axios
    .get(CATEGORY_API_GATEWAY + `/get/${index}/${param}`)
    .then(res =>
      dispatch({
        type: types.GET_CATEGORIES,
        payload: res.data
      })
    )
    .catch(err => {
      dispatch(setCategoryUpdated());
      dispatch({
        type: types.GET_ERRORS,
        payload: err.response.data
      })
    });
};

// Clear Categories
export const clearCurrentCategories = () => {
  return {
    type: types.CLEAR_CURRENT_CATEGORIES
  };
};