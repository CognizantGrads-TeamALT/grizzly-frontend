import * as types from "./types";
import { PRODUCT_API_GATEWAY, CATEGORY_API_GATEWAY } from "./microservices";
import axios from "axios";
import { reloadProducts } from "./productsActions";
import isEmpty from "../validation/is-empty";

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
      dispatch({
        type: types.GET_ERRORS,
        payload: err.request.response
      })
      dispatch(setCategoryUpdated());
      // For development purposes. The micro-services take time to initialise.
      // This will keep requesting data if it gets a 500 or 403 error...
      // Should be removed once we actually implement a feature to error or retry x times.
      // if (index === 0)
      //   dispatch(getCategories(index));
      
    });
};
//Category TypeAhead
export const Update_TypeAhead = values => dispatch => {
    dispatch({
      type: types.CATEGORY_TYPEAHEAD_UPDATE,
      payload: values
    })
}

// Add Category
export const addCategory = newCat => dispatch => {
  dispatch(clearErrors());
  dispatch(setCategoryAdding());
  axios
    .put(CATEGORY_API_GATEWAY + "/add", newCat)
    .then(res =>{
      dispatch({
        type: types.CATEGORY_ADDING,
        payload: res.data
      })
      dispatch(stopWaitingForError())
  }
    )
    .catch(err => {
      dispatch(setCategoryUpdated());
      dispatch({
        type: types.GET_ERRORS,
        payload: err.request.response
      })
    });
};

// Edit Category
export const editCategory = newInfo => dispatch => {
  dispatch(clearErrors());
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
        payload: err.request.response
      })
    });
};

// Search Categories
export const searchCategories = keyword => dispatch => {
  dispatch(clearCurrentCategories());
  dispatch(setCategoryLoading());
  axios
    .get(CATEGORY_API_GATEWAY + `/search/${keyword}`)
    .then(res =>{
      dispatch({
        type: types.GET_CATEGORIES,
        payload: res.data
      })
    })
    .catch(err => {
      dispatch(setCategoryUpdated());
      dispatch({
        type: types.GET_ERRORS,
        payload: err.request.response
      })
    });
};

// Reload Categories
export const reloadCategories = () => dispatch => {
  dispatch(clearCurrentCategories());
  dispatch(getCategories());
}

export const clearErrors = values => dispatch => {
  dispatch({type: types.CLEAR_ERRORS})
}

export const WaitForError = () => {
  return {type: types.START_WAITING}
}

export const stopWaitingForError = () => {
  return {type: types.STOP_WAITING}
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
  dispatch(clearErrors());
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
        payload: err.request.response
      })
    });
};

// Block/unlock Category
export const toggleBlockCategory = (categoryId, enabled) => dispatch => {
  dispatch(clearErrors());
  dispatch(setCategoryUpdateOnce());
  axios
    .post(CATEGORY_API_GATEWAY + `/setBlock/${categoryId}`, {'enabled': enabled})
    .then(res =>{
      dispatch({
        type: types.CATEGORY_TOGGLEBLOCK,
        payload: res.data
      });
      // disabled because this should not be blocking all products.
      //if(enabled===false)
      //  dispatch(disableCategoryProducts(categoryId, true));
    })
    .catch(err => {
      dispatch(setCategoryUpdated());
      dispatch({
        type: types.GET_ERRORS,
        payload: err.request.response
      })
    });
};

// Disable products when deleting a category. No data is needed back.
export const disableCategoryProducts = (id, block) => dispatch => {
  if(isEmpty(block))
    block=false;
  axios
    .post(PRODUCT_API_GATEWAY + `/setBlockByCategory/${id}/${block}`)
    .then(res => {
      dispatch(reloadProducts());
    })
    .catch(err => {
      dispatch({
        type: types.GET_ERRORS,
        payload: err.request.response
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
        payload: err.request.response
      })
    });
};

// Sort Vendor by @param
// Throws anti-pattern errors if the original was called due to the other dispatch calls.
export const sortCategoriesByParamCustomer = (index, param) => dispatch => {
  axios
    .get(CATEGORY_API_GATEWAY + `/get/${index}/${param}`)
    .then(res =>
      dispatch({
        type: types.GET_CATEGORIES,
        payload: res.data
      })
    )
    .catch(err => {
      dispatch({
        type: types.GET_ERRORS,
        payload: err.request.response
      })
    });
};

// Clear Categories
export const clearCurrentCategories = () => {
  return {
    type: types.CLEAR_CURRENT_CATEGORIES
  };
};

