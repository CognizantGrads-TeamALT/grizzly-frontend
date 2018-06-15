import React, { Component } from "react";
import { Link } from "react-router-dom";

class CustomerProductDescription extends Component {
  render() {
    const product = this.props.single;

    return (
      <div className="container surround-parent parent-high">
        <div className="row align-items-start">
          <div className="col-4">
            <img
              style={{ width: "100%" }}
              src="https://cdn.shopify.com/s/files/1/0377/2037/products/Mens36.Front_5a287144-63e8-4254-bef0-450a68ccd268_1024x.progressive.jpg?v=1510684704"
              alt=""
            />
          </div>

          <div className="col-4">
            <div className="mb-3 mt-5">Product Description</div>
          </div>
        </div>
        <div className="row">
          <div className="col-4">
            <div className="dscrptnSize-7">
              <p>{product.desc}</p>
            </div>
          </div>
        </div>
        <div className="row">
          <div className="col">
            <p className="mb-0 bottom-zero bottom-heavy">${product.price}</p>
          </div>
          <div className="col-2" />
          <div className="col surround-parent parent-wide">
            <div className="row">
              <div className="col-3">
                <Link
                  className="btn more-rounded hover-t-b btn-sm mx-auto surround-parent parent-wide mt-2"
                  to="/adminportal"
                  // Please change when you do Edit Product
                >
                  Finish
                </Link>
                <Link
                  className="btn more-rounded hover-w-b btn-sm mx-auto surround-parent parent-wide mt-2"
                  to="/adminportal"
                >
                  Cancel
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default CustomerProductDescription;
