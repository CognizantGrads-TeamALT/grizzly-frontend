import React, { Component } from 'react';
import { connect } from 'react-redux';
import CustomerProductDescription from './CustomerProductDescription';
import ProductCategoryRow from '../common/ProductCategoryRow';
import PropTypes from 'prop-types';
import Spinner from '../../common/Spinner';
import isEmpty from '../../../validation/is-empty';
import {
  getProductWithImgs,
  getProductImage,
  getRandomProducts,
  addToCart
} from '../../../actions/productsActions';

class CustomerDetailedProduct extends Component {
  constructor(props) {
    super(props);
    this.state = {
      single: null,
      id: null,
      cart: []
    };

    this.addToCart = this.addToCart.bind(this);
    this.props.getProductWithImgs(this.props.match.params.productId);
  }

  
  addToCart(single){
    this.state.cart.push(single);
    

    if (isEmpty(JSON.parse(localStorage.getItem('cart')))) {
      localStorage.setItem('cart', JSON.stringify(this.state.cart));
    } else {
      let currentCartString = localStorage.getItem('cart');

      let currentCart = JSON.parse(currentCartString);
      currentCart = currentCart.concat(single);

      localStorage.setItem('cart', JSON.stringify(currentCart));
      this.State ={cart: []};
      console.log(currentCart);

    }
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
        this.setState({ single: single[0] });
        name = single[0].name;
      } else {
        this.props.getProductWithImgs(id);
      }
    } else {
      this.props.getProductWithImgs(id);
    }

    let searchTerm = name.split(' ').pop();
    if (!isEmpty(searchTerm)) {
      this.props.getRandomProducts(searchTerm, '0');
    }
  }

  getImages(products) {
    for (let product of products) {
      if (!isEmpty(product.imageDTO) && isEmpty(this.props.product.images[product.productId])) {
        this.props.getProductImage(product.productId, product.imageDTO[0].imgName);
      }
    }
  }

  show() {
    // From state or from props.
    const single = this.state.single || this.props.product.single;
    const { loading, product_vendor } = this.props.product;
    if (isEmpty(single) || isEmpty(product_vendor) || loading) {
      return <Spinner size={'150px'} />;
    } else {
      const { random_products } = this.props.product;
      if (isEmpty(random_products)) {
        this.props.getRandomProducts(single.name.split(' ').pop(), '0');
      } else {
        this.getImages(random_products);
        if (!isEmpty(single.imageDTO) && isEmpty(this.props.product.images[single.productId])) {
          this.props.getProductImage(
            single.productId,
            single.imageDTO[0].imgName
          );
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
              addToCart={this.addToCart}
            />
          </div>
        );
      }
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
  getProductImage: PropTypes.func.isRequired,
  getRandomProducts: PropTypes.func.isRequired
};

const mapStateToProps = state => ({
  product: state.product,
  cart: state.cart
});

export default connect(
  mapStateToProps,
  {
    getProductWithImgs,
    getRandomProducts,
    getProductImage,
    addToCart
  }
)(CustomerDetailedProduct);
