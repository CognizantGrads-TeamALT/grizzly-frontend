import * as types from '../actions/types';
import isEmpty from '../validation/is-empty';

const initialState = {
  products: null,
  product_category: null,
  product_vendor: null,
  hasMore: false,
  loadingVendors: false,
  loadingCategories: false,
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
                .map(o => [o['productId'], o])
            ).values()
          ];
      return {
        ...state,
        products: newProducts,
        hasMore: hasMore,
        index: index,
        loadingVendors: true,
        loadingCategories: true
      };
    case types.GET_PRODUCT:
      return {
        ...state,
        single: action.payload
      };
    case types.PRODUCT_ADDING:
      const currentProducts2 = isEmpty(state.products) ? [] : state.products;
      const addProduct = isEmpty(action.payload) ? [] : [action.payload];
      const newProducts2 = addProduct.concat(currentProducts2);
      const hasMore2 = !state.hasMore
        ? newProducts2.length / 25 >= state.index
        : state.hasMore;
      return {
        ...state,
        products: newProducts2,
        hasMore: hasMore2,
        //updateOnce: true,
        loadingVendors: true,
        loadingCategories: true
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
      const currentProductVendor = isEmpty(state.product_vendor)
        ? []
        : state.product_vendor;
      const newProductVendor = isEmpty(action.payload)
        ? currentProductVendor
        : currentProductVendor.concat(action.payload);
      const loadingNew = state.loadingCategories;
      return {
        ...state,
        product_vendor: newProductVendor,
        loading: loadingNew,
        loadingVendors: false
      };
    case types.GET_PRODUCT_CATEGORY:
      const currentProductCat = isEmpty(state.product_category)
        ? []
        : state.product_category;
      const newProductCat = isEmpty(action.payload)
        ? currentProductCat
        : currentProductCat.concat(action.payload);
      const loadingNew2 = state.loadingVendors;
      return {
        ...state,
        product_category: newProductCat,
        loading: loadingNew2,
        loadingCategories: false
      };
    case types.PRODUCTS_LOADED:
      return {
        ...state,
        loading: false
      };
    case types.CLEAR_CURRENT_PRODUCTS:
      return {
        ...state,
        hasMore: true,
        products: null,
        product_category: null,
        product_vendor: null,
        loadingCategories: null,
        loadingVendors: null,
        index: 0
      };
    default:
      return state;
  }
}
