import {
    GET_PRODUCTS,
    PRODUCTS_LOADING,
    PRODUCT_ADDING
} from "../actions/types";

const initialState = {
    products: null
};

export default function(state = initialState, action) {
    switch (action.type) {
        case PRODUCTS_LOADING:
            return {
                ...state,
                loading: true
            };
        case GET_PRODUCTS:
            return {
                ...state,
                products: action.payload,
                loading: false
            };
        case PRODUCT_ADDING:
            return{
                ...state,
                loading: false
            }
        default:
            return state;
    }
}