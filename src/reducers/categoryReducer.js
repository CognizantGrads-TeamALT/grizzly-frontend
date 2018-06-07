import * as types from "../actions/types";
import isEmpty from "../validation/is-empty";

const initialState = {
  categories: null,
  hasMore: false,
  index: 0
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
      };
    case types.CATEGORY_UPDATED:
      return {
        ...state,
        updateOnce: false,
        loading: false
      };
    case types.GET_CATEGORIES:
      const hasMore =
        action.payload.length < 25 || isEmpty(action.payload.length)
          ? false
          : true;
      const currentCats = isEmpty(state.categories) ? [] : state.categories;
      const index = isEmpty(state.categories) ? 1 : state.index+1;
      const newCats = isEmpty(action.payload)
        ? currentCats
        : [...new Map(currentCats.concat(action.payload).map(o => [o['categoryId'], o])).values()];
      return {
        ...state,
        categories: newCats,
        hasMore: hasMore,
        index: index,
        loading: false
      };
    case types.CATEGORY_ADDING:
      const currentCats2 = isEmpty(state.categories) ? [] : state.categories;
      const addCategory = isEmpty(action.payload) ? [] : [action.payload];
      const newCats2 = addCategory.concat(currentCats2);
      const hasMore2 = !state.hasMore ? ((newCats2.length / 25) >= state.index+1) : state.hasMore;
      return {
        ...state,
        categories: newCats2,
        hasMore: hasMore2,
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
    case types.CATEGORY_TOGGLEBLOCK:
      return {
        ...state,
        categories: state.categories.map(
          category =>
            category.categoryId === action.payload.categoryId
              ? action.payload
              : category
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