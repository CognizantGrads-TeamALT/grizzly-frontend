import React, { Component } from "react";
import { connect } from "react-redux";
import { withRouter } from "react-router-dom";
import { Link } from "react-router-dom";
import isEmpty from "../../../validation/is-empty";
import unavailable from "../../../img/unavailable.png";
import Spinner from "../../common/Spinner";
import PropTypes from "prop-types";
import {
  getProduct,
  getProductImage,
  getProductBatch
} from "../../../actions/productsActions";
import { loadCart, saveCart } from "../../../actions/cartActions";

class ShoppingCart extends Component {
  constructor(props) {
    super(props);
    this.state = {
      totalPrice: 0,
      triggeredFetch: false
    };

    this.onChange = this.onChange.bind(this);

    this.triggeredFetch = false;
  }

  // Load their cart from local storage if it is empty...
  componentDidMount() {
    // if (isEmpty(this.props.product.cart)) {
    this.props.loadCart();
    // }
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

  onChange(e) {
    console.log("inside onchange");
    this.setState({
      [e.target.name]: e.target.value
      // totalprice: this.state.quantity*this.state.price
    });

    console.log(e.target.name);
    console.log(e.target.value);
  }

  onClick = event => {
    this.setState({ clicks: this.state.value - 1 });
    console.log(this.clicks);
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
      let productIdArray = "";
      for (var productId in cart) {
        // we don't have data for this product.
        if (isEmpty(this.props.product.products[productId])) {
          // check if productid array is empty and return only the number,
          // else append the array with a comma and the number.
          productIdArray =
            productIdArray === ""
              ? productId
              : productIdArray + "," + productId;
        }
      }

      if (productIdArray !== "") {
        console.log(productIdArray);
        this.props.getProductBatch(productIdArray);
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

    // If we're fetching data from api or loading the cart...
    if (this.props.product.loadingCart || this.props.product.fetchingCart) {
      return (
        <div className="text-center">
          <Spinner size={"150px"} />
        </div>
      );
    } else if (isEmpty(this.props.product.cart_products)) {
      return <p>No items found.</p>;
    }

    const cartItems = this.props.product.cart_products;
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
                  value="1"
                  min="1"
                  max="50"
                  maxLength="2"
                  type="number"
                  onChange={this.onChange}
                />
              </li>
            </ul>
          </div>
          <div align="right" className="col-2 d-inline product-total-price ">
            <p id="totalprice" className="d-inline">
              {" "}
              A$ {this.totalprice}
            </p>
          </div>
          <div className="col-1 d-inline remove-btn">
            <button
              className=" d-inline more-rounded hover-w-b fas fa-times"
              onClick={this.removeItem}
            />
          </div>
        </div>
        <hr width="100%" />
      </div>
    ));
  }

  render() {
    return (
      <div className="shopping cart">
        <div className="row-2 mt-8 items-in-cart">
          <h2 className="ml-5">Items in Your Cart</h2>
          <hr width="100%" />
        </div>
        <div>{this.show()}</div>
        <div align="right" className="row-2 d-inline checkout-btn div-checkout">
          <Link
            className="d-inline btn continue-btn more-rounded btnCheckOutCart "
            to="/customer"
          >
            {" "}
            Continue Shopping
          </Link>
          <Link
            className="d-inline ml-3 checkout-btn more-rounded btnCheckOutCart"
            to="/payment"
          >
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
    saveCart
  }
)(withRouter(ShoppingCart));
