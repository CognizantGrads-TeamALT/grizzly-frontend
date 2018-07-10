import * as types from "./types";
import { PRODUCT_API_GATEWAY, VENDOR_API_GATEWAY } from "./microservices";
import axios from "axios";
import { reloadProducts } from "./productsActions";
import isEmpty from "../validation/is-empty";

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
        payload: err.request.response
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
        payload: err.request.response
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
        payload: err.request.response
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
        payload: err.request.response
      })
      dispatch({
        type: types.GET_VENDORS,
        payload: []
      })
    });
};

// Reload Vendors
export const reloadVendors = () => dispatch => {
  dispatch(clearCurrentVendors());
  dispatch(getVendors());
}

// wait for a responce from the backend
export const WaitForError = () => {
  return {type: types.START_WAITING}
}

// recieved responce, stop waiting
export const stopWaitingForError = () => {
  return {type: types.STOP_WAITING}
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
        payload: err.request.response
      })
    });
};

// Block/unlock Vendor
export const toggleBlockVendor = (vendorId, enabled) => dispatch => {
  dispatch(setVendorUpdateOnce());
  axios
    .post(VENDOR_API_GATEWAY + `/setBlock/${vendorId}`, {'enabled': enabled})
    .then(res =>{
      dispatch({
        type: types.VENDOR_TOGGLEBLOCK,
        payload: res.data
      });
      //if(enabled===false)
      //  dispatch(disableVendorProducts(vendorId, true));
    })
    .catch(err => {
      dispatch(setVendorUpdated());
      dispatch({
        type: types.GET_ERRORS,
        payload: err.request.response
      })
    });
};

// Disable products when deleting a vendor. No data is needed back.
export const disableVendorProducts = (id, block) => dispatch => {
  if(isEmpty(block))
    block=false;
  axios
    .post(PRODUCT_API_GATEWAY + `/setBlockByVendor/${id}/${block}`)
    .then(res => {
      dispatch(reloadProducts());
    })
    .catch(err => {
      dispatch({
        type: types.GET_ERRORS,
        payload: err.request.response
      })
    });
}

// Clear Vendors
export const clearCurrentVendors = () => {
  return {
    type: types.CLEAR_CURRENT_VENDORS
  };
};