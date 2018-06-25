import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import isEmpty from '../../../validation/is-empty';
import { filterProductsByCategory, getProductImageCustomer } from '../../../actions/productsActions';
import Button from 'react-ions/lib/components/Button';
import Spinner from '../../common/Spinner';
import unavailable from '../../../img/unavailable.png';

class CategoryGridList extends Component {
  getImages(products) {
    for (let product of products) {
      if (!isEmpty(product.imageDTO) && isEmpty(product.images)) {
        this.props.getProductImageCustomer(
          product,
          product.imageDTO[0].imgName,
          true
        );
      }
    }
  }

  componentWillMount() {
    this.props.filterProductsByCategory({
      cur_id: this.props.match.params.catId,
      index: 0
    });
  }

  onCancel = event => {
    event.preventDefault();
    this.props.history.goBack();
  };

  show() {
    if (
      !this.props.product.loadingVendors &&
      !this.props.product.loading &&
      !isEmpty(this.props.product.products_filtered) &&
      !isEmpty(this.props.product.product_vendor)
    ) {
      const filteredProducts = this.props.product.products_filtered;
      this.getImages(filteredProducts);
      return filteredProducts.map(prod => (
        <div className="card text-left mb-2" key={prod.productId}>
          <div className="card-body">
            <div className="row">
              <div className="col-3">
                {this.showImg(prod)}
              </div>
              <div className="col-5">
                <div className="productTitle">
                  <b className="d-inline">{prod.name}</b>
                  <p className="d-inline dscrptnSize-9">
                    {prod.vendorId === 0
                      ? ''
                      : ' by ' +
                        this.props.product.product_vendor.filter(
                          item => item.vendorId === prod.vendorId
                        )[0].name}
                  </p>
                </div>
              </div>
              <div className="col-2">${prod.price}</div>
              <div className="col-2">
                <Link
                  to={`/customerdetailedproduct/${prod.productId}`}
                  className="btn more-rounded hover-t-b btn-sm mx-auto surround-parent parent-wide"
                >
                  View
                </Link>
              </div>
            </div>
          </div>
        </div>
      ));
    }
  }

  getImg(product) {
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

  render() {
    return (
      <div className="col">
        <div className="row mb-3">
          <div className="col-9 my-auto">
            <h1 className="text-left text-uppercase font-weight-bold my-auto mb-4 d-inline">
              {this.props.match.params.searchParam}
            </h1>
          </div>
          <div className="col-3 my-auto">
            <Button
              onClick={this.onCancel}
              className="btn more-rounded hover-w-b btn-sm parent-wide-inner my-auto parent-wide"
            >
              Back
            </Button>
          </div>
        </div>
        {this.show()}
      </div>
    );
  }
}

CategoryGridList.propTypes = {
  filterProductsByCategory: PropTypes.func.isRequired,
  getProductImageCustomer: PropTypes.func.isRequired
};

const mapStateToProps = state => ({
  category: state.category,
  product: state.product,
  vendor: state.vendor
});

export default connect(
  mapStateToProps,
  {
    filterProductsByCategory,
    getProductImageCustomer
  }
)(CategoryGridList);
