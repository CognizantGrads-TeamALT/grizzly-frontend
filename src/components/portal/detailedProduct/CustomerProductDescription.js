import React, { Component } from 'react';
import { connect } from 'react-redux';
import Spinner from '../../common/Spinner';
import isEmpty from '../../../validation/is-empty';
import unavailable from '../../../img/unavailable.png';
import { Carousel } from 'react-responsive-carousel';
import RandomProduct from './RandomProduct';
import Button from 'react-ions/lib/components/Button';

class CustomerProductDescription extends Component {
  constructor() {
    super();
    this.state = {
      search: '',
      clicks: 0
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
  }

  onCancel = event => {
    this.props.history.goBack();
  };

  onClick = event => {
    this.props.cart.push(this.props.product);
  }

  onChange(e) {
    this.setState({ [e.target.name]: e.target.value });
  }

  showCarousel() {
    const product = this.props.single;
    if (!isEmpty(this.props.product.images[product.productId])) {
      return this.props.product.images[product.productId].map((img, index) => (
        // stops complaining about "UNIQUE KEYS" THANKS REACT.
        <div key={index}>
          <img src={img.base64Image} className="img-responsive" alt="" />
        </div>
      ));
    }
  }

  showImg() {
    const product = this.props.single;
    // If we don't have any images.
    if (isEmpty(this.props.product.images[product.productId])) {
      // If the product details  has no images.
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
        return (
          <div className="text-center">
            <Spinner size={'150px'} />
          </div>
        );
      }
      // Return the loaded images.
    } else {
      return (
        <Carousel infiniteLoop={true} autoPlay={true} width="300px">
          {this.showCarousel()}
        </Carousel>
      );
    }
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
              <div className="row">{this.showImg()}</div>
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
                  onClick={() => this.props.addToCart(product)}
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

export default connect(mapStateToProps)(CustomerProductDescription);
