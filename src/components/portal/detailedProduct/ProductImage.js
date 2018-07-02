import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import isEmpty from '../../../validation/is-empty';
import { getProductWithImgs, getProductImage } from '../../../actions/productsActions';
import unavailable from '../../../img/unavailable.png';
import Spinner from '../../common/Spinner';


class ProductImage extends Component {
  constructor(props) {
    super(props);
    this.state = {
      single: this.props.prod.single,
      images: this.props.prod.images
    }
    this.props.getProductImage(this.props.prod.productId, this.props.prod.imageDTO[0].imgName);
  }

  showImg() {
    const single = this.props.prod.single;
    if (isEmpty(this.props.product.images[single.productId])) {
      // If the product details literally has no images.
      if (isEmpty(single.imageDTO)) {
        return (
          <img src={unavailable} className="img-responsive" style={{"width": "150px", "height": "150px"}} alt="Unavailable"/>
        );
      // We have image but its loading, so wait.
      } else {
        return (<Spinner size={'150px'} />);
      }
    // Return the loaded image.
    } else {
      return this.getImg(single);
    }
  }

  getImg(single) {
    if (!isEmpty(this.props.product.images[single.productId])) {
      let imgInfo = this.props.product.images[single.productId][0];
      return (
        <img
          key={single.productId}
          src={imgInfo.base64Image}
          className="img-responsive"
          alt=""
          style={{ objectFit: 'cover', height: '150px' }}
        />
      );
    }
  }


  render() {
    return (
        <div className="col profile-userpic">
            {this.showImg()}
        </div>
    );
  }
}

ProductImage.propTypes = {
  getProductWithImgs: PropTypes.func.isRequired
};

const mapStateToProps = state => ({
  product: state.product
});

export default connect(
  mapStateToProps,
  { getProductWithImgs,
    getProductImage
   }
)(ProductImage);
