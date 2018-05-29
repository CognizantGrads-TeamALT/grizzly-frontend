import { GET_VENDORS, VENDOR_LOADING } from "./types";
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
  const { search } = keyword;
  axios
    .get(API_GATEWAY + `/vendor/search/${search}`)
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
