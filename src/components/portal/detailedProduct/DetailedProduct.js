import React, { Component } from 'react';
import { connect } from 'react-redux';
import Profile from '../profile/Profile';
import ProductDescription from './ProductDescription';
import Spinner from '../../common/Spinner';
import isEmpty from '../../../validation/is-empty';
import {
  getProductWithImgs,
  getVendorBatch
} from '../../../actions/productsActions';

class DetailedProduct extends Component {
  constructor(props) {
    super(props);
    this.state = {
      activeTab: 0
    };

    this.props.getProductWithImgs(this.props.match.params.productId);
  }

  show() {
    const { single, loading, product_vendor } = this.props.product;
    if (isEmpty(single) || isEmpty(product_vendor) || loading) {
      return (<Spinner size={'150px'}/>);
    } else {
      const vendor = this.props.product.product_vendor.filter(
        item => item.vendorId === single.vendorId
      )[0];
      return (
        <div>
          <ProductDescription
            product={this.props.product}
            history={this.props.history}
            vendor={vendor}
          />
        </div>
      );
    }
  }

  render() {
    return (
      <div className="row">
        <div className="col-2">
          <Profile />
        </div>
        <div className="col-10">{this.show()}</div>
      </div>
    );
  }
}

const mapStateToProps = state => ({
  product: state.product
});

export default connect(
  mapStateToProps,
  { getProductWithImgs, getVendorBatch }
)(DetailedProduct);
