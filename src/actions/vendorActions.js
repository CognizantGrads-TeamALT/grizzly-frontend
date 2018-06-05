import * as types from "./types";
import { VENDOR_API_GATEWAY } from "./microservices";
import axios from "axios";

// Get Vendor List
export const getVendors = index => dispatch => {
  dispatch(setVendorLoading());
  axios
    .get(VENDOR_API_GATEWAY + `/get/${index}/default`)
    .then(res =>
      dispatch({
        type: types.GET_VENDORS,
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

// Add Vendor
export const addVendor = newVendor => dispatch => {
  dispatch(setVendorAdding());
  axios
    .put(VENDOR_API_GATEWAY + "/add", newVendor)
    .then(res =>
      dispatch({
        type: types.VENDOR_ADDING,
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

// Sort Vendor by @param
export const sortVendorsByParam = (index, param) => dispatch => {
  dispatch(clearCurrentVendors());
  dispatch(setVendorLoading());
  axios
    .get(VENDOR_API_GATEWAY + `/get/${index}/${param}`)
    .then(res =>
      dispatch({
        type: types.GET_VENDORS,
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

// Search Vendors
export const searchVendors = keyword => dispatch => {
  dispatch(clearCurrentVendors());
  dispatch(setVendorLoading());
  axios
    .get(VENDOR_API_GATEWAY + `/search/${keyword}`)
    .then(res =>
      dispatch({
        type: types.GET_VENDORS,
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

// Vendor loading
export const setVendorLoading = () => {
  return {
    type: types.VENDOR_LOADING
  };
};

// Vendor update
export const setVendorUpdateOnce = () => {
  return {
    type: types.VENDOR_UPDATING
  };
};

export const setVendorUpdated = () => {
  return {
    type: types.VENDOR_UPDATED
  };
};

// Vendor loading
export const setVendorAdding = () => {
  return {
    type: types.VENDOR_ADDING
  };
};

// Delete Vendor
export const deleteVendor = id => dispatch => {
  dispatch(setVendorUpdateOnce());
  axios
    .delete(VENDOR_API_GATEWAY + `/delete/${id}`)
    .then(res =>
      dispatch({
        type: types.VENDOR_DELETING,
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

// Clear Vendors
export const clearCurrentVendors = () => {
  return {
    type: types.CLEAR_CURRENT_VENDORS
  };
};
