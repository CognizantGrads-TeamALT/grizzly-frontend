import { GET_CATEGORIES, CATEGORY_LOADING } from "../actions/types";

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
    default:
      return state;
  }
}
