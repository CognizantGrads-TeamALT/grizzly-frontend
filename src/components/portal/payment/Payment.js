import React, { Component } from 'react';
import { Link, withRouter } from 'react-router-dom';
import { connect } from 'react-redux';
import { toast } from 'react-toastify';
import isEmpty from '../../../validation/is-empty';
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

  componentDidMount() {
    let { cart, cart_products } = this.props.product;
    if (isEmpty(cart) || isEmpty(cart_products)) {
      this.props.history.push('/');
    }
  }

  showOrderContent() {
    this.triggeredFetch = true;
    let { cart, cart_products } = this.props.product;

    let productIdArray = '';
    if (!this.orderFetched || isEmpty(cart_products)) {
      for (var productId in cart) {
        productIdArray = isEmpty(productIdArray)
          ? productId
          : productIdArray + ',' + productId;
      }

      if (!isEmpty(productIdArray)) {
        this.props.getProductBatch(productIdArray);
        this.orderFetched = true;
      }
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
      user_id: !isEmpty(this.props.user.user.userId)
        ? this.props.user.user.userId
        : 1,
      txn_id: payment.paymentID,
      cost: totalCost,
      departing_location: 'Melbourne City',
      shipped_on: '2018-06-15',
      orderItemDTO: orderItems
    };
    this.props.addOrder(newOrder);
    this.redirectSuccessfulPayment();
  }

  redirectSuccessfulPayment() {
    toast.success('Your order is being processed. Thank you!');

    this.props.history.push('/');
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
      <div className="container m-5 p-5 my-auto">
        <div className="row title-size-2em mb-3">Confirm Purchase</div>
        <div className="row mb-3">
          <div className="col-8 pl-0">
            <table className="table">
              <tbody>{this.showOrderContent()}</tbody>
            </table>
          </div>
          <div className="col-4 mx-auto">
            <div className="row surround-parent mb-4 title-size-1em">
              <div className="col">Total:</div>
              <div className="col bottom-border">
                ${this.calcOrderPrice()}.00
              </div>
            </div>
            <div className="row surround-parent">
              <div className="pl-3 mr-0 w-100">
                <PaypalExpressBtn
                  client={client}
                  currency={'AUD'}
                  shipping={1}
                  total={this.calcOrderPrice()}
                  onSuccess={this.onSuccess}
                  onCancel={this.onCancel}
                  onError={this.onError}
                />
                <Link
                  className="btn btn-outline-success more-rounded btn-sm surround-parent w-100"
                  to="/shoppingcart"
                >
                  Return to Cart
                </Link>
              </div>
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
