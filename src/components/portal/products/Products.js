import React, { Component } from "react";
import { connect } from "react-redux";
import ProductSearchSort from "../common/ProductSearchSort";
import PropTypes from "prop-types";
import CategoryFilter from "../common/CategoryFilter";
import Spinner from "../../common/Spinner";
import ProductList from "./ProductList";
import {
  getProducts,
  setProductUpdated
} from "../../../actions/productsActions";
import isEmpty from "../../../validation/is-empty";
import { Link } from "react-router-dom";

class Products extends Component {
  componentDidMount() {
    // Detect when scrolled to bottom.
    this.refs.myscroll.addEventListener("scroll", e => {
      e.preventDefault();
      if (
        this.refs.myscroll.scrollTop + this.refs.myscroll.clientHeight >=
          this.refs.myscroll.scrollHeight &&
        !this.props.product.loading
      ) {
        this.loadMore();
      }
    });
  }

  shouldComponentUpdate() {
    if (this.props.product.updateOnce) {
      this.props.setProductUpdated();
      return true;
    }

    return this.props.product.loading || false;
  }

  loadMore() {
    if (this.props.product.hasMore) {
      this.props.getProducts(this.props.product.index);
    }
  }

  show() {
    const {
      products,
      product_vendor,
      product_category,
      loading
    } = this.props.product;
    if (
      !isEmpty(products) &&
      !isEmpty(product_category) &&
      !isEmpty(product_vendor) &&
      !loading
    ) {
      return products.map(prod => (
        <ProductList
          key={prod.productId}
          product_category={product_category}
          product_vendor={product_vendor}
          product={prod}
        />
      ));
    } else {
      return (
        <tr>
          <td>
            <Spinner />
          </td>
        </tr>
      );
    }
  }

  render() {
    return (
      <div>
        <ProductSearchSort />
        <CategoryFilter />
        <Link
          className="btn more-rounded hover-w-b btn-sm my-2 my-sm-0 mr-sm-2"
          to="/product/new"
        >
          Add Product
        </Link>
        <div ref="myscroll" style={{ height: "500px", overflow: "auto" }}>
          <table className="table table-sm table-hover">
            <thead>
              <tr>
                <th scope="col">ID</th>
                <th scope="col">Products Name</th>
                <th scope="col">Vendor</th>
                <th scope="col">Category</th>
                <th scope="col">Price</th>
                <th scope="col" />
              </tr>
            </thead>
            <tbody>{this.show()}</tbody>
          </table>
        </div>
      </div>
    );
  }
}

Products.propTypes = {
  getProducts: PropTypes.func.isRequired,
  setProductUpdated: PropTypes.func.isRequired,
  product: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
  product: state.product
});

export default connect(
  mapStateToProps,
  { getProducts, setProductUpdated }
)(Products);
