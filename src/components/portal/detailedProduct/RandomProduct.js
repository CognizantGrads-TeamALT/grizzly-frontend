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
        className="img-responsive"
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

  showProducts() {
    if (!isEmpty(this.props.product.random_products)) {
      return this.props.product.random_products
        .filter(item => item.productId !== this.props.productId)
        .map(prod => (
          <div
            key={prod.productId}
            className="col-md-2 col-sm-4 imageGrid mt-2"
          >
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
