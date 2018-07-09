import * as types from './types';
import {
  PRODUCT_API_GATEWAY,
  CATEGORY_API_GATEWAY,
  VENDOR_API_GATEWAY
} from './microservices';
import axios from 'axios';
import isEmpty from '../validation/is-empty';

// Get Product List
export const getProducts = index => dispatch => {
  dispatch(clearErrors());
  // Default the index to 0 if not given.
  index = index == null ? 0 : index;

  // getVendorBatch and getCategoryBatch set loading: true
  // if either data is not loaded yet.
  // if we set loading here, it will refresh the render too many times
  // which results in losing the scroll wheel position...
  //dispatch(setProductLoading());
  axios
    .get(PRODUCT_API_GATEWAY + `/get/${index}/default`)
    .then(res => {
      dispatch(refreshProductData(res.data));
    })
    .catch(err => {
      if(!isEmpty(err.responce)){
        //if refresh product data throws an error it will not have a .responce value, causing an error. 
        //this fixes that eventuality
        dispatch({
          type: types.GET_ERRORS,
          payload: err.request.response
       });}
      else{
        //note: this probably wont be a connection error, but rather a coding/generally bad error if this gets thrown
        //... but the end user doesn't need to know that.
        //the payload will fail the try{json.parse(...)} and cause the fallback to the default connection error message.
        dispatch({
          type: types.GET_ERRORS,
          payload: "connection Error"
        })
      }
      dispatch(setProductUpdated());
      // For development purposes. The micro-services take time to initialise.
      // This will keep requesting data if it gets a 500 or 403 error...
      // Should be removed once we actually implement a feature to error or retry x times.
      //if (index === 0) dispatch(getProducts(index));
    });
};

// Get Product with Imgs
export const getProduct = productId => dispatch => {
  dispatch(clearErrors());
  dispatch(setProductLoading());
  axios
    .get(PRODUCT_API_GATEWAY + `/get/${productId}`)
    .then(res => {
      dispatch({
        type: types.GET_PRODUCT,
        payload: res.data
      });
      if (!isEmpty(res.data)) {
        if (!isEmpty(res.data.productId)) {
          if (res.data.vendorId !== 0)
            dispatch(getVendorBatch(res.data.vendorId));
          if (res.data.categoryId !== 0)
            dispatch(getCategoryBatch(res.data.categoryId));
        }
      }
      dispatch(setProductUpdated());
    })
    .catch(err => {
      dispatch(setProductUpdated());
      dispatch({
        type: types.GET_ERRORS,
        payload: err.request.response
      });
    });
};

export const setProductAdding = () => {
  return {
    type: types.PRODUCT_ADDING
  };
};
//Add products
export const addProduct = newProd => dispatch => {
  dispatch(clearErrors());
  // again, also here...
  // getVendorBatch and getCategoryBatch handle the loading state variable
  // if we call it too early, due to state changes between other methods...
  // the page reloads and shows the "spinning wheel" which causes loss in scroll position
  //dispatch(setProductLoading());
  axios
    .put(PRODUCT_API_GATEWAY + '/add', newProd)
    .then(res => {
      dispatch({
        type: types.PRODUCT_ADDING,
        payload: res.data
      });
      dispatch(stopWaitingForError());
      dispatch(getVendorBatch(res.data.vendorId));
      dispatch(getCategoryBatch(res.data.categoryId));
    })
    .catch(err => {
      dispatch({
        type: types.GET_ERRORS,
        payload: err.request.response
      });
    });
};

// Clear Products
export const clearCurrentProducts = () => {
  return {
    type: types.CLEAR_CURRENT_PRODUCTS
  };
};

// Clear Filtered Products
export const clearFilteredProducts = () => {
  return {
    type: types.CLEAR_FILTERED_PRODUCTS
  };
};

// Reload Products
export const reloadProducts = () => dispatch => {
  dispatch(clearCurrentProducts());
  dispatch(getProducts());
};

// Delete Product
export const deleteProduct = id => dispatch => {
  dispatch(clearErrors());
  dispatch(setProductUpdateOnce());
  axios
    .delete(PRODUCT_API_GATEWAY + `/delete/${id}`)
    .then(res =>
      dispatch({
        type: types.PRODUCTS_DELETING,
        payload: id
      })
    )
    .catch(err => {
      dispatch(setProductUpdated());
      dispatch({
        type: types.GET_ERRORS,
        payload: err.request.response
      });
    });
};

// Block/unlock Product
export const toggleBlockProduct = (productId, enabled) => dispatch => {
  dispatch(clearErrors());
  dispatch(setProductUpdateOnce());
  axios
    .post(PRODUCT_API_GATEWAY + `/setBlock/${productId}`, { enabled: enabled })
    .then(res =>
      dispatch({
        type: types.PRODUCTS_TOGGLEBLOCK,
        payload: res.data
      })
    )
    .catch(err => {
      dispatch(setProductUpdated());
      dispatch({
        type: types.GET_ERRORS,
        payload: err.request.response
      });
    });
};

// Edit Product
export const editProduct = newInfo => dispatch => {
  dispatch(clearErrors(true));
  axios
    .post(PRODUCT_API_GATEWAY + `/edit/${newInfo.productId}`, newInfo)
    .then(res => {
      dispatch({
        type: types.PRODUCT_EDITED,
        payload: newInfo
      });
      dispatch(stopWaitingForError());
    })
    .catch(err => {
      dispatch({
        type: types.GET_ERRORS,
        payload: err.request.response
      });
    });
};

//clearing errors
export const clearErrors = values => dispatch => {
  dispatch({
    type: types.CLEAR_ERRORS
  });
};
export const WaitForError = () => {
  return { type: types.START_WAITING };
};

export const stopWaitingForError = () => {
  return { type: types.STOP_WAITING };
};

// Product Editing
export const setProductEditing = () => {
  return {
    type: types.PRODUCT_EDITING
  };
};

// Product Loading
export const setProductLoading = () => {
  return {
    type: types.PRODUCTS_LOADING
  };
};

export const setProductLoaded = () => {
  return {
    type: types.PRODUCTS_LOADED
  };
};

// Product update
export const setProductUpdateOnce = () => {
  return {
    type: types.PRODUCTS_UPDATING
  };
};

// Product update
export const setProductUpdated = () => {
  return {
    type: types.PRODUCTS_UPDATED
  };
};

export const getProductBatch = productIdArray => dispatch => {
  axios
    .get(PRODUCT_API_GATEWAY + `/batchFetch/${productIdArray}`)
    .then(res => {
      dispatch({
        type: types.GET_PRODUCTS_CART,
        payload: res.data
      });
    })
    .catch(err => {
      dispatch(setProductUpdated());
      dispatch({
        type: types.GET_ERRORS,
        payload: err.response.data
      });
    });
};

export const getVendorBatch = vendorIdArray => dispatch => {
  axios
    .get(VENDOR_API_GATEWAY + `/batchFetch/${vendorIdArray}`)
    .then(res => {
      dispatch({
        type: types.GET_PRODUCT_VENDOR,
        payload: res.data
      });
    })
    .catch(err => {
      dispatch(setProductUpdated());
      dispatch({
        type: types.GET_ERRORS,
        payload: err.request.response
      });
    });
};

export const getCategoryBatch = categoryIdArray => dispatch => {
  axios
    .get(CATEGORY_API_GATEWAY + `/batchFetch/${categoryIdArray}`)
    .then(res =>
      dispatch({
        type: types.GET_PRODUCT_CATEGORY,
        payload: res.data
      })
    )
    .catch(err => {
      dispatch(setProductUpdated());
      dispatch({
        type: types.GET_ERRORS,
        payload: err.request.response
      });
    });
};

// Search Products
export const searchProducts = (keyword, index, nav) => dispatch => {
  dispatch(clearErrors());
  dispatch(clearCurrentProducts());
  if (isEmpty(keyword)) {
    dispatch(getProducts());
  } else {
    axios
      .get(PRODUCT_API_GATEWAY + `/search/${keyword}/${index}`)
      .then(res => {
        // dispatch(refreshProductData(res.data));
        if (nav) {
          dispatch({
            type: types.SEARCH_RESULTS,
            payload: res.data
          });
        } else {
          dispatch(refreshProductData(res.data));
        }
      })
      .catch(err => {
        dispatch(setProductUpdated());
        dispatch(searchProductFailed());
        dispatch({
          type: types.GET_ERRORS,
          payload: err.request.response
        });
      });
  }
};

//Search product Failed - no results found
export const searchProductFailed = (keyword, index) => dispatch => {
  dispatch({
    type: types.SEARCH_PRODUCT_FAILED
  })
}

// Search Products
export const getRandomProducts = (keyword, index) => dispatch => {
  dispatch(clearErrors());
  axios
    .get(PRODUCT_API_GATEWAY + `/search/${keyword}/${index}`)
    .then(res => {
      dispatch({
        type: types.GET_RANDOM_PRODUCTS,
        payload: res.data
      });
    })
    .catch(err => {
      dispatch(setProductUpdated());
      dispatch({
        type: types.GET_ERRORS,
        payload: err.request.response
      });
    });
};

// Sort products by @param
export const sortProductsByParam = (index, param) => dispatch => {
  dispatch(clearErrors());
  dispatch(clearCurrentProducts());
  axios
    .get(PRODUCT_API_GATEWAY + `/get/${index}/${param}`)
    .then(res => {
      dispatch(refreshProductData(res.data));
    })
    .catch(err => {
      dispatch(setProductUpdated());
      dispatch({
        type: types.GET_ERRORS,
        payload: err.request.response
      });
    });
};

// get all products beloning to a vendor, and get their inventory details
export const getVendorInventory = (index, VendorID) => dispatch => {
  dispatch(clearErrors());
  index = index == null ? 0 : index;
  // getVendorBatch and getCategoryBatch set loading: true
  // if either data is not loaded yet.
  // if we set loading here, it will refresh the render too many times
  // which results in losing the scroll wheel position...
  //dispatch(setProductLoading());
  axios
    .get(PRODUCT_API_GATEWAY + `/getInventory/${index}`)
    .then(res => {
      dispatch({
        type: types.GET_VENDOR_INVENTORY,
        payload: res.data
      });
    })
    .catch(err => {
      dispatch(setProductUpdated());
      // For development purposes. The micro-services take time to initialise.
      // This will keep requesting data if it gets a 500 or 403 error...
      // Should be removed once we actually implement a feature to error or retry x times.
      if (index === 0) dispatch(getVendorInventory(index, VendorID));

      dispatch({
        type: types.GET_ERRORS,
        payload: err.request.response
      });
    });
};
// edit the inventory of a single product.
export const editProductInventory = newInfo => dispatch => {
  dispatch(clearErrors(true));
  axios
    .post(PRODUCT_API_GATEWAY + `/editInventory/`, newInfo)
    .then(res =>
      dispatch({
        type: types.PRODUCT_INVENTORY_EDITED,
        payload: newInfo
      })
    )
    .catch(err => {
      dispatch({
        type: types.GET_ERRORS,
        payload: err.request.response
      });
    });
};

// Filter Products by Category
export const filterProductsByCategory = inputs => dispatch => {
  dispatch(clearErrors());
  dispatch(setProductLoading());
  dispatch(clearFilteredProducts());
  axios
    .get(
      PRODUCT_API_GATEWAY +
        `/byCategory/${inputs.cur_id}/${inputs.index}/default`
    )
    .then(res => {
      dispatch(refreshProductData(res.data, inputs));
    })
    .catch(err => {
      dispatch(setProductUpdated());
      dispatch({
        type: types.GET_ERRORS,
        payload: err.request.response
      });
    });
};

export const refreshProductData = (data, filtered) => dispatch => {
  if (filtered) {
    dispatch({
      type: types.GET_FILTERED_PRODUCTS,
      payload: data,
      filter: filtered.cur_id
    });
  } else {
    dispatch({
      type: types.GET_PRODUCTS,
      payload: data
    });
  }
  if (!isEmpty(data[0])) {
    if (!isEmpty(data[0].productId)) {
      let vendorIdArray = [];
      data
        .filter(prod => prod.vendorId !== 0)
        .map(prod => vendorIdArray.push(prod.vendorId));

        let cleanVendorIdArray = [...new Set(vendorIdArray)];
        dispatch(getVendorBatch(cleanVendorIdArray.join()));

      let categoryIdArray = [];
      data
        .filter(prod => prod.categoryId !== 0)
        .map(prod => categoryIdArray.push(prod.categoryId));

      let cleanCategoryIdArray = [...new Set(categoryIdArray)];
      dispatch(getCategoryBatch(cleanCategoryIdArray.join()));
    }
  }
};
