import * as types from '../actions/types';
import isEmpty from '../validation/is-empty';

const initialState = {
  user: null,
  orders: [],
  googleProfile: null,
  role: null,
  isAuthenticated: false,
  isRegistered: null
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
        role: action.payload.role,
        isAuthenticated: !isEmpty(action.payload),
        loading: false
      };
    case types.GET_USER_BY_EMAIL:
      return {
        ...state,
        user: action.payload,
        role: isEmpty(action.payload.role) ? 'customer' : action.payload.role,
        isRegistered: !isEmpty(action.payload)
      };
    case types.SET_CURRENT_USER:
      return {
        ...state,
        isAuthenticated: !isEmpty(action.payload),
        googleProfile: action.payload
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
        role: action.payload.role
      };
    case types.CLEAR_CURRENT_USER:
      return {
        ...state,
        user: null,
        googleProfile: null,
        role: null,
        isAuthenticated: false,
        isRegistered: null,
        loading: false
      };
    default:
      return state;
  }
}
