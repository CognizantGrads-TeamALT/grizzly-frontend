import * as types from '../actions/types';
import isEmpty from '../validation/is-empty';
import { saveCart } from '../actions/cartActions';

const initialState = {
  // Stores ALL products. Shouldn't clear this.
  products: [],

  // Stores ALL products images.
  images: [],

  // Stores ALL product categories.
  product_category: [],

  // Stores ALL product vendors.
  product_vendor: [],

  // Stores TEMP data (random products on detailed page)
  random_products: [],

  // Stores TEMP data (for listing on category search)
  products_filtered: [],
  products_filtered_last: null,

  // Infinite scroll & loading variables.
  hasMore: false,
  loadingVendors: true,
  loadingCategories: true,
  index: 0,

  // Stores locally loaded cart info.
  cart: {},
  cart_products: [],
  loadingCart: true,
  fetchingCart: true
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
    case types.ADD_TO_CART:
      // Checks if we already have the item in the cart.
      //if (state.cart.indexOf(action.productId) !== -1)
      //  return state;

      var newCart = isEmpty(state.cart) ? {} : state.cart;
      newCart[action.productId] = 1; // quantity.
      console.log("Cart append", newCart);
      saveCart(newCart);
      return {
        ...state,
        cart: newCart
      }
    case types.ADJUST_CART_QUANTITY:
      newCart = isEmpty(state.cart) ? {} : state.cart;
      newCart[action.productId] = action.quantity;
      console.log("Cart quantity change", newCart);
      saveCart(newCart);
      return {
        ...state,
        cart: newCart
      };
    case types.REMOVE_FROM_CART:
      newCart = isEmpty(state.cart) ? {} : state.cart;
      newCart[action.productId] = null;
      console.log("Cart remove", newCart);
      saveCart(newCart);
      return {
        ...state,
        cart: newCart
      };
    case types.GET_FILTERED_PRODUCTS:
      hasMore = // hasMore should should a different veriable, as you're loading filtered products.
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
      // Save the filtered into the main list.
      let currentProducts5 = isEmpty(state.products) ? [] : state.products;
      let newMainProducts = isEmpty(action.payload)
          ? currentProducts5
          : [
              ...new Map(
                currentProducts5
                  .concat(action.payload)
                  .map(o => [o['productId'], o])
              ).values()
            ];
      return {
        ...state,
        products: newMainProducts,
        products_filtered: newProducts,
        products_filtered_last: action.filter,
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
    case types.CLEAR_PRODUCT_IMAGES:
      productId = action.payload;
      newImages = isEmpty(state.images) ? [] : state.images;
      newImages[productId] = [];
      return {
        ...state,
        images: newImages
      }
    case types.PRODUCT_ADDING:
      let currentProducts2 = isEmpty(state.products) ? [] : state.products;
      let addProduct = isEmpty(action.payload) ? [] : [action.payload];
      let newProducts2 = addProduct.concat(currentProducts2);
      let hasMore2 = !state.hasMore
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
    case types.GET_PRODUCTS_CART:
      currentProducts2 = isEmpty(state.cart_products) ? [] : state.cart_products;
      newProducts2 = isEmpty(action.payload)
        ? currentProducts2
        : [
            ...new Map(
              currentProducts2
                .concat(action.payload)
                .map(o => [o['productId'], o])
            ).values()
          ];

      currentProducts = isEmpty(state.products) ? [] : state.products;
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
        products: newProducts,
        cart_products: newProducts2,
        loadingCart: false,
        fetchingCart: false
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
        products_filtered_last: null,
        product_category: null,
        product_vendor: null,
        loadingCategories: null,
        loadingVendors: null,
        index: 0
      };
    case types.CLEAR_FILTERED_PRODUCTS:
      return {
        ...state,
        products_filtered: null,
        products_filtered_last: null
      }
    case types.LOAD_CART:
      return {
        ...state,
        cart: action.payload,
        loadingCart: false
    }
    default:
      return state;
  }
}
