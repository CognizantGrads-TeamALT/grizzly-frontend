import * as types from "./types";
import { PRODUCT_API_GATEWAY, CATEGORY_API_GATEWAY } from "./microservices";
import axios from "axios";
import { reloadProducts } from "./productsActions";

// Get Category List
export const getCategories = index => dispatch => {
  // Default the index to 0 if not given.
  index = index == null ? 0 : index;

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
      // For development purposes. The micro-services take time to initialise.
      // This will keep requesting data if it gets a 500 or 403 error...
      // Should be removed once we actually implement a feature to error or retry x times.
      if (index === 0)
        dispatch(getCategories(index));

      dispatch({
        type: types.GET_ERRORS,
        payload: err.response.data
      })
    });
};

export const Update_TypeAhead = values => dispatch => {
    dispatch({
      type: types.CATEGORY_TYPEAHEAD_UPDATE,
      payload: values
    })
  
}

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

// Search Categories
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

// Reload Categories
export const reloadCategories = () => dispatch => {
  dispatch(clearCurrentCategories());
  dispatch(getCategories());
}

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
    .then(res => {
      dispatch({
        type: types.CATEGORY_DELETING,
        payload: id
      });
      dispatch(disableCategoryProducts(id));
    })
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

// Disable products when deleting a category. No data is needed back.
export const disableCategoryProducts = id => dispatch => {
  axios
    .post(PRODUCT_API_GATEWAY + `/setBlockByCategory/${id}`)
    .then(res => {
      dispatch(reloadProducts());
    })
    .catch(err => {
      dispatch({
        type: types.GET_ERRORS,
        payload: err.response.data
      })
    });
}

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