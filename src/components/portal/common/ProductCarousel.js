import React, { Component } from 'react';
import isEmpty from '../../../validation/is-empty';
import unavailable from '../../../img/unavailable.png';
import { PRODUCT_IMAGE } from '../../../actions/microservices';
import { Carousel } from 'react-responsive-carousel';

class ProductCarousel extends Component {
  showCarousel(product) {
    if (!isEmpty(product.imageDTO)) {
      return product.imageDTO.map((imgInfo, index) => (
        <div key={index}>
          <img
            src={PRODUCT_IMAGE + imgInfo.imgName}
            className="img-responsive"
            alt=""
          />
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
            width: '300px',
            height: '200px',
            objectFit: 'cover'
          }}
        />
      );
      // Return the loaded image.
    } else {
      return (
        <Carousel infiniteLoop={true} autoPlay={true} className={'row imgCarousel'}>
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

export default ProductCarousel;
