import React, { Component } from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import { Link } from 'react-router-dom';
import isEmpty from '../../../validation/is-empty';
import Spinner from '../../common/Spinner';
import PropTypes from 'prop-types';
import { getProduct, getProductBatch } from '../../../actions/productsActions';
import {
  loadCart,
  saveCart,
  changeQuantity,
  removeFromCart
} from '../../../actions/cartActions';

import ProductImage from '../common/ProductImage';
import { toast } from 'react-toastify';

class ShoppingCart extends Component {
  constructor(props) {
    super(props);

    this.state = {
      totalPrice: 0,
      triggeredFetch: false,
      quantity: 1
    };

    this.onChange = this.onChange.bind(this);
    this.onClick = this.onClick.bind(this);
    this.goToPayment = this.goToPayment.bind(this);
    this.doRedirect = this.doRedirect.bind(this);

    this.triggeredFetch = false;
    this.totalPrice = 0;
  }

  // Will update the totalPrice once the cart is cleared
  componentDidUpdate() {
    this.totalPrice = 0;
  }

  componentWillMount(){
    window.scrollTo(0, 0)
  }

  // Load their cart from local storage if it is empty...
  componentDidMount() {
    if (
      isEmpty(this.props.product.cart) ||
      isEmpty(this.props.product.cart_products)
    ) {
      this.props.loadCart();
    }
  }

  onChange(productId, newValue) {
    this.props.changeQuantity(productId, newValue);
  }

  toastId = null;
  onClick(e) {
    if (!toast.isActive(this.toastId)) {
      this.toastId = toast.info('Your product has been removed');
    }
    if(isEmpty(this.cart_products))
    {
      this.totalPrice = 0 ;
    }
  }

  // This will fetch the items from the API.
  loadItems() {
    this.triggeredFetch = true;
    const cart = this.props.product.cart;

    if (!isEmpty(cart) && !this.state.loadingCart) {
      let productIdArray = '';
      for (var productId in cart) {
        // we don't have data for this product.
        if (isEmpty(this.props.product.products[productId])) {
          // check if productid array is empty and return only the number,
          // else append the array with a comma and the number.
          productIdArray =
            productIdArray === ''
              ? productId
              : productIdArray + ',' + productId;
        }
      }

      if (!isEmpty(productIdArray)) {
        this.props.getProductBatch(productIdArray);
      } else this.props.product.fetchingCart = false;
    }
  }
  // Adding the total price for all the items in cart
  addToMoney(additionalPrice) {
    this.totalPrice += additionalPrice;
  }

  doRedirect() {
    this.props.history.push({
      pathname: '/settings',
      state: { tabId: 'ProfileForm', previousPath: '/shoppingcart' }
    });
  }

  toast_Id = null;
  goToPayment() {
    if (this.props.user.isAuthenticated) {
      if (!this.props.user.isRegistered) {
        if (!toast.isActive(this.toast_Id)) {
          toast.info(
            <span onClick={this.doRedirect}>
              Click HERE to update your address!
            </span>
          );
        }
      } else {
        this.props.history.push('/payment');
      }
    } else {
      if (!toast.isActive(this.toast_Id)) {
        toast.info('Please sign in first!');
      }
    }
  }

  show() {
    // No longer  "loading local cart"... so we load the main items.
    if (!this.props.product.loadingCart) {
      if (!this.triggeredFetch) {
        this.loadItems();
      }
    }

    // If we're fetching data from api or loading the cart....
    if (
      !isEmpty(this.props.product.cart) &&
      isEmpty(this.props.product.cart_products)
    ) {
      if (this.props.product.loadingCart || this.props.product.fetchingCart) {
        return (
          <div className="text-center">
            <Spinner size={'150px'} />
          </div>
        );
      }
    } else if (isEmpty(this.props.product.cart)) {
      return (
        <p align="center" className="mt-6">
          No items in cart.
        </p>
      );
    }

    const cartItems = this.props.product.cart_products;
    this.totalPrice = 0;
    return cartItems.map(prod => (
      <div className="row m-3" key={prod.productId}>
        <div className="col-5 my-auto mx-auto">
          <Link to={`/customerdetailedproduct/${prod.productId}`}>
            <ProductImage prod={prod} />
          </Link>
        </div>
        <div className="col-7">
          <div className="text-left row">
            <div className="col-4">{prod.name}</div>
            <div className="col-2">${prod.price} x</div>
            <div className="col-2 pl-0">
              <input
                name="quantity"
                className="quantity-select "
                value={this.props.product.cart[prod.productId]}
                min="1"
                max="50"
                type="number"
                onChange={e => this.onChange(prod.productId, e.target.value)}
              />
            </div>
            <div className="col-2">
              ${prod.price * this.props.product.cart[prod.productId]}
            </div>
            <div className="col-2 pl-0">
              <button
                className="d-inline more-rounded red-b fas fa-times"
                onClick={event => {
                  this.props.removeFromCart(prod.productId);
                  this.onClick();
                }}
              />
            </div>
          </div>
        </div>
        {this.addToMoney(this.props.product.cart[prod.productId] * prod.price)}
      </div>
    ));
  }

  render() {
    return (
      <div className="col m-5 p-5 mx-auto griz-portal-parent">
        <div className="row m-2 title-size-2em mb-3 my-auto">
          Items in Your Cart
        </div>
        <div className="row mb-5 mt-5">
          <div className="col-8">{this.show()}</div>
          <div className="col-4 pl-0 text-left">
            <div className="mt-2 fnt-weight-500 title-size-1-5em">Total:</div>
            <div className="fnt-weight-400 title-size-1em">
              ${this.totalPrice}
            </div>
            {!isEmpty(this.props.product.cart) && (
              <button
                className="mt-3 btn orange-b surround-parent w-75 more-rounded"
                onClick={this.goToPayment}
              >
                Checkout
              </button>
            )}
            <Link
              className="mt-3 btn btn-outline-success surround-parent w-75 more-rounded"
              to="/"
            >
              Continue Shopping
            </Link>
          </div>
        </div>
      </div>
    );
  }
}

ShoppingCart.propTypes = {
  getProduct: PropTypes.func.isRequired,
  getProductBatch: PropTypes.func.isRequired,

  loadCart: PropTypes.func.isRequired,
  saveCart: PropTypes.func.isRequired,
  changeQuantity: PropTypes.func.isRequired,

  product: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
  product: state.product,
  user: state.user
});

export default connect(
  mapStateToProps,
  {
    getProduct,
    getProductBatch,
    loadCart,
    saveCart,
    changeQuantity,
    removeFromCart
  }
)(withRouter(ShoppingCart));
