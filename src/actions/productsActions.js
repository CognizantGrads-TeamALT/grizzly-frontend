import {
    GET_PRODUCTS,
    PRODUCTS_LOADING
} from "./types";
import { PRODUCT_API_GATEWAY } from "./microservices";
import axios from "axios";


// Get Product List
export const getProducts = () => dispatch => {
    dispatch(setProductLoading());
    axios
        .get(PRODUCT_API_GATEWAY + "/all/default")
        .then(res =>
            dispatch({
                type: GET_PRODUCTS,
                payload: res.data
            })
        )
        .catch(err =>
            dispatch({
                type: GET_PRODUCTS,
                payload: {}
            })
        );
};

// Product Loading
export const setProductLoading = () => {
    return {
        type: PRODUCTS_LOADING
    };
};
