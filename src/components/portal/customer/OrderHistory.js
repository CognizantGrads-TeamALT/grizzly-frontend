import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { getUserOrder } from '../../../actions/userActions';
import { getProducts } from '../../../actions/productsActions';
import Spinner from '../../common/Spinner';
import isEmpty from '../../../validation/is-empty';
import { Card, CardHeader, CardBody, CardTitle, CardText } from 'reactstrap';

import ProductImage from '../common/ProductImage';

class OrderHistory extends Component {
  constructor(props) {
    super(props);
    this.state = {
      userId: 1
    };
    this.props.getUserOrder();
    if (
      isEmpty(this.props.product.products) ||
      this.props.product.products.length < 20 // Quantity reduced after search, need to load more/again. TODO: Fix this.
    ) {
      this.props.getProducts();
    }
  }

  getProductDetails(prodId) {
    if (!isEmpty(this.props.product.products)) {
      return this.props.product.products
        .filter(item => item.productId === parseInt(prodId, 10))
        .map(prod => (
          <div className="row m-3" key={prodId}>
            <div className="col-4 my-auto mx-auto">
              <ProductImage prod={prod} />
            </div>
            <div className="col-8">
              <CardBody>
                <CardTitle className="text-left">{prod.name}</CardTitle>
                <CardText className="text-left">{prod.desc}</CardText>
              </CardBody>
            </div>
          </div>
        ));
    }
  }

  displayItems(ordrs) {
    if (!isEmpty(ordrs)) {
      return ordrs.orderItemDTO.map(itm =>
        this.getProductDetails(itm.productId)
      );
    }
  }

  displayOrders(ordrs) {
    return (
      <div className="mt-2 mb-4 row" key={ordrs.txn_id}>
        <div className="col-9 pl-0">
          <Card>
            <CardHeader className="fnt-weight-400 dscrptnSize-9 row m-0">
              <div className="col text-left">
                Transaction ID: {ordrs.txn_id}
              </div>
              <div className="col text-right">$AU {ordrs.cost}</div>
            </CardHeader>
            {this.displayItems(ordrs)}
          </Card>
        </div>
        <div className="col-3 text-left">
          <div className="mt-2 fnt-weight-500 title-size-1em">In Transit</div>
          <div className="fnt-weight-400 dscrptnSize-9">
            Delivering from {ordrs.departing_location}
          </div>
          <div className="mt-2 fnt-weight-500 title-size-1em">
            Expected Delivery Date:
          </div>
          <div className="fnt-weight-400 dscrptnSize-9">
            On {ordrs.shipped_on}
          </div>
          <button className="mt-3 btn orange-b surround-parent w-75 more-rounded">
            Track Package
          </button>
        </div>
      </div>
    );
  }

  show() {
    if (!isEmpty(this.props.orders) && !this.props.user.loading) {
      const { orderDTO } = this.props.orders;
      return orderDTO.map(ordr => this.displayOrders(ordr));
    } else {
      return <Spinner size={'150px'} />;
    }
  }

  render() {
    return (
      <div className="m-3 text-left col">
        <div className="m-2 row">
          <div className="mb-2 row fnt-weight-600 title-size-1-5em">
            Order History
          </div>
        </div>
        {this.show()}
      </div>
    );
  }
}

OrderHistory.propTypes = {
    getUserOrder: PropTypes.func.isRequired,
    getProducts: PropTypes.func.isRequired
};

const mapStateToProps = state => ({
  user: state.user,
  orders: state.user.orders,
  product: state.product
});

export default connect(
  mapStateToProps,
  {
    getUserOrder,
    getProducts
  }
)(OrderHistory);
