import * as types from "./types";
import {
  PRODUCT_API_GATEWAY,
  CATEGORY_API_GATEWAY,
  VENDOR_API_GATEWAY
} from "./microservices";
import axios from "axios";

// Get Product List
export const getProducts = index => dispatch => {
  dispatch(setProductLoading());
  axios
    .get(PRODUCT_API_GATEWAY + `/get/${index}/default`)
    .then(res => {
      dispatch({
        type: types.GET_PRODUCTS,
        payload: res.data
      });

      let vendorIdArray = "";
      res.data
        .filter(prod => prod.vendorId !== 0)
        .map(
          prod =>
            vendorIdArray === ""
              ? (vendorIdArray = prod.vendorId)
              : (vendorIdArray = vendorIdArray + "," + prod.vendorId)
        );
      dispatch(getVendorBatch(vendorIdArray));

      let categoryIdArray = "";
      res.data
        .filter(prod => prod.categoryId !== 0)
        .map(
          prod =>
            categoryIdArray === ""
              ? (categoryIdArray = prod.categoryId)
              : (categoryIdArray = categoryIdArray + "," + prod.categoryId)
        );
      dispatch(getCategoryBatch(categoryIdArray));
      dispatch(setProductLoaded());
    })
    .catch(err =>
      dispatch({
        type: types.GET_ERRORS,
        payload: err.response.data
      })
    );
};

// Delete Product
export const deleteProduct = id => dispatch => {
  dispatch(setProductUpdateOnce());
  axios
    .delete(PRODUCT_API_GATEWAY + `/delete/${id}`)
    .then(res =>
      dispatch({
        type: types.PRODUCTS_DELETING,
        payload: id
      })
    )
    .catch(err =>
      dispatch({
        type: types.GET_ERRORS,
        payload: err.response.data
      })
    );
};

// Block/unlock Product
export const toggleBlockProduct = product => dispatch => {
  dispatch(setProductUpdateOnce());
  axios
    .post(PRODUCT_API_GATEWAY + `/setBlock/${product.productId}`, product)
    .then(res =>
      dispatch({
        type: types.PRODUCTS_TOGGLEBLOCK,
        payload: res.data
      })
    )
    .catch(err =>
      dispatch({
        type: types.GET_ERRORS,
        payload: err.response.data
      })
    );
};

// Edit Product
export const editProduct = newInfo => dispatch => {
  dispatch(setProductEditing());
  axios
    .post(PRODUCT_API_GATEWAY + `/edit/${newInfo.productId}`, newInfo)
    .then(res =>
      dispatch({
        type: types.PRODUCT_EDITED,
        payload: newInfo
      })
    )
    .catch(err =>
      dispatch({
        type: types.GET_PRODUCTS,
        payload: {}
      })
    );
};

// Product Editing
export const setProductEditing = () => {
  return {
    type: types.PRODUCT_EDITING
  };
};

// Product Loading
export const setProductLoading = () => {
  return {
    type: types.PRODUCTS_LOADING
  };
};

export const setProductLoaded = () => {
  return {
    type: types.PRODUCTS_LOADED
  };
};

// Product update
export const setProductUpdateOnce = () => {
  return {
    type: types.PRODUCTS_UPDATING
  };
};

// Product update
export const setProductUpdated = () => {
  return {
    type: types.PRODUCTS_UPDATED
  };
};

// Clear Products
export const clearCurrentProducts = () => {
  return {
    type: types.CLEAR_CURRENT_PRODUCTS
  };
};

export const getVendorBatch = vendorIdArray => dispatch => {
  axios
    .get(VENDOR_API_GATEWAY + `/batchFetch/${vendorIdArray}`)
    .then(res => {
      dispatch({
        type: types.GET_PRODUCT_VENDOR,
        payload: res.data
      });
    })
    .catch(err =>
      dispatch({
        type: types.GET_ERRORS,
        payload: err.response.data
      })
    );
};

export const getCategoryBatch = categoryIdArray => dispatch => {
  axios
    .get(CATEGORY_API_GATEWAY + `/batchFetch/${categoryIdArray}`)
    .then(res => {
      dispatch({
        type: types.GET_PRODUCT_CATEGORY,
        payload: res.data
      });
    })
    .catch(err =>
      dispatch({
        type: types.GET_ERRORS,
        payload: err.response.data
      })
    );
};
