import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import isEmpty from '../../../validation/is-empty';
import { filterProductsByCategory } from '../../../actions/productsActions';
import Button from 'react-ions/lib/components/Button';
import Spinner from '../../common/Spinner';

import ProductImage from '../common/ProductImage';

class CategoryGridList extends Component {
  componentDidMount() {
    // Scroll to top.
    window.scrollTo(0, 0);

    // Retain state, don't reload filtered list.
    if (this.props.product.products_filtered_last !== this.props.match.params.catId) {
      this.props.filterProductsByCategory({
        cur_id: this.props.match.params.catId,
        index: 0,
        filtered: true
      });
    }
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

      return filteredProducts.filter(prod => prod.enabled !== false).map(prod => (
        <div className="card text-left mb-2" key={prod.productId}>
          <div className="card-body">
            <div className="row">
              <div className="col-3">
                <ProductImage prod={prod} />
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
    } else {
      return (
        <div className="text-center">
          <Spinner size={'150px'} />
        </div>
      );
    }
  }

  render() {
    return (
      <div className="col-11 only-scroll-down more-top-margin mx-auto">
        <div className="row mb-4 mt-3">
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

  product: PropTypes.object.isRequired,
};

const mapStateToProps = state => ({
  product: state.product,
});

export default connect(
  mapStateToProps,
  {
    filterProductsByCategory
  }
)(CategoryGridList);
