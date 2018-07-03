import React, { Component } from 'react';
import isEmpty from '../../../validation/is-empty';

import unavailable from '../../../img/unavailable.png';
import { PRODUCT_IMAGE } from '../../../actions/microservices';
import spinner from "../../common/spinner.svg";

import ProgressiveImage from 'react-progressive-image';

class ProductImage extends Component {
  getImg(product) {
    // we're getting the root image aka 0.
    let imgInfo = product.imageDTO[0];

    return (
      <ProgressiveImage src={PRODUCT_IMAGE + imgInfo.imgName} placeholder={spinner}>
        {(src, loading) => (
          <img
            key={product.productId}
            src={src}
            alt={product.name}
            className="img-responsive"
            style={{
              opacity: loading ? 0.5 : 1,
              objectFit: 'cover',
              height: '150px'
            }}
          />
        )}
      </ProgressiveImage>
    );
  }

  showImg(product) {
    // If the product details has no images.
    if (isEmpty(product.imageDTO)) {
      return (
        <img
          key={product.productId}
          src={unavailable}
          alt={product.name}
          className="img-responsive"
          style={{
            objectFit: 'cover',
            height: '150px'
          }}
        />
      );
    // Return the loaded image.
    } else {
      return this.getImg(product);
    }
  }

  render() {
    const product = this.props.prod;
    return this.showImg(product);
  }
}

export default (ProductImage);
