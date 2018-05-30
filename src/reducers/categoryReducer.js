import {
  GET_CATEGORIES,
  CATEGORY_LOADING,
  CATEGORY_ADDING
} from "../actions/types";

const initialState = {
  categories: null
};

export default function(state = initialState, action) {
  switch (action.type) {
    case CATEGORY_LOADING:
      return {
        ...state,
        loading: true
      };
    case GET_CATEGORIES:
      return {
        ...state,
        categories: action.payload,
        loading: false
      };
    case CATEGORY_ADDING:
      return {
        ...state,
        loading: true
      };
    default:
      return state;
  }
}
