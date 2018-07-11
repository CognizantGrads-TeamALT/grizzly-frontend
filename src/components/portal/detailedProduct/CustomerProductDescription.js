import React, { Component } from 'react';
import { connect } from 'react-redux';
import isEmpty from '../../../validation/is-empty';
import RandomProduct from './RandomProduct';
import StarRatings from 'react-star-ratings';
import ProductCarousel from '../common/ProductCarousel';
import { toast } from 'react-toastify';

class CustomerProductDescription extends Component {
  constructor() {
    super();
    this.state = {
      search: ''
    };
    this.onChange = this.onChange.bind(this);
  }

  componentDidMount() {
    // Scroll to top.
    window.scrollTo(0, 0);
  }

  // Fixes no-op error.
  componentWillUnmount() {
    this.props.product.single = null;
    this.props.product.random_products = null; // needed.
  }

  buyNow(product) {
    this.props.addToCart(product);
    this.props.history.push('/shoppingcart');
  }

  onCancel = event => {
    this.props.history.goBack();
  };

  toastId = null;
  onClick(e) {
    if (!toast.isActive(this.toastId)) {
      this.toastId = toast.info('Added to cart!');
    }
  }

  onChange(e) {
    this.setState({ [e.target.name]: e.target.value });
  }

  showButtons(product) {
    if (this.props.user.role === 'customer' || isEmpty(this.props.user.role)) {
      return (
        <div>
          <div className="row mt-2">
            <button
              className="btn orange-b surround-parent w-100 more-rounded mb-2"
              onClick={() => {
                this.buyNow(product);
              }}
            >
              Buy now
            </button>
            <button
              className="btn yellow-b surround-parent w-100 more-rounded mb-2"
              onClick={() => {
                this.props.addToCart(product);
                this.onClick();
              }}
            >
              Add to Cart
            </button>
          </div>
          <div className="row minimal-line-input-div">
            {/* disable until implement */}
            <input
              className="text-center d-inline w-75"
              type="search"
              name="search"
              disabled="true"
              placeholder="Enter Promo code"
              value={this.state.search}
              onChange={this.onChange}
            />
            <button
              disabled
              className="btn more-rounded d-inline plain-blue-b w-25"
            >
              Go
            </button>
          </div>
        </div>
      );
    }
  }

  render() {
    const product = this.props.single;

    return (
      <div className="mt-3">
        <div className="container containerCustomerProductView">
          <div className="row">
            <div className="col-lg-6 col-md-8 col-sm-12 col-xs-12 picCustomerDetailedProductCol text-left imgCarousel">
              <ProductCarousel prod={product} />
            </div>

            <div className="col-lg-6 col-md-8 col-sm-12 col-xs-12 containerCustomerProductDesc text-left imgCarousel">
              <div className="row fnt-weight-600 title-size-2em">
                {product.name}
              </div>
              <div className="row fnt-weight-300 title-size-1em CustomerDetailedProductPrice">
                {product.vendorId === 0 ||
                isEmpty(product.vendorId) ||
                isEmpty(this.props.vendor)
                  ? ''
                  : ' by ' + this.props.vendor.name}
              </div>
              <div className="row fnt-weight-300 title-size-1em CustomerDetailedProductPrice">
                <StarRatings
                  rating={product.rating}
                  starRatedColor="#f0ca4d"
                  numberOfStars={5}
                  name="rating"
                  starDimension="15px"
                  starSpacing="1px"
                />
              </div>
              <div className="row fnt-weight-600 title-size-1-5em CustomerDetailedProductPrice">
                <p className="mb-0">${product.price}</p>
              </div>
              <div className="row">
                <div className="title-size-1em fnt-weight-300" />
              </div>
              <div className="row">
                <div className="dscrptnSize-8 fnt-weight-300 mb-5">
                  {product.desc}
                </div>
              </div>
              {this.showButtons(product)}
            </div>
          </div>
        </div>
        <div className="anchor-right-outside-p-container btn griz-dark-blue-bg white-text right-rounded pr-3 text-right mt-5 mb-4">
          People also searched for
        </div>
          <RandomProduct productId={product.productId} />
      </div>
    );
  }
}

const mapStateToProps = state => ({
  product: state.product,
  user: state.user
});

export default connect(mapStateToProps)(CustomerProductDescription);
