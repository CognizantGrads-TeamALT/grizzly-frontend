import React, { Component } from "react";

class Payment extends Component {
  showOrderContent() {
    const cart = JSON.parse(localStorage.getItem("cart"));
    return cart.map(prod => (
      <div className="row">
        {prod.Name}
        {prod.Price}
      </div>
    ));
  }
  render() {
    return (
      <div className="container paymentContainer">
        <div className="row ">
          <div className="col">
            <div className="row">
              <p>Your Order:</p>
            </div>
            <div className="row">{this.showOrderContent()}</div>
          </div>
          <div className="col paymentRightCol left-border-line">
            <div className="row ">
              <button className="btn more-rounded btn-sm red-b  btnPayment">
                Proceed to Payment
              </button>
            </div>
            <div className="row mt-3">
              <button className="btn more-rounded btn-sm orange-b btnReturnCart">
                Return to Cart
              </button>
            </div>
          </div>
        </div>
      </div>
    );
  }
}
export default Payment;
