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
    case types.PRODUCTS_UPDATING:
      return {
        ...state,
        updateOnce: true
      }
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
    case types.PRODUCTS_ADDING:
      const currentProducts2 = isEmpty(state.products) ? [] : state.products;
      const addProduct = isEmpty(action.payload) ? [] : [action.payload];
      const newProducts2 = addProduct.concat(currentProducts2);
      return {
        ...state,
        products: newProducts2,
        updateOnce: true
      };
    case types.PRODUCTS_DELETING:
      return {
        ...state,
        products: state.products.filter(
          product => product.productId !== action.payload
        ),
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
