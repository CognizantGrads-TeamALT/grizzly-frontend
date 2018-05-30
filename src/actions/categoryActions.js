import { GET_CATEGORIES, CATEGORY_LOADING } from "./types";
import { CATEGORY_API_GATEWAY } from "./microservices";
import axios from "axios";

// Get Category List
export const getCategories = () => dispatch => {
  dispatch(setCategoryLoading());
  axios
    .get(CATEGORY_API_GATEWAY + "/all/default")
    .then(res =>
      dispatch({
        type: GET_CATEGORIES,
        payload: res.data
      })
    )
    .catch(err =>
      dispatch({
        type: GET_CATEGORIES,
        payload: {}
      })
    );
};

// Category loading
export const setCategoryLoading = () => {
  return {
    type: CATEGORY_LOADING
  };
};
