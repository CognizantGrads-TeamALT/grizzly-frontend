import { GET_VENDORS, VENDOR_LOADING } from "./types";

// Fake the list
const vendors = [
  {
    id: "1",
    name: "Bob",
    location: "Home",
    contact: "0404040404"
  },
  {
    id: "2",
    name: "Jane",
    location: "Home",
    contact: "0404040404"
  },
  {
    id: "3",
    name: "Marty",
    location: "Home",
    contact: "0404040404"
  }
];
// var vendorsJSON = JSON.stringify(vendors);
// var vendorsJSON = JSON.parse(JSON.stringify(vendors));
// Get Vendor List
export const getVendors = () => dispatch => {
  dispatch(setVendorLoading());
  dispatch({
    type: GET_VENDORS,
    payload: vendors
  });
};

// Profile loading
export const setVendorLoading = () => {
  return {
    type: VENDOR_LOADING
  };
};
