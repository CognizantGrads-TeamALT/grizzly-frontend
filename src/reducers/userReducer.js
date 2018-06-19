import * as types from '../actions/types';

const initialState = {
  user: null,
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
    case types.CLEAR_CURRENT_USER:
      return {
        ...state,
        user: null,
        userType: null,
        isAuthenticated: false,
        loading: false
      };
    default:
      return state;
  }
}
