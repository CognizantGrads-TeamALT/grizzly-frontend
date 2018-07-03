import React, { Component } from "react";
import { connect } from "react-redux";
import { withRouter } from "react-router-dom";
import { Link } from "react-router-dom";
import isEmpty from "../../../validation/is-empty";
import unavailable from "../../../img/unavailable.png";
import Spinner from "../../common/Spinner";
import PropTypes from "prop-types";
import { getProduct, getProductImage, getProductBatch } from "../../../actions/productsActions";
import { loadCart, saveCart, changeQuantity, removeFromCart } from "../../../actions/cartActions";

class ShoppingCart extends Component {
  constructor(props) {
    super(props);
    this.state = {
      totalPrice: 0,
      triggeredFetch: false,
      quantity: 1
    }

    this.onChange = this.onChange.bind(this);
    this.onClick = this.onClick.bind(this);

    this.triggeredFetch = false;
    this.totalPrice = 0;
  }
  // Will update the totalPrice once the cart is cleared
  componentWillUpdate() {
    this.totalPrice = 0;
  }
  // Load their cart from local storage if it is empty...
  componentDidMount() {
    if (isEmpty(this.props.product.cart)) {
      this.props.loadCart();
    }
  }

  getImg(product) {
    let imgInfo = this.props.product.images[product.productId][0];
    return (
      <img
        key={product.productId}
        src={imgInfo.base64Image}
        className="img-responsive"
        alt=""
        style={{ width: "150px", height: "150px" }}
      />
    );
  }

  getImages(products) {
    for (let product of products) {
      if (!isEmpty(product.imageDTO) && isEmpty(this.props.product.images[product.productId])) {
        this.props.getProductImage(product.productId, product.imageDTO[0].imgName);
      }
    }
  }
  removeFromCart(single, productId) {
    this.props.removeFromCart(single.productId);
  }

  onChange(productId, newValue) {
    this.props.changeQuantity(productId, newValue);
  }

  onClick(e) {
    this.props.cart.pop(this.props.productId);
  };

  showImg(product) {
    // If we don't have any images.
    if (isEmpty(this.props.product.images[product.productId])) {
      // If the product details has no images.
      if (isEmpty(product.imageDTO)) {
        return (
          <img
            src={unavailable}
            className="img-responsive"
            style={{ width: "150px", height: "150px" }}
            alt="Unavailable"
          />
        );
        // We have image but its loading, so wait.
      } else {
        return <Spinner size={"150px"} />;
      }
      // Return the loaded image.
    } else {
      return this.getImg(product);
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
          productIdArray = (productIdArray === '' ? productId : productIdArray + ',' + productId);
        }
      }

      if (productIdArray !== '') {
        console.log(productIdArray);
        this.props.getProductBatch(productIdArray);
      } else
        this.props.product.fetchingCart = false;
    }
  }
  // Adding the total price for all the items in cart
  addToMoney(additionalPrice) {
    this.totalPrice += additionalPrice
  }

  show() {
    // No longer  "loading local cart"... so we load the main items.
    if (!this.props.product.loadingCart) {
      if (!this.triggeredFetch) {
        this.loadItems();
      }
    }

    // If we're fetching data from api or loading the cart....
    if (!isEmpty(this.props.product.cart) && isEmpty(this.props.product.cart_products)) {
      if (this.props.product.loadingCart || this.props.product.fetchingCart) {
        return (
          <div className="text-center">
            <Spinner size={'150px'} />
          </div>
        );
      }
    } else if (isEmpty(this.props.product.cart)) {
      return <p align="center" className="mt-6">No items found.</p>;
    }

    const cartItems = this.props.product.cart_products;
    this.getImages(cartItems);
    this.totalPrice = 0;
    return cartItems.map(prod => (
      <div key={prod.productId}>
        <div className="row-8 d-inline products-information">
          <div className="col-3 ml-5 d-inline products-image">
            <Link
              className="align-content-center"
              to={`/customerdetailedproduct/${prod.productId}`}
            >
              {" "}
              {this.showImg(prod)}
            </Link>
          </div>
          <div className="col-6 d-inline product-price-quantity align-right">
            <h6 className="d-inline ml-5">{prod.name}</h6>
            <ul className="d-inline">
              <li id="price" className="d-inline mr-3">
                $ {prod.price}
              </li>
              <li className="d-inline">
                <input
                  name="quantity"
                  className="quantity-select"
                  value={this.props.product.cart[prod.productId]}
                  min="1"
                  max="50"
                  type="number"
                  onChange={(e) => this.onChange(prod.productId, e.target.value)}
                />
              </li>
            </ul>
          </div>

          {/* display the totalprice per item according to the quantity */}
          <div align="right" className="col-2 d-inline product-total-price ">
            <p name="totalPricePerProduct" className="d-inline">
              {" "}
              $ {prod.price * this.props.product.cart[prod.productId]}</p>
          </div>
          <div align="right" className="col-1 d-inline remove-btn">
            <button
              className=" d-inline more-rounded hover-w-b fas fa-times"
              onClick={(event) => this.props.removeFromCart(prod.productId)}
            />
          </div>
        </div>
        <hr width="100%" />
        {this.addToMoney(this.props.product.cart[prod.productId] * prod.price)}
      </div>
    ));
  }

  render() {
    return (
      <div className="shopping cart">
        <div className="row-2 mt-8 items-in-cart">
          <h2 className="ml-5 h2TextColour">Items in Your Cart</h2>
          <hr width="100%" />
        </div>
        <div>{this.show()}</div>
        <div align="right" className="totalprice d-inline mb-8">
          <div align="center" className="d-inline col mr-6 mb-5">
            <h4 align="center" className="d-inline h4-totalprice">
              Totalprice of items: </h4>
            <div align="center" className="d-inline ">
              <h4 className="d-inline"> ${this.totalPrice}</h4>
            </div>
          </div>
        </div>
        <div align="right" className="row-2 d-inline checkout-btn div-checkout mt-5">
          <Link
            className="d-inline btn continue-btn more-rounded btnCheckOutCart "
            to="/customer">
            {" "}
            Continue Shopping
          </Link>
          <Link
            className="d-inline btn ml-3 checkout-btn more-rounded btnCheckOutCart"
            to="/payment">
            Checkout
          </Link>
        </div>
      </div>
    );
  }
}

ShoppingCart.propTypes = {
  getProduct: PropTypes.func.isRequired,
  getProductImage: PropTypes.func.isRequired,
  getProductBatch: PropTypes.func.isRequired,

  loadCart: PropTypes.func.isRequired,
  saveCart: PropTypes.func.isRequired,
  changeQuantity: PropTypes.func.isRequired,

  product: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
  product: state.product
});

export default connect(
  mapStateToProps,
  {
    getProduct,
    getProductImage,
    getProductBatch,
    loadCart,
    saveCart,
    changeQuantity,
    removeFromCart
  }
)(withRouter(ShoppingCart));
