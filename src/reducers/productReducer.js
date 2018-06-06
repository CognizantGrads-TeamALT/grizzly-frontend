import * as types from "../actions/types";
import isEmpty from "../validation/is-empty";

const initialState = {
  products: null,
  hasMore: false,
  index: 0
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
      };
    case types.PRODUCTS_UPDATED:
      return {
        ...state,
        updateOnce: false,
        loading: false
      };
    case types.GET_PRODUCTS:
      const hasMore =
        action.payload.length < 25 || isEmpty(action.payload.length)
          ? false
          : true;
      const currentProducts = isEmpty(state.products) ? [] : state.products;
      const index = isEmpty(state.products) ? 1 : state.index + 1;
      const newProducts = isEmpty(action.payload)
        ? currentProducts
        : [
            ...new Map(
              currentProducts
                .concat(action.payload)
                .map(o => [o["productId"], o])
            ).values()
          ];
      return {
        ...state,
        products: newProducts,
        hasMore: hasMore,
        index: index
      };
    case types.PRODUCTS_ADDING:
      const currentProducts2 = isEmpty(state.products) ? [] : state.products;
      const addProduct = isEmpty(action.payload) ? [] : [action.payload];
      const newProducts2 = addProduct.concat(currentProducts2);
      const hasMore2 = !state.hasMore
        ? newProducts2.length / 25 >= state.index + 1
        : state.hasMore;
      return {
        ...state,
        products: newProducts2,
        hasMore: hasMore2,
        updateOnce: true
      };
    case types.PRODUCTS_DELETING:
      return {
        ...state,
        products: state.products.filter(
          product => product.productId !== action.payload
        )
      };
    case types.PRODUCTS_TOGGLEBLOCK:
      return {
        ...state,
        products: state.products.map(
          product =>
            product.productId === action.payload.productId
              ? action.payload
              : product
        )
      };
    case types.GET_PRODUCT_VENDOR:
      return {
        ...state,
        product_vendor: action.payload
      };
    case types.GET_PRODUCT_CATEGORY:
      return {
        ...state,
        product_category: action.payload
      };
    case types.PRODUCTS_LOADED:
      return {
        ...state,
        loading: false
      };
    case types.CLEAR_CURRENT_PRODUCTS:
      return {
        ...state,
        products: null
      };
    default:
      return state;
  }
}