import React, { Component } from "react";
import { connect } from "react-redux";
// import Loading from "../common/Loading";
import Vendor from "./vendor/Vendor";
import Products from "./products/Products";
import Categories from "./categories/Categories";
import Profile from "./profile/Profile";

class AdminPortal extends Component {
  render() {
    return (
      <div className="row">
        <div className="col-md-3 m-auto">
          <Profile />
        </div>
        <div className="col-md-9">
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
                id="vendors-tab"
                data-toggle="tab"
                href="#vendors"
                role="tab"
                aria-controls="vendors"
                aria-selected="false"
              >
                VENDORS
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
                CATEGORY
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
              id="vendors"
              role="tabpanel"
              aria-labelledby="vendors-tab"
            >
              <Vendor />
            </div>
            <div
              className="tab-pane fade"
              id="category"
              role="tabpanel"
              aria-labelledby="category-tab"
            >
              <Categories />
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default connect(null)(AdminPortal);
