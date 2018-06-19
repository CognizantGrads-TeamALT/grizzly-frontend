import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import isEmpty from '../../../validation/is-empty';
import unavailable from '../../../img/unavailable.png';
import { getProductImageCustomer } from '../../../actions/productsActions';
import { Link } from 'react-router-dom';
import Spinner from '../../common/Spinner';

class ProductGridList extends Component {
  constructor(props) {
    super(props);

    const products = this.props.product.products;

    // Loop through each product and fetch the image for it.
    // This will update the state and change the IMG.
    for (let product of products) {
      if (!isEmpty(product.imageDTO)) {
        this.props.getProductImageCustomer(
          product,
          product.imageDTO[0].imgName
        );
      }
    }
  }

  getImg(product) {
    if (!isEmpty(product.images)) {
      let imgInfo = product.images[0];
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
  }

  showImg(product) {
    // If we don't have any images.
    if (isEmpty(product.images)) {
      // If the product details literally has no images.
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
      for (let i = 0; i < 18; i++) {
        prodArray.push(products[i]);
      }
      return prodArray.map(prod => (
        <div key={prod.productId} className="col-md-2 col-sm-4 imageGrid mt-5">
          <Link
            to={`/customerdetailedproduct/${prod.productId}`}
            className="img-thumbnail"
          >
            {this.showImg(prod)}

            <span>{prod.name}</span>
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
  { getProductImageCustomer }
)(ProductGridList);
