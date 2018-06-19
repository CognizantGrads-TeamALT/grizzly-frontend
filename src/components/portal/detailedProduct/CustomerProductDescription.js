import React, { Component } from 'react';

class CustomerProductDescription extends Component {
  render() {
    const product = this.props.single;

    return (
      <div className="container containerCustomerProductView">
        <div className="row">
          <div className="col-3 picCustomerDetailedProductCol mx-auto">
            <img
              style={{ width: '100%' }}
              src="https://cdn.shopify.com/s/files/1/0377/2037/products/Mens36.Front_5a287144-63e8-4254-bef0-450a68ccd268_1024x.progressive.jpg?v=1510684704"
              alt=""
              className="picCustomerDetailedProduct"
            />
          </div>

          <div className="col-2 containerCustomerProductDesc">
            <div className="row">{product.name}</div>
            <div className="row">
              <div className="dscrptnSize-7 mb-5">
                <p>{product.desc}</p>
              </div>
            </div>
            <div className="row CustomerDetailedProductPrice mt-5">
              <p className="mb-0">${product.price}</p>
            </div>
          </div>

          <div className="col mx-auto CustomerDetailedRightCol">
            <div className="row">
              <button className="btn more-rounded btnPincodeCustomer">
                Enter Pincode
              </button>

              <button className="btn more-rounded btnGoCustomer">Go</button>
            </div>
            <div className="row mt-2">
              <button
                type="button"
                className="btn btnOfferVendorsCustomer"
                // data-toggle="dropdown"
                aria-haspopup="true"
                aria-expanded="false"
              >
                Vendors (With Offers)
              </button>
              <div className="dropdown-menu">
                <button className="dropdown-item" type="button" />
              </div>
            </div>

            <div className="row mt-3">
              <button className="btn more-rounded btn-sm btnBuyNowCustomer">
                Buy Now
              </button>
            </div>
            <div className="row mt-1">
              <button className="btn more-rounded btn-sm btnCartCustomer">
                Add to Cart
              </button>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default CustomerProductDescription;
