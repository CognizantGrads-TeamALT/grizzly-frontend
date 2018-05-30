import {
  GET_VENDORS,
  VENDOR_LOADING,
  VENDOR_DELETING,
  GET_ERRORS
} from "./types";
import { VENDOR_API_GATEWAY } from "./microservices";
import axios from "axios";

// Get Vendor List
export const getVendors = () => dispatch => {
  dispatch(setVendorLoading());
  axios
    .get(VENDOR_API_GATEWAY + "/all/default")
    .then(res =>
      dispatch({
        type: GET_VENDORS,
        payload: res.data
      })
    )
    .catch(err =>
      dispatch({
        type: GET_VENDORS,
        payload: {}
      })
    );
};

// Sort Vendor by @param
export const sortVendorsByParam = param => dispatch => {
  dispatch(setVendorLoading());
  axios
    .get(VENDOR_API_GATEWAY + `/all/${param}`)
    .then(res =>
      dispatch({
        type: GET_VENDORS,
        payload: res.data
      })
    )
    .catch(err =>
      dispatch({
        type: GET_VENDORS,
        payload: {}
      })
    );
};

// Search Vendors
export const searchVendors = keyword => dispatch => {
  dispatch(setVendorLoading());
  axios
    .get(VENDOR_API_GATEWAY + `/search/${keyword}`)
    .then(res =>
      dispatch({
        type: GET_VENDORS,
        payload: res.data
      })
    )
    .catch(err =>
      dispatch({
        type: GET_VENDORS,
        payload: {}
      })
    );
};

// Vendor loading
export const setVendorLoading = () => {
  return {
    type: VENDOR_LOADING
  };
};

// Delete Vendor
export const deleteVendor = id => dispatch => {
  dispatch(setVendorDeleting());
  axios
    .delete(VENDOR_API_GATEWAY + `/delete/${id}`)
    .then(res => dispatch(getVendors()))
    .catch(err =>
      dispatch({
        type: GET_ERRORS,
        payload: err.response.data
      })
    );
};

// Vendor loading
export const setVendorDeleting = () => {
  return {
    type: VENDOR_DELETING
  };
};
