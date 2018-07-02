import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import isEmpty from '../../../validation/is-empty';
import unavailable from '../../../img/unavailable.png';
import { Link } from 'react-router-dom';
import { PRODUCT_IMAGE } from '../../../actions/microservices';
import ImageLoader from 'react-load-image';
import Spinner from '../../common/Spinner';

class ProductGridList extends Component {
  getImg(product) {
    let imgInfo = product.imageDTO[0];

    return (
      <ImageLoader src={PRODUCT_IMAGE + imgInfo.imgName}>
        <img
          key={product.productId}
          className="img-responsive"
          alt={product.name}
          style={{ width: '150px', height: '150px' }}
        />
        <img
          key={product.productId}
          src={unavailable}
          className="img-responsive"
          style={{ width: '150px', height: '150px' }}
          alt={product.name}
        />
        <Spinner size={'150px'}/>
      </ImageLoader>
    );
  }

  showImg(product) {
    // If the product details has no images.
    if (isEmpty(product.imageDTO)) {
      return (
        <img
          src={unavailable}
          className="img-responsive"
          style={{ width: '150px', height: '150px' }}
          alt={product.name}
        />
      );
    // Return the loaded image.
    } else {
      return this.getImg(product);
    }
  }

  show() {
    const products = this.props.product.products;
    let prodArray = [];
    if (!isEmpty(products)) {
      for (let i = 0; i < products.length; i++) {
        prodArray.push(products[i]);
      }
      return prodArray.map(prod => (
        <div key={prod.productId} className="col-md-2 col-sm-4 imageGrid mt-3">
          <Link
            to={`/customerdetailedproduct/${prod.productId}`}
            className="img-thumbnail surround-parent h-100 w-100 card product-card"
          >
            {this.showImg(prod)}
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
                <i className="d-inline griz-yellow-color fas fa-star-half" /> ({Math.floor(
                  Math.random() * 50 + 1
                )})
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

  render() {
    return <div className="row straight-grid">{this.show()}</div>;
  }
}

ProductGridList.propTypes = {
  product: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
  product: state.product
});

export default connect(mapStateToProps)(ProductGridList);
