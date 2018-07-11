import React, { Component } from 'react';
import { connect } from 'react-redux';
import ProductGridList from './common/ProductGridList';
import PropTypes from 'prop-types';
import { getProducts, setProductUpdated } from '../../actions/productsActions';
import { loadCart, saveCart, addToCart } from '../../actions/cartActions';
import { sortCategoriesByParamCustomer } from '../../actions/categoryActions';
import VendorCarousel from './common/VendorCarousel';
import ProductCategoryRow from './common/ProductCategoryRow';
import isEmpty from '../../validation/is-empty';
import Spinner from '../common/Spinner';

class CustomerPortal extends Component {
  constructor(props) {
    super(props);

    this.props.loadCart();
    this.addToCart = this.addToCart.bind(this);
  }

  componentDidMount() {
    // Scroll to top.
    window.scrollTo(0, 0);

    if (
      isEmpty(this.props.product.products) ||
      this.props.product.products.length < 15 // Quantity reduced after search, need to load more/again. TODO: Fix this.
    ) {
      this.props.getProducts();
    }
  }

  componentDidUpdate() {
    if (this.props.product.updateOnce) this.props.setProductUpdated();
  }

  shouldComponentUpdate() {
    if (this.props.product.updateOnce || this.props.product.loading)
      return true;

    return false;
  }

  getCategories(categories, page, column) {
    if (isEmpty(categories)) {
      this.props.sortCategoriesByParamCustomer(page, column);
    }
  }

  addToCart(single) {
    this.props.addToCart(single);
  }

  render() {
    const { products, loading } = this.props.product;
    const { categories, loading2 } = this.props.category;
    if (!isEmpty(products) && !loading && !loading2) {
      // Grab categories for categoryrow
      this.getCategories(categories, '0', 'count');

      return (
        <div className="col-md-12 more-top-margin">
          {!isEmpty(this.props.product.products) && <ProductCategoryRow />}
          <div className="d-none d-md-block">
            <VendorCarousel />
            <div className="pt-3 mb-5 mock-description">
              <div className="row">
                <div className="col d-inline surround-parent w-50">
                  <div className="text-center">
                    <i className="fab fa-ethereum mr-1 griz-t-color" />{' '}
                    <div className="fnt-weight-400">Run on Ethereum.</div>
                    <div className="fnt-weight-300">
                      Number #1 E-commerce website run on the blockchain.{' '}
                    </div>
                  </div>
                </div>
                <div className="col d-inline surround-parent w-50">
                  <div className="text-center">
                    <i className="fab fa-paypal mr-1 griz-t-color" />{' '}
                    <div className="fnt-weight-400">We use PayPal!</div>
                    <div className="fnt-weight-300">
                      Your security is our priority.{' '}
                    </div>
                  </div>
                </div>
                <div className="col d-inline surround-parent w-50">
                  <div className="text-center">
                    <i className="fab fa-bitcoin mr-1 griz-t-color" />{' '}
                    <div className="fnt-weight-400">Ahead of the game.</div>
                    <div className="fnt-weight-300">We also accept Bitcoin. </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className="fnt-weight-400 text-center title-size-1-5em mb-2">
            Browse our latest products
          </div>
          <ProductGridList addToCart={this.addToCart} />
        </div>
      );
    } else {
      return (
        <div className="text-center">
          <Spinner size={'150px'} />
        </div>
      );
    }
  }
}

CustomerPortal.propTypes = {
  getProducts: PropTypes.func.isRequired,
  setProductUpdated: PropTypes.func.isRequired,
  sortCategoriesByParamCustomer: PropTypes.func.isRequired,

  product: PropTypes.object.isRequired,
  category: PropTypes.object.isRequired,
  user: PropTypes.object.isRequired,

  loadCart: PropTypes.func.isRequired,
  addToCart: PropTypes.func.isRequired,
  saveCart: PropTypes.func.isRequired
};

const mapStateToProps = state => ({
  product: state.product,
  category: state.category,
  user: state.user
});

export default connect(
  mapStateToProps,
  {
    getProducts,
    setProductUpdated,
    sortCategoriesByParamCustomer,
    loadCart,
    saveCart,
    addToCart
  }
)(CustomerPortal);
