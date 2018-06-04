import * as types from "../actions/types";
import isEmpty from "../validation/is-empty";

const initialState = {
  products: null,
  hasMore: false
};

export default function(state = initialState, action) {
  switch (action.type) {
    case types.PRODUCTS_LOADING:
      return {
        ...state,
        loading: true
      };
    case types.GET_PRODUCTS:
      const hasMore =
        action.payload.length < 25 || isEmpty(action.payload.length)
          ? false
          : true;
      const currentProducts = isEmpty(state.products) ? [] : state.products;
      const newProducts = isEmpty(action.payload)
        ? currentProducts
        : currentProducts.concat(action.payload);
      return {
        ...state,
        products: newProducts,
        hasMore: hasMore,
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
