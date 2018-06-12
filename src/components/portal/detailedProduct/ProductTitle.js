import React, { Component } from 'react';
import isEmpty from '../../../validation/is-empty';
import unavailable from '../../../img/unavailable.png';

class ProductTitle extends Component {
  showImg() {
    const product = this.props.single[0];
    if (isEmpty(product.imageDTO)) {
      return (
        <img src={unavailable} className="img-responsive" alt="Unavailable" />
      );
    } else {
      return (
        <img
          src={product.imageDTO[0].base64Image}
          className="img-responsive"
          alt={product.name}
        />
      );
    }
  }
  render() {
    const product = this.props.single[0];
    return (
      <div className="container parent-high">
        <div className="row align-items-start">
          <div className="col pl-0">
            <div className="productTitle">
              <b className="d-inline">{product.name}</b>
              <p className="d-inline dscrptnSize-9"> by {product.vendorId}</p>
            </div>
            <div className="productRating">
              <i className="d-inline fas fa-star fa-xs mr-1" />
              <p className="d-inline dscrptnSize-8">4.7</p>
            </div>
          </div>
        </div>
        <div className="row align-items-end mt-3 parent-high" />
      </div>
    );
  }
}

export default ProductTitle;
