import React, { Component } from 'react';
import { connect } from 'react-redux';
import CustomerProductDescription from './CustomerProductDescription';
import ProductCategoryRow from '../common/ProductCategoryRow';
import PropTypes from 'prop-types';
import Spinner from '../../common/Spinner';
import isEmpty from '../../../validation/is-empty';
import {
  getProductWithImgs,
  getProductImageCustomer,
  getProductsImageRandom,
  getRandomProducts
} from '../../../actions/productsActions';

class CustomerDetailedProduct extends Component {
  constructor(props) {
    super(props);
    this.state = {
      single: null,
      id: this.props.match.params.productId
    };
  }

  componentDidMount() {
    this.loadData(this.props.match.params.productId);
  }

  componentDidUpdate(prevProps, prevState) {
    //initial render without a previous prop change
    if (isEmpty(prevProps)) {
      return false;
    }

    //new route param ?

    if (this.state.id !== this.props.match.params.productId) {
      this.loadData(this.props.match.params.productId);
      this.setState({ id: this.props.match.params.productId });
    }
  }

  loadData(id) {
    let name = '';
    // Only load data again if there is no data present.
    // Saves page load time & useless API calls :)
    if (!isEmpty(this.props.product.products)) {
      // params must be converted to integer.
      const single = this.props.product.products.filter(
        item => item.productId === parseInt(id, 10)
      );
      if (!isEmpty(single)) {
        // Must be = because inside the constructor.
        this.setState({ single: single[0] });
        name = single[0].name;
      } else {
        this.props.getProductWithImgs(id);
      }
    } else {
      this.props.getProductWithImgs(id);
    }
    this.props.getRandomProducts(name.split(' ').pop(), '0');
  }

  // componentWillReceiveProps(newProps) {
  //   this.loadData(newProps.params.productId);
  // }

  getImages(products) {
    for (let product of products) {
      if (!isEmpty(product.imageDTO) && isEmpty(product.images)) {
        this.props.getProductsImageRandom(product, product.imageDTO[0].imgName);
      }
    }
  }

  show() {
    // From state or from props.
    const single = this.state.single || this.props.product.single;
    const { loading, product_vendor, random_products } = this.props.product;
    if (
      isEmpty(single) ||
      isEmpty(product_vendor) ||
      isEmpty(random_products) ||
      loading
    ) {
      return <Spinner size={'150px'} />;
    } else {
      this.getImages(random_products);
      if (!isEmpty(single.imageDTO) && isEmpty(single.images)) {
        this.props.getProductImageCustomer(single, single.imageDTO[0].imgName);
      }
      const vendor = this.props.product.product_vendor.filter(
        item => item.vendorId === single.vendorId
      )[0];
      return (
        <div>
          <CustomerProductDescription
            single={single}
            history={this.props.history}
            vendor={vendor}
          />
        </div>
      );
    }
  }

  render() {
    return (
      <div className="col-md-12">
        <ProductCategoryRow />
        {this.show()}
      </div>
    );
  }
}

CustomerDetailedProduct.propTypes = {
  getProductWithImgs: PropTypes.func.isRequired,
  getProductImageCustomer: PropTypes.func.isRequired
};

const mapStateToProps = state => ({
  product: state.product
});

export default connect(
  mapStateToProps,
  {
    getProductWithImgs,
    getProductImageCustomer,
    getRandomProducts,
    getProductsImageRandom
  }
)(CustomerDetailedProduct);
