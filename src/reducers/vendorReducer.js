import { GET_VENDORS, VENDOR_LOADING } from "../actions/types";

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
    default:
      return state;
  }
}
