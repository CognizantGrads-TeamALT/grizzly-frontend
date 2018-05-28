import { GET_VENDORS, VENDOR_LOADING } from "./types";
import axios from "axios";

// Get Vendor List
export const getVendors = () => dispatch => {
  dispatch(setVendorLoading());
  axios
    .get("vendormicro/vendor/all")
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
