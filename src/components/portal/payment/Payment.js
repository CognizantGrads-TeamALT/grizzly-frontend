import React, { Component } from "react";
import { Link } from "react-router-dom";

class Payment extends Component {
  showOrderContent() {
    const cart = JSON.parse(localStorage.getItem("cart"));
    console.log(cart);
    return cart.map(prod => (
      <tr key={prod.productId}>
        <td>{prod.name}</td>
        <td>Price: {prod.price}</td>
      </tr>
    ));
  }
  render() {
    return (
      <div className="container paymentContainer">
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
            <div className="row ">
              <button className="btn more-rounded btn-sm red-b  btnPayment">
                Proceed to Payment
              </button>
            </div>
            <div className="row mt-3">
              <Link
                className="btn more-rounded btn-sm orange-b btnReturnCart"
                to="/shoppingcart"
              >
                Return to Cart
              </Link>
            </div>
          </div>
        </div>
      </div>
    );
  }
}
export default Payment;
