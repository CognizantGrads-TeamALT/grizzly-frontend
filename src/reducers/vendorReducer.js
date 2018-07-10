import * as types from '../actions/types';
import isEmpty from '../validation/is-empty';

const initialState = {
  vendors: null,
  hasMore: false,
  loading: false,
  index: 0,
};

export default function (state = initialState, action) {
  switch (action.type) {
    case types.VENDOR_LOADING:
      return {
        ...state,
        loading: true
      };
    case types.VENDOR_UPDATING:
      return {
        ...state,
        updateOnce: true
      };
    case types.VENDOR_UPDATED:
      return {
        ...state,
        updateOnce: false,
        loading: false
      };
    case types.GET_VENDORS:
      const hasMore =
        action.payload.length < 25 || isEmpty(action.payload.length)
          ? false
          : true;
      const currentVendors = isEmpty(state.vendors) ? [] : state.vendors;
      const index = isEmpty(state.vendors) ? 1 : state.index + 1;
      const newVendors = isEmpty(action.payload)
        ? currentVendors
        : [
            ...new Map(
              currentVendors.concat(action.payload).map(o => [o['vendorId'], o])
            ).values()
          ];
      return {
        ...state,
        vendors: newVendors,
        hasMore: hasMore,
        index: index,
        loading: false
      };
    case types.VENDOR_TYPEAHEAD_UPDATE:
      return {
        ...state,
        cur_id: action.payload.cur_id,
        valid_vendor: action.payload.valid_vendor,
        cur_name: action.payload.name
      };
    case types.VENDOR_ADDING:
      const currentVendors2 = isEmpty(state.vendors) ? [] : state.vendors;
      const addVendor = isEmpty(action.payload) ? [] : [action.payload];
      const newVendors2 = addVendor.concat(currentVendors2);
      const hasMore2 = !state.hasMore
        ? newVendors2.length / 25 >= state.index + 1
        : state.hasMore;
      return {
        ...state,
        vendors: newVendors2,
        hasMore: hasMore2,
        updateOnce: true
      };
    case types.VENDOR_DELETING:
      return {
        ...state,
        vendors: state.vendors.filter(
          vendor => vendor.vendorId !== action.payload
        )
      };
    case types.VENDOR_TOGGLEBLOCK:
      return {
        ...state,
        vendors: state.vendors.map(
          vendor =>
            vendor.vendorId === action.payload.vendorId
              ? action.payload
              : vendor
        )
      };
    case types.CLEAR_CURRENT_VENDORS:
      return {
        ...initialState,
      };
    default:
      return state;
  }
}
