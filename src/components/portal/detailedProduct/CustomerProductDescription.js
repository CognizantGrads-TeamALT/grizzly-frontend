import React, { Component } from 'react';
import { connect } from 'react-redux';
import isEmpty from '../../../validation/is-empty';
import RandomProduct from './RandomProduct';
//import ImageLoader from 'react-load-image';
//import Spinner from '../../common/Spinner';
import Button from 'react-ions/lib/components/Button';
import ProductCarousel from '../common/ProductCarousel';
import { toast } from 'react-toastify';

class CustomerProductDescription extends Component {
  constructor() {
    super();
    this.state = {
      search: '',
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

  onCancel = event => {
    this.props.history.goBack();
    toast.success('Bye!');
  };

  onClick = event => {
    toast.success('Product has been added to the cart!');
  }

  onChange(e) {
    this.setState({ [e.target.name]: e.target.value });
  }
  
  render() {
    const product = this.props.single;

    return (
      <div>
        <Button
          onClick={this.onCancel}
          className="btn more-rounded hover-w-b my-auto float-left dscrptnSize-9 d-inline p-1 px-2 btn-link"
        >
          Back
        </Button>

        <div className="container containerCustomerProductView">
          <div className="row">
            <div className="col-5 picCustomerDetailedProductCol text-left">
              <div className="row"><ProductCarousel prod={product} /></div>
            </div>

            <div className="col-5 containerCustomerProductDesc text-left">
              <div className="row fnt-weight-600 title-size-2em">
                {product.name}
              </div>
              <div className="row fnt-weight-400 title-size-1em CustomerDetailedProductPrice">
                {product.vendorId === 0 ||
                  isEmpty(product.vendorId) ||
                  isEmpty(this.props.vendor)
                  ? ''
                  : ' by ' + this.props.vendor.name}
              </div>
              <div className="row fnt-weight-600 title-size-1-5em CustomerDetailedProductPrice">
                <p className="mb-0">${product.price}</p>
              </div>
              <div className="row mt-2">
                <button className="btn orange-b surround-parent w-75 more-rounded mb-2">
                  Buy now
                </button>
                <button
                  className="btn yellow-b surround-parent w-75 more-rounded mb-2"
                  onClick={() => {this.props.addToCart(product);
                  this.onClick();}}
                >
                  Add to Cart
                </button>
                <div className="bottom-border-line w-75 pt-4 mb-3" />
              </div>
              <div className="row">
                <div className="title-size-1em fnt-weight-400">Description</div>
              </div>
              <div className="row">
                <div className="dscrptnSize-7 fnt-weight-300 mb-5">
                  {product.desc}
                </div>
              </div>
              <div className="row minimal-line-input-div">
                <input
                  className="text-center d-inline w-50"
                  type="search"
                  name="search"
                  placeholder="Enter Promo code"
                  value={this.state.search}
                  onChange={this.onChange}
                />
                <button className="btn more-rounded d-inline plain-blue-b w-25">
                  Go
                </button>
              </div>
            </div>
          </div>
        </div>
        <br />
        <span className="anchor-right-outside-p-container btn griz-dark-blue-bg white-text right-rounded w-25 pr-3 text-right">
          People also searched for
        </span>
        <RandomProduct productId={product.productId} />
      </div>
    );
  }
}

const mapStateToProps = state => ({
  product: state.product
});

export default connect(
  mapStateToProps,
)(CustomerProductDescription);