import {
  GET_CATEGORIES,
  CATEGORY_LOADING,
  CATEGORY_ADDING,
  CATEGORY_EDITING,
  CATEGORY_DELETING,
  CATEGORY_EDITED
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
    case CATEGORY_EDITING:
      return {
        ...state,
        loading: true
      };
    case CATEGORY_EDITED:
      return {
        ...state,
        categories: state.categories.map(
          cat =>
            cat.categoryId === action.payload.categoryId ? action.payload : cat
        ),
        loading: false
      };
    case CATEGORY_DELETING:
      return {
        ...state,
        categories: state.categories.filter(
          category => category.categoryId !== action.payload
        )
      };
    default:
      return state;
  }
}
