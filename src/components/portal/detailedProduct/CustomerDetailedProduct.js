import React, { Component } from 'react';
import { connect } from 'react-redux';
import CustomerProductDescription from './CustomerProductDescription';
import PropTypes from 'prop-types';
import Spinner from '../../common/Spinner';
import isEmpty from '../../../validation/is-empty';
import { getProductWithImgs, getProductImageCustomer } from '../../../actions/productsActions';
class CustomerDetailedProduct extends Component {
  constructor(props) {
    super(props);
    this.state = {
      activeTab: 0
    };

    // Only load data again if there is no data present.
    // Saves page load time & useless API calls :)
    if (isEmpty(this.props.product.products)) {
      this.props.getProductWithImgs(this.props.match.params.productId);
    } else {
      this.props.product.single = this.props.product.products[ this.props.match.params.productId-1 ];
    }
  }

  show() {
    const { single, loading, product_vendor } = this.props.product;
    if (isEmpty(single) || isEmpty(product_vendor) || loading) {
      return (<Spinner size={'150px'}/>);
    } else {
      if (!isEmpty(single.imageDTO) && isEmpty(single.images)) {
        this.props.getProductImageCustomer(single, single.imageDTO[0].imgName);
      }
      const vendor = this.props.product.product_vendor.filter(
        item => item.vendorId === single.vendorId
      )[0];
      return (
        <div>
          <CustomerProductDescription
            single={single}
            history={this.props.history}
            vendor={vendor}
          />
        </div>
      );
    }
  }

  render() {
    return <div className="row">{this.show()}</div>;
  }
}

CustomerDetailedProduct.propTypes = {
  getProductWithImgs: PropTypes.func.isRequired,
  getProductImageCustomer: PropTypes.func.isRequired
};

const mapStateToProps = state => ({
  product: state.product
});

export default connect(
  mapStateToProps,
  { getProductWithImgs, getProductImageCustomer }
)(CustomerDetailedProduct);
