import * as types from './types';
import isEmpty from '../validation/is-empty';

const location = 'grizzly-alt-cart';

// Load the cart data.
export const loadCart = () => dispatch => {
    var data = localStorage.getItem(location);

    if (!isEmpty(data))
        dispatch({
            type: types.LOAD_CART,
            payload: JSON.parse(data)
        });
}

// Save the cart data.
export const saveCart = data => {
    if (!isEmpty(data))
        localStorage.setItem(location, JSON.stringify(data));
}

// Add an item to the cart.
export const addToCart = productId => dispatch => {
    dispatch({
        type: types.ADD_TO_CART,
        productId: productId
    })
}

// Adjust quantity for item inside the cart.
export const changeQuantity = (productId, quantity) => dispatch => {
    dispatch({
        type: types.ADJUST_CART_QUANTITY,
        productId: productId,
        quantity: quantity
    })
}

// Remove an item from the cart.
export const removeFromCart = productId => dispatch => {
    dispatch({
        type: types.REMOVE_FROM_CART,
        productId: productId
    })
}

// Empty the cart.
export const emptyCart = () => {
    localStorage.clear(location);
}