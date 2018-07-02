import React, { Component } from "react";
import { Link } from "react-router-dom";
import { connect } from "react-redux";
import { withRouter } from "react-router-dom";
import PropTypes from "prop-types";
import PaypalExpressBtn from "react-paypal-express-checkout";
import { loadCart, saveCart } from "../../../actions/cartActions";

class Payment extends Component {
  componentDidMount() {
    this.props.loadCart();
  }
  showOrderContent() {
    let { cart, cart_products } = this.props.product;
    console.log(cart_products);
    return cart_products.map(prod => (
      <tr key={prod.productId}>
        <td>
          {prod.name} x{cart[prod.productId]}
        </td>
        <td>Price (AUD): {prod.price}</td>
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
    console.log("Ben Lee");
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
  loadCart: PropTypes.func.isRequired,
  saveCart: PropTypes.func.isRequired
};
const mapStateToProps = state => ({
  product: state.product
});
export default connect(
  mapStateToProps,
  {
    loadCart,
    saveCart
  }
)(withRouter(Payment));
