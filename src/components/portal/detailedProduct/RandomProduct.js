import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import { withRouter } from 'react-router-dom';
import { getRandomProducts } from '../../../actions/productsActions';
import isEmpty from '../../../validation/is-empty';

import ProductImage from '../common/ProductImage';

class RandomProduct extends Component {
  showVendorName(vendorId) {
    if (isEmpty(vendorId) || vendorId === 0) {
      return '';
    } else {
      const vendor = this.props.product.product_vendor.filter(
        item => item.vendorId === vendorId
      );
      if (!isEmpty(vendor)) {
        return ' by ' + vendor[0].name;
      }
    }
  }

  showProducts() {
    if (!isEmpty(this.props.product.random_products)) {
      return this.props.product.random_products
        .filter(item => item.productId !== this.props.productId)
        .map(prod => (
          <div
            key={prod.productId}
            className="col-md-2 col-sm-4 imageGrid mt-3"
          >
            <Link
              to={`/customerdetailedproduct/${prod.productId}`}
              className="img-thumbnail surround-parent h-100 w-100 card product-card"
              key={prod.productId}
            >
              <ProductImage prod={prod} />
              <div className="card-body inner-product-card surround-parent h-100 w-100">
                <div className="inner-product-card card-text fnt-weight-400 surround-parent w-100">
                  {prod.name}
                </div>
                {/* Totally mock data */}
                <div className="fnt-weight-300 dscrptnSize-8 surround-parent w-100">
                  {this.showVendorName(prod.vendorId)}
                </div>
                <div className="fnt-weight-300 dscrptnSize-8">
                  <i className="d-inline griz-yellow-color fas fa-star" />
                  <i className="d-inline griz-yellow-color fas fa-star" />
                  <i className="d-inline griz-yellow-color fas fa-star" />
                  <i className="d-inline griz-yellow-color fas fa-star" />
                  <i className="d-inline griz-yellow-color fas fa-star-half" />{' '}
                  ({Math.floor(Math.random() * 50 + 1)})
                </div>
                <div className="fnt-weight-600 surround-parent w-100">
                  AU${prod.price}.00
                </div>
              </div>
            </Link>
          </div>
        ));
    }
  }

  render() {
    return <div className="row straight-grid">{this.showProducts()}</div>;
  }
}

const mapStateToProps = state => ({
  product: state.product
});

export default connect(
  mapStateToProps,
  { getRandomProducts }
)(withRouter(RandomProduct));
