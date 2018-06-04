import React, { Component } from "react";
import { connect } from "react-redux";
import ProductSearchSort from "../common/ProductSearchSort";
import PropTypes from "prop-types";
import CategoryFilter from "../common/CategoryFilter";
import AddProduct from "./AddProduct";
import { Link } from "react-router-dom";
import Spinner from "../../common/Spinner";
import ProductList from "./ProductList";
import { getProducts } from "../../../actions/productsActions";
import isEmpty from "../../../validation/is-empty";


class Products extends Component {

  show() {
    const { products, loading } = this.props.product;
    if (isEmpty(products) || loading) {
      return (
        <tr>
          <td>
            <Spinner />
          </td>
        </tr>
      );
    } else {
      return products.map(prod => (
        <ProductList key={prod.productId} product={prod} />
      ));
    }
  }

  render() {
    return (
      <div>
        <ProductSearchSort />
        <Link
          className="btn btn-outline-success my-2 my-sm-0 mr-sm-2"
          to="/addProduct"
        >
          Add Product
        </Link>
        <table className="table table-sm table-hover">
          <thead>
            <tr>
              <th scope="col">ID</th>
              <th scope="col">Products Name</th>
              <th scope="col">Brand</th>
              <th scope="col">Category</th>
              <th scope="col">Rating</th>
              <th scope="col" />
            </tr>
          </thead>
          <tbody>{this.show()}</tbody>
        </table>
      </div>
    );
  }
}

Products.propTypes = {
  getProducts: PropTypes.func.isRequired,
  product: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
  product: state.product
});

export default connect(mapStateToProps, { getProducts })(Products);
