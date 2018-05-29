import { GET_CATEGORIES, CATEGORY_LOADING } from "./types";
//import axios from "axios";

const cats = [
  {
    categoryId: "1",
    name: "hats",
    description: "sport hats",
    productCount: "3"
  },
  {
    categoryId: "2",
    name: "pants",
    description: "sport pants",
    productCount: "2"
  },
  {
    categoryId: "3",
    name: "jackets",
    description: "sport jackets",
    productCount: "89898"
  }
];
// Get Category List
export const getCategories = () => dispatch => {
  dispatch(setCategoryLoading());
  // axios
  // .get("categorymicro/category/all")
  // .then(res =>
  //   dispatch({
  //     type: GET_CATEGORIES,
  //     payload: res.data
  //   })
  // )
  // .catch(err =>
  //   dispatch({
  //     type: GET_CATEGORIES,
  //     payload: {}
  //   })
  // );
  dispatch({
    type: GET_CATEGORIES,
    payload: cats
  });
};

// Category loading
export const setCategoryLoading = () => {
  return {
    type: CATEGORY_LOADING
  };
};
