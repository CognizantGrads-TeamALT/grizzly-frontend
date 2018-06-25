import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import isEmpty from '../../../validation/is-empty';
import { getProducts } from '../../../actions/productsActions';
import ProductImage from '../detailedProduct/ProductImage';
import Button from 'react-ions/lib/components/Button';

class CategoryGridList extends Component {
  onCancel = event => {
    event.preventDefault();
    this.props.history.goBack();
  };

  show() {
    if (
      !isEmpty(this.props.product.products) &&
      !isEmpty(this.props.product.product_vendor)
    ) {
      const filteredProducts = this.props.product.products.filter(
        item => item.categoryId === parseInt(this.props.match.params.catId, 10)
      );
      if (!isEmpty(filteredProducts)) {
        return filteredProducts.map(prod => (
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
      }
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
  getProducts: PropTypes.func.isRequired
};

const mapStateToProps = state => ({
  category: state.category,
  product: state.product,
  vendor: state.vendor
});

export default connect(
  mapStateToProps,
  {
    getProducts
  }
)(CategoryGridList);
