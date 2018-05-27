import React, { Component } from "react";
import { connect } from "react-redux";
// import Loading from "../common/Loading";
import Products from "./products/Products";
import Inventory from "./inventory/Inventory";
import Profile from "./profile/Profile";

class VendorPortal extends Component {
  render() {
    return (
      <div className="row">
        <div className="col-md-3 m-auto">
          <Profile />
        </div>
        <div className="col-md-9 m-auto">
          <ul className="nav nav-tabs" id="myTab" role="tablist">
            <li className="nav-item">
              <a
                className="nav-link active btn-outline-success my-2 my-sm-0"
                id="products-tab"
                data-toggle="tab"
                href="#products"
                role="tab"
                aria-controls="products"
                aria-selected="true"
              >
                PRODUCTS
              </a>
            </li>
            <li className="nav-item">
              <a
                className="nav-link btn-outline-success my-2 my-sm-0"
                id="category-tab"
                data-toggle="tab"
                href="#category"
                role="tab"
                aria-controls="category"
                aria-selected="false"
              >
                INVENTORY
              </a>
            </li>
          </ul>
          <div className="tab-content" id="myTabContent">
            <div
              className="tab-pane fade show active"
              id="products"
              role="tabpanel"
              aria-labelledby="products-tab"
            >
              <Products />
            </div>
            <div
              className="tab-pane fade"
              id="category"
              role="tabpanel"
              aria-labelledby="category-tab"
            >
              <Inventory />
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default connect(null)(VendorPortal);
