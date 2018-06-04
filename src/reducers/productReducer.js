import * as types from "../actions/types";

const initialState = {
  products: null
};

export default function(state = initialState, action) {
  switch (action.type) {
    case types.PRODUCTS_LOADING:
      return {
        ...state,
        loading: true
      };
    case types.GET_PRODUCTS:
      return {
        ...state,
        products: action.payload,
        loading: false
      };
    case types.CLEAR_CURRENT_PRODUCTS:
      return {
        ...state,
        products: null
      };
      case types.PRODUCT_ADDING:
      return{
          ...state,
          loading: false
      }
    default:
      return state;
  }
}
