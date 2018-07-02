import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import isEmpty from '../../../validation/is-empty';
import { getProduct } from '../../../actions/productsActions';
import unavailable from '../../../img/unavailable.png';
import Spinner from '../../common/Spinner';
import { PRODUCT_IMAGE } from '../../../actions/microservices';
import ImageLoader from 'react-load-image';

class ProductImage extends Component {
  constructor(props) {
    super(props);
    this.state = {
      activeTab: 0
    };
  }

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
        <div>Error!</div>
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

  render() {
    const product = this.props.prod;
    return (
        <div className="col profile-userpic">
            {this.showImg(product)}
        </div>
    );
  }
}

ProductImage.propTypes = {
  getProduct: PropTypes.func.isRequired
};

const mapStateToProps = state => ({
  product: state.product
});

export default connect(
  mapStateToProps,
  { getProduct
   }
)(ProductImage);
