import React, { Component } from 'react';
import Spinner from '../../common/Spinner';
import isEmpty from '../../../validation/is-empty';
import unavailable from '../../../img/unavailable.png';
import { Carousel } from 'react-responsive-carousel';
import RandomProduct from './RandomProduct';
class CustomerProductDescription extends Component {
  constructor() {
    super();
    this.state = {
      search: ''
    };
    this.onChange = this.onChange.bind(this);
  }

  onCancel = event => {
    this.props.history.goBack();
  };

  onChange(e) {
    this.setState({ [e.target.name]: e.target.value });
  }

  showCarousel() {
    const product = this.props.single;
    if (!isEmpty(product.images)) {
      return product.images.map((img, index) => (
        // stops complaining about "UNIQUE KEYS" THANKS REACT.
        //<div id={index}>
        <img
          key={index}
          src={img.base64Image}
          className="img-responsive"
          alt=""
        />
        //</div>
      ));
    }
  }

  showImg() {
    const product = this.props.single;
    // If we don't have any images.
    if (isEmpty(product.images)) {
      // If the product details literally has no images.
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
      // Return the loaded images.
    } else {
      return <Carousel>{this.showCarousel()}</Carousel>;
    }
  }

  render() {
    const product = this.props.single;

    return (
      <div>
        <button
            type="button"
            className="btn btn-link d-inline p-1 my-auto profile-blue-color profile-small-link float-left dscrptnSize-9"
            onClick={this.onCancel}
          >
            Back
          </button>

        <div className="container containerCustomerProductView">
          <div className="row">
            <div className="col-5 picCustomerDetailedProductCol text-left">
              <div className="row">
                {this.showImg()}
              </div>
            </div>
            
            <div className="col-5 containerCustomerProductDesc text-left">
              <div className="row fnt-weight-600 title-size-2em">{product.name}</div>
              <div className="row fnt-weight-400 title-size-1em CustomerDetailedProductPrice">
                {product.vendorId === 0
                  ? ''
                  : ' by ' +
                    this.props.vendor.name}
              </div>
              <div className="row fnt-weight-600 title-size-1-5em CustomerDetailedProductPrice">
                <p className="mb-0">${product.price}</p>
              </div>
              <div className="row mt-2">
                <button className="orange-b surround-parent w-75 more-rounded mb-2">Buy now</button>
                <button className="yellow-b surround-parent w-75 more-rounded mb-2">Add to Cart</button>
                <div className="bottom-border-line w-75 pt-4 mb-3"></div>
              </div>
              <div className="row">
                <div className="title-size-1em fnt-weight-400">
                  Description
                </div>
              </div>
              <div className="row">
                <div className="dscrptnSize-7 fnt-weight-300 mb-5">
                  {product.desc}
                </div>
              </div>
              <div className="row minimal-line-input-div">
                <input className="text-center d-inline w-50" 
                  type="search" 
                  name="search"
                  placeholder="Enter Promo code" 
                  value={this.state.search}
                  onChange={this.onChange}
                />
                <button className="btn more-rounded d-inline plain-blue-b w-25">Go</button>
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

export default CustomerProductDescription;
