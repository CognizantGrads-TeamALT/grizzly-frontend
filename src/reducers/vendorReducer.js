import {
  GET_VENDORS,
  VENDOR_LOADING,
  VENDOR_DELETING,
  VENDOR_ADDING
} from "../actions/types";

const initialState = {
  vendors: null
};

export default function(state = initialState, action) {
  switch (action.type) {
    case VENDOR_LOADING:
      return {
        ...state,
        loading: true
      };
    case GET_VENDORS:
      return {
        ...state,
        vendors: action.payload,
        loading: false
      };
    case VENDOR_ADDING:
      return {
        ...state,
        loading: true
      };
    case VENDOR_DELETING:
      return {
        ...state,
        vendors: state.vendors.filter(
          vendor => vendor.vendorId !== action.payload
        )
      };
    default:
      return state;
  }
}
