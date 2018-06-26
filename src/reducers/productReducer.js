import * as types from '../actions/types';
import isEmpty from '../validation/is-empty';

const initialState = {
  products: [],
  product_category: [],
  product_vendor: [],
  random_products: [],
  hasMore: false,
  loadingVendors: false,
  loadingCategories: false,
  pushingProduct: false,
  index: 0
};

export default function(state = initialState, action) {
  switch (action.type) {
    case types.PRODUCT_PUSHING:
      return{
        ...state,
        pushingProduct: true
      }
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
    case types.PRODUCT_PUSHED:
      return{
        ...state,
        pushingProduct: false
      }
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
    case types.GET_VENDOR_INVENTORY:
      const VendorhasMore =
      action.payload.length < 25 || isEmpty(action.payload.length)
        ? false
        : true;
      const currentVendorProducts = isEmpty(state.vendorInventory) ? [] : state.vendorInventory;
      const VendorIndex = isEmpty(state.products) ? 1 : state.vendorIndex + 1;
      const newVendorProducts = isEmpty(action.payload)
        ? currentVendorProducts
        : [
            ...new Map(
              currentVendorProducts
                .concat(action.payload)
                .map(o => [o['productId'], o])
            ).values()
          ];
    return {
      ...state,
      vendorInventory: newVendorProducts,
      vendorHasMore: VendorhasMore,
      vendorIndex: VendorIndex,
    };
    case types.GET_PRODUCT:
      action.payload.images = [];
      return {
        ...state,
        single: action.payload
      };
    case types.GET_RANDOM_PRODUCTS:
      return {
        ...state,
        random_products:
          action.payload.length > 12
            ? action.payload.slice(0, 12)
            : action.payload
      };
    case types.GET_PRODUCT_IMAGE:
      const product = action.product;
      product.images = product.images.concat(action.payload);
      return {
        ...state,
        single: product,
        products: isEmpty(
          state.products.filter(prod => prod.productId === product.productId)
        )
          ? state.products.concat(product)
          : state.products
      };
    case types.GET_PRODUCT_IMAGE_CUSTOMER:
      const newProduct = action.product;
      newProduct.images = [action.payload];
      return {
        ...state,
        products: state.products.map(
          product =>
            product.productId === newProduct.productId ? newProduct : product
        )
      };
    case types.GET_PRODUCTS_IMAGE_RANDOM:
      const randProd = action.product;
      randProd.images = [action.payload];
      return {
        ...state,
        random_products: state.random_products.map(
          product =>
            product.productId === randProd.productId ? randProd : product
        )
        // ,
        // products: isEmpty(
        //   state.products.filter(prod => prod.productId === randProd.productId)
        // )
        //   ? state.products.concat(product)
        //   : state.products
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
