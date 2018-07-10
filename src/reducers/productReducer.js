import * as types from '../actions/types';
import isEmpty from '../validation/is-empty';
import { saveCart } from '../actions/cartActions';

const initialState = {
  // fresh: this is so data doesn't show "none available" before searching.
  fresh: true,

  // Stores ALL products. Shouldn't clear this.
  products: [],

  // Search Results
  results: [],

  // Stores ALL product categories.
  product_category: [],

  // Stores ALL product vendors.
  product_vendor: [],

  // Stores TEMP data (random products on detailed page)
  random_products: [],

  // Stores TEMP data (for listing on category search)
  products_filtered: [],
  products_filtered_last: null,
  filteredHasMore: false,
  filteredIndex: 0,

  // Infinite scroll & loading variables.
  hasMore: false,
  loadingVendors: false,
  vendorHasMore: true,
  loadingCategories: false,
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
        loading: false,
        loadingCategories: false,
        loadingVendors:false
      };
    case types.SEARCH_RESULTS:
      return {
        ...state,
        results: isEmpty(action.payload)
          ? []
          : action.payload.filter(prod => prod.enabled !== false),
        loading: false
      };
    case types.GET_PRODUCTS:
      let hasMore =
        action.payload.length < 30 || isEmpty(action.payload.length)
          ? false
          : true;
      let currentProducts = isEmpty(state.products) ? [] : state.products;
      let newProducts = isEmpty(action.payload)
        ? currentProducts
        : [
            ...new Map(
              currentProducts
                .concat(action.payload)
                .map(o => [o['productId'], o])
            ).values()
          ];
      let index = (newProducts.length)/30;
      if(index%1 !== 0){
        index = index + 1 - index%1;
      }
      return {
        ...state,
        products: newProducts,
        hasMore: hasMore,
        index: index,
        loadingVendors: true,
        loadingCategories: true,
        fresh: false
      };
      // No products found message 
    case types.SEARCH_PRODUCT_FAILED:
      return {
        ...state,
        updateOnce: true,
        loadingVendors: false,
        loadingCategories: false,
        fresh: false
      };
    case types.ADD_TO_CART:
      var newCart = isEmpty(state.cart) ? {} : state.cart;
      newCart[action.product.productId] = isEmpty(
        newCart[action.product.productId]
      )
        ? 1
        : newCart[action.product.productId] + 1; // quantity.
      saveCart(newCart, state.cart_products);

      let currentProducts2 = isEmpty(state.cart_products)
        ? []
        : state.cart_products;
      let newProducts2 = isEmpty(action.product)
        ? currentProducts2
        : [
            ...new Map(
              currentProducts2
                .concat(action.product)
                .map(o => [o['productId'], o])
            ).values()
          ];
      localStorage.removeItem('grizzly-alt-cart-prods');
      localStorage.setItem(
        'grizzly-alt-cart-prods',
        JSON.stringify(newProducts2)
      );
      return {
        ...state,
        cart: newCart,
        cart_products: newProducts2
      };
    case types.ADJUST_CART_QUANTITY:
      newCart = isEmpty(state.cart) ? {} : state.cart;
      newCart[action.productId] = action.quantity;
      saveCart(newCart, state.cart_products);

      return {
        ...state,
        cart: newCart
      };
    case types.REMOVE_FROM_CART:
      newCart = isEmpty(state.cart) ? {} : state.cart;
      delete newCart[action.productId];

      let cart_products = state.cart_products.filter(
        product => product.productId !== action.productId
      );
      saveCart(newCart, cart_products);
      return {
        ...state,
        cart: newCart,
        cart_products: cart_products
      };
    case types.GET_FILTERED_PRODUCTS:
      hasMore = // hasMore should should a different veriable, as you're loading filtered products.
        action.payload.length < 25 || isEmpty(action.payload.length)
          ? false
          : true;
      currentProducts = isEmpty(state.products_filtered)
        ? []
        : state.products_filtered;
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
        filteredHasMore: hasMore,
        filteredIndex: index,
        loadingVendors: true,
        loadingCategories: true,
        fresh: false
      };
    case types.GET_VENDOR_INVENTORY:
      const VendorhasMore =
        action.payload.length < 25 || isEmpty(action.payload.length)
          ? false
          : true;
      const currentVendorProducts = isEmpty(state.vendorInventory)
        ? []
        : state.vendorInventory;
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
        vendorIndex: VendorIndex
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
      let randomResults = isEmpty(action.payload)
        ? []
        : action.payload.filter(prod => prod.enabled !== false);
      return {
        ...state,
        products: newProducts3,
        random_products:
          randomResults.length > 12 ? randomResults.slice(0, 12) : randomResults,
        fresh: false
      };
    case types.PRODUCT_ADDING:
      currentProducts2 = isEmpty(state.products) ? [] : state.products;
      let addProduct = isEmpty(action.payload) ? [] : [action.payload];
      newProducts2 = addProduct.concat(currentProducts2);
      let hasMore2 = !state.hasMore
        ? newProducts2.length / 25 >= state.index
        : state.hasMore;
      return {
        ...state,
        products: newProducts2,
        hasMore: hasMore2,
        fresh: false
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
      currentProducts2 = isEmpty(state.cart_products)
        ? []
        : state.cart_products;
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
        : [
            ...new Map(
              currentProductVendor
                .concat(action.payload)
                .map(o => [o['vendorId'], o])
            ).values()
          ];
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
        : [
            ...new Map(
              currentProductCat
                .concat(action.payload)
                .map(o => [o['categoryId'], o])
            ).values()
          ];
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
        ...initialState
      };
    case types.CLEAR_CURRENT_PRODUCTS_TABLE:
      return {
        ...state,
        products: null,
        index: 0
      }
    case types.CLEAR_FILTERED_PRODUCTS:
      return {
        ...state,
        products_filtered: null,
        products_filtered_last: null,
        filteredHasMore: false,
        filteredIndex: 0,
      };
    case types.LOAD_CART:
      return {
        ...state,
        cart: action.payload,
        cart_products: action.cart_products,
        loadingCart: false
      };
    default:
      return state;
  }
}
