import * as types from "./types";
import { PRODUCT_API_GATEWAY, VENDOR_API_GATEWAY } from "./microservices";
import axios from "axios";
import { reloadProducts } from "./productsActions";

// Get Vendor List
export const getVendors = index => dispatch => {
  // Default the index to 0 if not given.
  index = index == null ? 0 : index;

  dispatch(setVendorLoading());
  axios
    .get(VENDOR_API_GATEWAY + `/get/${index}/default`)
    .then(res =>
      dispatch({
        type: types.GET_VENDORS,
        payload: res.data
      })
    )
    .catch(err => {
      dispatch(setVendorUpdated());
      // For development purposes. The micro-services take time to initialise.
      // This will keep requesting data if it gets a 500 or 403 error...
      // Should be removed once we actually implement a feature to error or retry x times.
      if (index === 0)
        dispatch(getVendors(index));

      dispatch({
        type: types.GET_ERRORS,
        payload: err.response.data
      })
    });
};

export const Vendor_Update_TypeAhead = values => dispatch => {
  dispatch({
    type: types.VENDOR_TYPEAHEAD_UPDATE,
    payload: values
  })

}

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
    .catch(err => {
      dispatch(setVendorUpdated());
      dispatch({
        type: types.GET_ERRORS,
        payload: err.response.data
      })
    });
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
    .catch(err => {
      dispatch(setVendorUpdated());
      dispatch({
        type: types.GET_ERRORS,
        payload: err.response.data
      })
    });
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
    .catch(err => {
      dispatch(setVendorUpdated());
      dispatch({
        type: types.GET_ERRORS,
        payload: err.response.data
      })
    });
};

// Reload Vendors
export const reloadVendors = () => dispatch => {
  dispatch(clearCurrentVendors());
  dispatch(getVendors());
}

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
    .then(res => {
      dispatch({
        type: types.VENDOR_DELETING,
        payload: id
      });
      dispatch(disableVendorProducts(id));
    })
    .catch(err => {
      dispatch(setVendorUpdated());
      dispatch({
        type: types.GET_ERRORS,
        payload: err.response.data
      })
    });
};

// Block/unlock Vendor
export const toggleBlockVendor = vendor => dispatch => {
  dispatch(setVendorUpdateOnce());
  axios
    .post(VENDOR_API_GATEWAY + `/setBlock/${vendor.vendorId}`, vendor)
    .then(res =>
      dispatch({
        type: types.VENDOR_TOGGLEBLOCK,
        payload: res.data
      })
    )
    .catch(err => {
      dispatch(setVendorUpdated());
      dispatch({
        type: types.GET_ERRORS,
        payload: err.response.data
      })
    });
};

// Disable products when deleting a vendor. No data is needed back.
export const disableVendorProducts = id => dispatch => {
  axios
    .post(PRODUCT_API_GATEWAY + `/setBlockByVendor/${id}`)
    .then(res => {
      dispatch(reloadProducts());
    })
    .catch(err => {
      dispatch({
        type: types.GET_ERRORS,
        payload: err.response.data
      })
    });
}

// Clear Vendors
export const clearCurrentVendors = () => {
  return {
    type: types.CLEAR_CURRENT_VENDORS
  };
};