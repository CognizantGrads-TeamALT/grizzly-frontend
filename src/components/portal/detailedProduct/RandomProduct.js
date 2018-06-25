import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import { withRouter } from 'react-router-dom';
import { getRandomProducts } from '../../../actions/productsActions';
import isEmpty from '../../../validation/is-empty';
import unavailable from '../../../img/unavailable.png';
import Spinner from '../../common/Spinner';
class RandomProduct extends Component {
  getImg(product) {
    return (
      <img
        key={product.productId}
        src={product.images[0].base64Image}
        className="card-img-top"
        alt=""
        style={{ width: '150px', height: '150px' }}
      />
    );
  }

  showImg(product) {
    // If we don't have any images.
    if (isEmpty(product.images)) {
      // If the product details has no images.
      if (isEmpty(product.imageDTO)) {
        return (
          <img
            src={unavailable}
            className="card-img-top"
            style={{ width: '150px', height: '150px' }}
            alt="Unavailable"
          />
        );
        // We have image but its loading, so wait.
      } else {
        return <Spinner size={'150px'} />;
      }
      // Return the loaded image.
    } else {
      return this.getImg(product);
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
              {this.showImg(prod)}
              <div className="card-body inner-product-card surround-parent h-100 w-100">
                <div className="inner-product-card card-text fnt-weight-400 surround-parent w-100">{prod.name}</div>
                {/* Totally mock data */}
                <div className="fnt-weight-300 dscrptnSize-8 surround-parent w-100">{prod.vendorId}</div>
                <div className="fnt-weight-300 dscrptnSize-8"><i className="d-inline griz-yellow-color fas fa-star"></i><i className="d-inline griz-yellow-color fas fa-star"></i><i className="d-inline griz-yellow-color fas fa-star"></i><i className="d-inline griz-yellow-color fas fa-star"></i><i className="d-inline griz-yellow-color fas fa-star-half"></i> ({Math.floor((Math.random() * 50) + 1)})</div>
                <div className="fnt-weight-600 surround-parent w-100">AU${prod.price}.00</div>
              </div>
            </Link>
          </div>
        ));
    }
  }

  render() {
    return <div className="row">{this.showProducts()}</div>;
  }
}
const mapStateToProps = state => ({
  product: state.product
});
export default connect(
  mapStateToProps,
  { getRandomProducts }
)(withRouter(RandomProduct));
