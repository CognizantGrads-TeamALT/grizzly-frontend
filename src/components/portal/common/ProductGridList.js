import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import isEmpty from '../../../validation/is-empty';
import unavailable from '../../../img/unavailable.png';
import { Link } from 'react-router-dom';
import Spinner from '../../common/Spinner';

class ProductGridList extends Component {
  getImg(product) {
    //let imgInfo = product.images[0];
    let imgInfo = this.props.product.images[product.productId][0];
    console.log(imgInfo);
    return (
      <img
        key={product.productId}
        src={imgInfo.base64Image}
        className="img-responsive"
        alt=""
        style={{ width: '150px', height: '150px' }}
      />
    );
  }

  showImg(product) {
    // If we don't have any images.
    if (isEmpty(this.props.product.images[product.productId])) {
      // If the product details has no images.
      if (isEmpty(product.imageDTO)) {
        return (
          <img
            src={unavailable}
            className="img-responsive"
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
                <div className="inner-product-card card-text fnt-weight-400 surround-parent w-100">{prod.name}</div>
                {/* Totally mock data */}
                <div className="fnt-weight-300 dscrptnSize-8 surround-parent w-100">
                  {prod.vendorId === 0
                        ? ''
                        : ' by ' +
                          this.props.product.product_vendor.filter(
                            item => item.vendorId === prod.vendorId
                          )[0].name}
                </div>
                <div className="fnt-weight-300 dscrptnSize-8"><i className="d-inline griz-yellow-color fas fa-star"></i><i className="d-inline griz-yellow-color fas fa-star"></i><i className="d-inline griz-yellow-color fas fa-star"></i><i className="d-inline griz-yellow-color fas fa-star"></i><i className="d-inline griz-yellow-color fas fa-star-half"></i> ({Math.floor((Math.random() * 50) + 1)})</div>
                <div className="fnt-weight-600 surround-parent w-100">AU${prod.price}.00</div>
              </div>
            </Link>

        </div>
      ));
    }
  }

  render() {
    return <div className="row">{this.show()}</div>;
  }
}

ProductGridList.propTypes = {
  product: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
  product: state.product
});

export default connect(
  mapStateToProps,
  {}
)(ProductGridList);
