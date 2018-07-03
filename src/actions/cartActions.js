import * as types from './types';
import isEmpty from '../validation/is-empty';

const location = 'grizzly-alt-cart';

// Load the cart data.
export const loadCart = () => dispatch => {
    var data = localStorage.getItem(location);

    dispatch({
        type: types.LOAD_CART,
        payload: !isEmpty(data) ? JSON.parse(data) : {}
    });
}

// Save the cart data.
export const saveCart = data => {
    let newData = !(isEmpty(data)) ? data : {}
    localStorage.setItem(location, JSON.stringify(newData));
}

// Add an item to the cart.
export const addToCart = product => dispatch => {
    dispatch({
        type: types.ADD_TO_CART,
        product: product
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