import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import { toast } from 'react-toastify';
import isEmpty from '../../../validation/is-empty';
import { withRouter } from 'react-router-dom';
import PropTypes from 'prop-types';
import PaypalExpressBtn from 'react-paypal-express-checkout';
import { getProductBatch } from '../../../actions/productsActions';
import { loadCart, saveCart } from '../../../actions/cartActions';
import { addOrder } from '../../../actions/userActions';

class Payment extends Component {
  constructor(props) {
    super(props);
    this.props.loadCart();
    this.state = {
      totalPrice: 0,
      triggeredFetch: false
    };
    // eslint-disable-next-line
    let orderFetched = false;
    this.calcOrderPrice = this.calcOrderPrice.bind(this);
    this.onSuccess = this.onSuccess.bind(this);
    this.onCancel = this.onCancel.bind(this);
    this.onError = this.onError.bind(this);
  }

  showOrderContent() {
    this.triggeredFetch = true;
    let { cart, cart_products } = this.props.product;

    let productIdArray = '';
    if (!this.orderFetched || isEmpty(cart_products)) {
      for (var productId in cart) {
        productIdArray =
          productIdArray === '' ? productId : productIdArray + ',' + productId;
      }

      this.props.getProductBatch(productIdArray);
      this.orderFetched = true;
    }

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
    let { cart } = this.props.product;
    let totalCost = this.calcOrderPrice();

    let orderItems = Object.keys(cart).map(function(prodId) {
      return {
        productId: parseInt(prodId, 10),
        quantity: cart[prodId]
      };
    });

    const newOrder = {
      user_id: isEmpty(this.props.user.user.userId)
        ? this.props.user.user.userId
        : 1,
      txn_id: payment.paymentID,
      cost: totalCost,
      departing_location: 'Melbourne City',
      shipped_on: '2018-06-15',
      orderItemDTO: orderItems
    };
    this.props.addOrder(newOrder);
    toast.success('Your order is being processed. Thank you!');
  }
  onCancel(data) {
    // console.log('The payment was cancelled!', data);
    toast.info('The payment was cancelled!');
  }

  onError(err) {
    // console.log('Error loading Paypal script!', err);
    toast.info('Oopppsss!!! Something went wrong!');
  }

  render() {
    const client = {
      sandbox:
        'AWiPslSzOb4c5wFKr0wWQyE2t5yZ_hOpEHFKbWPyb5P0m-Zlmi_VHwiCMnqo2rU0EQb61FbQPfLUftUx',
      production: 'YOUR-PRODUCTION-APP-ID'
    };

    return (
      <div className="container paymentContainer rounded-top">
        <div className="row">
          <div className="col">
            <table className="table table-striped">
              <thead>
                <tr>
                  <th scope="col">Your Order:</th>
                </tr>
              </thead>
              <tbody>{this.showOrderContent()}</tbody>
            </table>
          </div>
          <div className="col paymentRightCol left-border-line">
            <div className="row btnPayment">
              <PaypalExpressBtn
                client={client}
                currency={'AUD'}
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
  saveCart: PropTypes.func.isRequired,
  addOrder: PropTypes.func.isRequired
};
const mapStateToProps = state => ({
  product: state.product,
  user: state.user
});
export default connect(
  mapStateToProps,
  {
    getProductBatch,
    addOrder,

    loadCart,
    saveCart
  }
)(withRouter(Payment));
