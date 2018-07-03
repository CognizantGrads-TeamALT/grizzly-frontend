import React, { Component } from "react";
import { Link } from "react-router-dom";
import { connect } from "react-redux";
import isEmpty from "../../../validation/is-empty";
import { withRouter } from "react-router-dom";
import PropTypes from "prop-types";
import PaypalExpressBtn from "react-paypal-express-checkout";
import { getProductBatch } from "../../../actions/productsActions";
import { loadCart, saveCart } from "../../../actions/cartActions";
import { addOrder } from "../../../actions/userActions";

class Payment extends Component {
  constructor(props) {
    super(props);
    this.props.loadCart();
    this.state = {
      totalPrice: 0,
      triggeredFetch: false
    };

    let orderFetched = false;
    this.calcOrderPrice = this.calcOrderPrice.bind(this);
    this.onSuccess = this.onSuccess.bind(this);
    this.onCancel = this.onCancel.bind(this);
    this.onError = this.onError.bind(this);
  }

  showOrderContent() {
    this.triggeredFetch = true;
    let { cart, cart_products } = this.props.product;

    let productIdArray = "";
    if (!this.orderFetched || isEmpty(cart_products)) {
      for (var productId in cart) {
        productIdArray =
          productIdArray === "" ? productId : productIdArray + "," + productId;
      }

      this.props.getProductBatch(productIdArray);
      this.orderFetched = true;
    }

    // console.log("cart");
    // console.log(cart);
    // console.log("cart_products");
    // console.log(cart_products);
    return cart_products.map(prod => (
      <tr key={prod.productId}>
        <td>
          {prod.name} x{cart[prod.productId]}
        </td>
        <td>Price (AUD): ${prod.price * cart[prod.productId]}.00</td>
      </tr>
    ));
  }
  calcOrderPrice() {
    let { cart, cart_products } = this.props.product;
    let totalPrice = 0;
    cart_products.map(
      prod => (totalPrice += prod.price * cart[prod.productId])
    );
    return totalPrice;
  }

  onSuccess(payment) {
    console.log(payment);
    let { cart_products } = this.props.product;
    let totalCost = this.calcOrderPrice();
    const newOrder = {
      user_id: 1,
      txn_id: payment.paymentID,
      cost: totalCost,
      departing_location: "Melbourne City",
      shipped_on: "2018-06-15",
      order_items: cart_products
    };
    console.log(newOrder);
    addOrder(newOrder);
  }
  onCancel(data) {
    console.log("The payment was cancelled!", data);
  }

  onError(err) {
    console.log("Error loading Paypal script!", err);
  }

  render() {
    const client = {
      sandbox:
        "AWiPslSzOb4c5wFKr0wWQyE2t5yZ_hOpEHFKbWPyb5P0m-Zlmi_VHwiCMnqo2rU0EQb61FbQPfLUftUx",
      production: "YOUR-PRODUCTION-APP-ID"
    };

    return (
      <div className="container paymentContainer rounded-top">
        <div className="row ">
          <div className="col">
            <table className="table table-striped">
              <thead className="thead-light">
                <tr>Your Order:</tr>
              </thead>
              <tbody>{this.showOrderContent()}</tbody>
            </table>
          </div>
          <div className="col paymentRightCol left-border-line">
            <div className="row btnPayment">
              <PaypalExpressBtn
                client={client}
                currency={"AUD"}
                total={this.calcOrderPrice()}
                onSuccess={this.onSuccess}
                onCancel={this.onCancel}
                onError={this.onError}
              />
            </div>
            <div className="row mt-3">
              <Link
                className="btn more-rounded btn-sm orange-b btnReturnCart"
                to="/shoppingcart"
              >
                Return to Cart
              </Link>
            </div>
            <div className="row mt-4 payTotalPrice">
              Total Price: ${this.calcOrderPrice()}.00
            </div>
          </div>
        </div>
      </div>
    );
  }
}

Payment.propTypes = {
  getProductBatch: PropTypes.func.isRequired,
  product: PropTypes.object.isRequired,
  loadCart: PropTypes.func.isRequired,
  saveCart: PropTypes.func.isRequired
};
const mapStateToProps = state => ({
  product: state.product
});
export default connect(
  mapStateToProps,
  {
    getProductBatch,

    loadCart,
    saveCart
  }
)(withRouter(Payment));
