import * as types from '../actions/types';
import isEmpty from '../validation/is-empty';

const initialState = {
  products: [],
  images: [],
  product_category: [],
  product_vendor: [],
  random_products: [],
  products_filtered: [],
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
      let hasMore =
        action.payload.length < 25 || isEmpty(action.payload.length)
          ? false
          : true;
      let currentProducts = isEmpty(state.products) ? [] : state.products;
      let index = isEmpty(state.products) ? 1 : state.index + 1;
      let newProducts = isEmpty(action.payload)
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
    case types.GET_FILTERED_PRODUCTS:
      hasMore =
      action.payload.length < 25 || isEmpty(action.payload.length)
        ? false
        : true;
      currentProducts = isEmpty(state.products_filtered) ? [] : state.products_filtered;
      index = isEmpty(state.products_filtered) ? 1 : state.index + 1;
      newProducts = isEmpty(action.payload)
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
        products_filtered: newProducts,
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
      return {
        ...state,
        single: action.payload
      };
    case types.GET_RANDOM_PRODUCTS:
      let currentProducts3 = isEmpty(state.products) ? [] : state.products;
      let newProducts3 = isEmpty(action.payload)
        ? currentProducts3
        : [
            ...new Map(
              currentProducts3
                .concat(action.payload)
                .map(o => [o['productId'], o])
            ).values()
          ];
      return {
        ...state,
        products: newProducts3,
        random_products:
          action.payload.length > 12
            ? action.payload.slice(0, 12)
            : action.payload
      };
    case types.GET_PRODUCT_IMAGE:
      let newImage = action.payload;
      let productId = action.productId;
      let currentImages = isEmpty(state.images) ? [] : state.images;

      let oldImages = isEmpty(currentImages[productId]) ? [] : currentImages[productId];

      // prevent duplicate images.
      let newImages = isEmpty(newImage)
        ? oldImages :
        [
          ...new Map(
            oldImages
              .concat(newImage)
              .map(o => [o['imgName'], o])
          ).values()
        ];

      currentImages[productId] = newImages;

      return {
        ...state,
        images: currentImages
      }
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
        products_filtered: null,
        product_category: null,
        product_vendor: null,
        loadingCategories: null,
        loadingVendors: null,
        index: 0
      };
    case types.CLEAR_FILTERED_PRODUCTS:
      return {
        ...state,
        products_filtered: null
      }
    default:
      return state;
  }
}
