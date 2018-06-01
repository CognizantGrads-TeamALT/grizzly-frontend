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


class Products extends Component {

  render() {
    const { products, loading } = this.props.product;
    let productItem;
    if (products === null || loading) {
      productItem = (
        <tr>
          <td>
            <Spinner />
          </td>
        </tr>
      );
    } else {
      if (products.length > 0) {
        productItem = products.map(prod => (
          <ProductList key={prod.productId} product={prod} />
        ));
      } else {
        productItem = (
          <tr>
            <td>
              <Spinner />
            </td>
          </tr>
        );
      }
    }
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
          <tbody>{productItem}</tbody>
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
