import React, { Component } from "react";
import { Link } from "react-router-dom";
import PaypalExpressBtn from "react-paypal-express-checkout";

class Payment extends Component {
  showOrderContent() {
    const cart = JSON.parse(localStorage.getItem("cart"));
    console.log(cart);
    return cart.map(prod => (
      <tr key={prod.productId}>
        <td>
          {prod.name} x{prod.quantity}
        </td>
        <td>Price (AUD): {prod.price}</td>
      </tr>
    ));
  }
  calcOrderPrice() {
    const products = JSON.parse(localStorage.getItem("cart"));
    let totalPrice = 0;
    products.map(prod => (totalPrice += prod.price));
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
export default Payment;
