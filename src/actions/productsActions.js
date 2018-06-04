
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
        type: types.GET_PRODUCTS,
        payload: {}
      })
    );
};

export const setProductAdding = () =>{
    return{
        type: types.PRODUCT_ADDING
    };
};

export const addProduct = newProd => dispatch => {
    dispatch(setProductLoading());
    axios
      .put(PRODUCT_API_GATEWAY + "/add", newProd)
      .then(res => dispatch(getProducts()))
      .catch(err =>
        dispatch({
          type: types.GET_ERRORS,
          payload: {}
        })
      );
  };

  // Clear Products
export const clearCurrentProducts = () => {
    return {
      type: types.CLEAR_CURRENT_PRODUCTS
    };
  };

// Product Loading
export const setProductLoading = () => {
  return {
    type: types.PRODUCTS_LOADING
  };
};



