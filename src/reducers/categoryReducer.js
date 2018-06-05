import * as types from "../actions/types";
import isEmpty from "../validation/is-empty";

const initialState = {
  categories: null,
  hasMore: false
};

export default function(state = initialState, action) {
  switch (action.type) {
    case types.CATEGORY_LOADING:
      return {
        ...state,
        loading: true
      };
    case types.CATEGORY_UPDATING:
      return {
        ...state,
        updateOnce: true
      }
    case types.GET_CATEGORIES:
      const hasMore =
        action.payload.length < 25 || isEmpty(action.payload.length)
          ? false
          : true;
      const currentCats = isEmpty(state.categories) ? [] : state.categories;
      const newCats = isEmpty(action.payload)
        ? currentCats
        : currentCats.concat(action.payload);
      return {
        ...state,
        categories: newCats,
        hasMore: hasMore,
        loading: false
      };
      case types.VENDOR_ADDING:
        const currentCats2 = isEmpty(state.categories) ? [] : state.categories;
        const addCategory = isEmpty(action.payload) ? [] : [action.payload];
        const newCats2 = addCategory.concat(currentCats2);
        return {
          ...state,
          categories: newCats2,
          updateOnce: true
        };
    case types.CATEGORY_EDITING:
      return {
        ...state,
        loading: true
      };
    case types.CATEGORY_EDITED:
      return {
        ...state,
        categories: state.categories.map(
          cat =>
            cat.categoryId === action.payload.categoryId ? action.payload : cat
        ),
        loading: false
      };
    case types.CATEGORY_DELETING:
      return {
        ...state,
        categories: state.categories.filter(
          category => category.categoryId !== action.payload
        )
      };
    case types.CLEAR_CURRENT_CATEGORIES:
      return {
        ...state,
        categories: null
      };
    default:
      return state;
  }
}
