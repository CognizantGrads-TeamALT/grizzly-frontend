import * as types from '../actions/types';
import isEmpty from '../validation/is-empty';

const initialState = {
  user: null,
  orders: [],
  googleProfile: null,
  userType: null,
  isAuthenticated: false
};

export default function(state = initialState, action) {
  switch (action.type) {
    case types.USER_LOADING:
      return {
        ...state,
        loading: true
      };
    case types.USER_UPDATED:
      return {
        ...state,
        loading: false
      };
    case types.GET_USERS:
      return {
        ...state,
        user: action.payload,
        userType: action.userType,
        isAuthenticated: true,
        loading: false
      };
    case types.GET_USER_BY_EMAIL:
      return {
        ...state,
        user: action.payload
      };
    case types.SET_CURRENT_USER:
      return {
        ...state,
        isAuthenticated: !isEmpty(action.payload),
        googleProfile: action.payload,
        userType: 'customer' // TODO : fix this, receive from BE instead.
      };
    case types.GET_USER_WITH_ORDER:
      return {
        ...state,
        orders: action.payload,
        loading: false
       };
    case types.USER_PROFILE_UPDATE:
      return {
        ...state,
        isAuthenticated: !isEmpty(action.payload),
        user: action.payload,
        userType: 'customer' // TODO : fix this, receive from BE instead.
      };
    case types.CLEAR_CURRENT_USER:
      return {
        ...state,
        user: null,
        googleProfile: null,
        userType: null,
        isAuthenticated: false,
        loading: false
      };
    default:
      return state;
  }
}
