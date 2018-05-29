import { GET_VENDORS, VENDOR_LOADING } from "./types";
import axios from "axios";

const API_GATEWAY = "http://localhost:8765/";

// Get Vendor List
export const getVendors = () => dispatch => {
  dispatch(setVendorLoading());
  axios
    .get(API_GATEWAY + "vendormicro/vendor/all")
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
    .get(API_GATEWAY + `vendormicro/vendor/search/${search}`)
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
