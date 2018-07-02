import React, { Component } from 'react';
import { connect } from 'react-redux';
import Profile from '../profile/Profile';
import ProductDescription from './ProductDescription';
import Spinner from '../../common/Spinner';
import isEmpty from '../../../validation/is-empty';
import {
  getProduct,
  getVendorBatch
} from '../../../actions/productsActions';
import ErrorComponent from '../../common/ErrorComponent';

class DetailedProduct extends Component {
  constructor(props) {
    super(props);
    this.state = {
      activeTab: 0
    };

    this.props.getProduct(this.props.match.params.productId);
  }

  // This fixes the following error:
  // Warning: Can't call setState (or forceUpdate) on an unmounted component.
  // This is a no-op, but it indicates a memory leak in your application.
  // To fix, cancel all subscriptions and asynchronous tasks in the componentWillUnmount method.
  componentWillUnmount() {
    this.props.product.single = null;
  }

  show() {
    const { single, loading, product_vendor } = this.props.product;
    //show an error component if there is nothing to show and an error exists.
    if((isEmpty(single) || isEmpty(product_vendor)) && this.props.errors.errorMessage !== ''){
      return(<ErrorComponent errormsg={this.props.errors.errorMessage}/>)
    }
    else if (isEmpty(single) || isEmpty(product_vendor) || loading) {
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
        <div className="col-2 position-static griz-dark-blue-bg h-95 p-3">
          <Profile />
        </div>
        <div className="col-10">{this.show()}</div>
      </div>
    );
  }
}

const mapStateToProps = state => ({
  product: state.product,
  errors: state.errors
});

export default connect(
  mapStateToProps,
  { getProduct, getVendorBatch }
)(DetailedProduct);
