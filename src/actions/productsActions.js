import * as types from "./types";
import { PRODUCT_API_GATEWAY } from "./microservices";
import axios from "axios";

// Get Product List
export const getProducts = index => dispatch => {
  dispatch(setProductLoading());
  axios
    .get(PRODUCT_API_GATEWAY + `/get/${index}/default`)
    .then(res =>
      dispatch({
        type: types.GET_PRODUCTS,
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
    .post(PRODUCT_API_GATEWAY + `/setBlock/${product.productId}/`, product)
    .then(res =>
      dispatch({
        type: types.PRODUCTS_EDITED,
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

// Product Loading
export const setProductLoading = () => {
  return {
    type: types.PRODUCTS_LOADING
  };
};

// Product update
export const setProductUpdateOnce = () => {
  return {
    type: types.PRODUCTS_UPDATING
  };
};

// Clear Products
export const clearCurrentProducts = () => {
  return {
    type: types.CLEAR_CURRENT_PRODUCTS
  };
};
