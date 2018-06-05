import * as types from "../actions/types";
import isEmpty from "../validation/is-empty";

const initialState = {
  vendors: null,
  hasMore: false
};

export default function(state = initialState, action) {
  switch (action.type) {
    case types.VENDOR_LOADING:
      return {
        ...state,
        loading: true
      };
    case types.VENDOR_UPDATING:
      return {
        ...state,
        updateOnce: true
      };
    case types.VENDOR_UPDATED:
      return {
        ...state,
        updateOnce: false
      };
    case types.GET_VENDORS:
      const hasMore =
        action.payload.length < 25 || isEmpty(action.payload.length)
          ? false
          : true;
      const currentVendors = isEmpty(state.vendors) ? [] : state.vendors;
      const newVendors = isEmpty(action.payload)
        ? currentVendors
        : currentVendors.concat(action.payload);
      return {
        ...state,
        vendors: newVendors,
        hasMore: hasMore,
        loading: false
      };
    case types.VENDOR_ADDING:
      const currentVendors2 = isEmpty(state.vendors) ? [] : state.vendors;
      const addVendor = isEmpty(action.payload) ? [] : [action.payload];
      const newVendors2 = addVendor.concat(currentVendors2);
      return {
        ...state,
        vendors: newVendors2,
        updateOnce: true
      };
    case types.VENDOR_DELETING:
      return {
        ...state,
        vendors: state.vendors.filter(
          vendor => vendor.vendorId !== action.payload
        )
      };
    case types.CLEAR_CURRENT_VENDORS:
      return {
        ...state,
        vendors: null
      };
    default:
      return state;
  }
}
