import React, { Component } from 'react';
import { connect } from 'react-redux';
import CustomerProductDescription from './CustomerProductDescription';
import ProductCategoryRow from '../common/ProductCategoryRow';
import PropTypes from 'prop-types';
import Spinner from '../../common/Spinner';
import isEmpty from '../../../validation/is-empty';
import {
  getProduct,
  getRandomProducts
} from '../../../actions/productsActions';
import { addToCart, saveCart } from '../../../actions/cartActions';
import { sortCategoriesByParamCustomer } from '../../../actions/categoryActions';

class CustomerDetailedProduct extends Component {
  constructor(props) {
    super(props);
    this.state = {
      single: null,
      id: null
    };
    this.addToCart = this.addToCart.bind(this);
    this.fetchedRandom = false;
  }

  addToCart(single) {
    this.props.addToCart(single);
  }

  componentWillMount(){
    window.scrollTo(0, 0)
  }

  componentDidMount() {
      this.loadData(this.props.match.params.productId);

    // If there is no product, load it.
    //if (isEmpty(this.props.product.single))
    //  this.props.getProduct(this.props.match.params.productId);

    // If there is no categories, load it for the productcategoryrow.
    if (isEmpty(this.props.category.categories))
      this.props.sortCategoriesByParamCustomer(0, 'count');
  }

  componentDidUpdate(prevProps, prevState) {
    // initial render without a previous prop change
    if (isEmpty(prevProps)) {
      return false;
    }

    // new route param ?
    if (this.state.id !== this.props.match.params.productId) {
      this.loadData(this.props.match.params.productId);
      this.setState({ id: this.props.match.params.productId });

      this.fetchedRandom = false;
    }

    // load "random" products
    const single = this.state.single || this.props.product.single;
    if (
      !isEmpty(single) &&
      !this.fetchedRandom &&
      this.state.id === this.props.match.params.productId
    ) {
      this.props.getRandomProducts(single.categoryId, single.productId);
      this.fetchedRandom = true;
    }
  }

  loadData(id) {
    // Only load data again if there is no data present.
    // Saves page load time & useless API calls :)
    if (!isEmpty(this.props.product.products)) {
      // params must be converted to integer.
      const single = this.props.product.products.filter(
        item => item.productId === parseInt(id, 10)
      );
      if (!isEmpty(single)) {
        this.setState({ single: single[0] });
      } else {
        this.props.getProduct(id);
      }
    } else {
      this.props.getProduct(id);
    }
  }

  show() {
    // From state or from props.
    const single = this.state.single || this.props.product.single;
    const {
      loadingCategories,
      loadingVendors,
      product_vendor,
      loading,
      fresh
    } = this.props.product;
    if (loading || loadingVendors || loadingCategories || fresh) {
      return <Spinner size={'150px'} />;
    } else {
      if (isEmpty(single)) {
        return <p>The item was not found :(</p>;
      }

      const vendor = product_vendor.filter(
        item => item.vendorId === single.vendorId
      )[0];
      return (
        <div>
          <CustomerProductDescription
            single={single}
            history={this.props.history}
            vendor={vendor}
            addToCart={this.addToCart}
          />
        </div>
      );
    }
  }

  render() {
    return (
      <div className="col-md-12 more-top-margin">
        <ProductCategoryRow />
        {this.show()}
      </div>
    );
  }
}

CustomerDetailedProduct.propTypes = {
  getProduct: PropTypes.func.isRequired,
  getRandomProducts: PropTypes.func.isRequired,
  sortCategoriesByParamCustomer: PropTypes.func.isRequired,

  addToCart: PropTypes.func.isRequired,
  saveCart: PropTypes.func.isRequired,

  product: PropTypes.object.isRequired,
  category: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
  product: state.product,
  category: state.category
});

export default connect(
  mapStateToProps,
  {
    getProduct,
    getRandomProducts,
    addToCart,
    saveCart,
    sortCategoriesByParamCustomer
  }
)(CustomerDetailedProduct);
