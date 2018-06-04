import * as types from "../actions/types";

const initialState = {
  vendors: null
};

export default function(state = initialState, action) {
  switch (action.type) {
    case types.VENDOR_LOADING:
      return {
        ...state,
        loading: true
      };
    case types.GET_VENDORS:
      return {
        ...state,
        vendors: action.payload,
        loading: false
      };
    case types.VENDOR_ADDING:
      return {
        ...state,
        loading: true
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
