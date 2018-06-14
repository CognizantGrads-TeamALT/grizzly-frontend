import * as types from '../actions/types';

const initialState = {
  user: null
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
        loading: false
      };

    default:
      return state;
  }
}
