import React, { Component } from 'react';
import isEmpty from '../../../validation/is-empty';

import unavailable from '../../../img/unavailable.png';
import { PRODUCT_IMAGE } from '../../../actions/microservices';
//import spinner from "../../common/spinner.svg";

import { Carousel } from 'react-responsive-carousel';
//import ProgressiveImage from 'react-progressive-image';

class ProductCarousel extends Component {
  showCarousel(product) {
    if (!isEmpty(product.imageDTO)) {
      return product.imageDTO.map((imgInfo, index) => (
        // stops complaining about "UNIQUE KEYS" THANKS REACT.
        // UNABLE TO IMPLEMENT ProgressiveImage HERE, THE THUMBNAILS NEVER LOAD.
        /*<ProgressiveImage src={PRODUCT_IMAGE + imgInfo.imgName} placeholder={spinner}>
          {(src, loading) => (
            <img
              key={product.productId}
              src={src}
              alt={product.name}
              className="img-responsive"
              style={{
                opacity: loading ? 0.5 : 1,
                width: '150px',
                height: '150px'
              }}
            />
          )}
        </ProgressiveImage>*/
        <div key={index}>
          <img src={PRODUCT_IMAGE + imgInfo.imgName} className="img-responsive" alt="" />
        </div>
      ));
    }
  }

  showImg(product) {
    // If the product details has no images.
    if (isEmpty(product.imageDTO)) {
      return (
        <img
          key={product.productId}
          src={unavailable}
          className="img-responsive"
          alt={product.name}
          style={{
            width: '150px',
            height: '150px'
          }}
        />
      );
    // Return the loaded image.
    } else {
      return (
        <Carousel infiniteLoop={true} autoPlay={true} width="300px">
          {this.showCarousel(product)}
        </Carousel>
      );
    }
  }

  render() {
    const product = this.props.prod;
    return this.showImg(product);
  }
}

export default (ProductCarousel);