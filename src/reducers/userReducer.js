import * as types from '../actions/types';
import isEmpty from '../validation/is-empty';

const initialState = {
  user: null,
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
    case types.GET_USERS:
      return {
        ...state,
        user: action.payload,
        userType: action.userType,
        isAuthenticated: true,
        loading: false
      };
    case types.SET_CURRENT_USER:
      return {
        ...state,
        isAuthenticated: !isEmpty(action.payload),
        googleProfile: action.payload,
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
