import React, { Component } from "react";
import { connect } from "react-redux";
import ProductSearchSort from "../common/ProductSearchSort";
import PropTypes from "prop-types";
import CategoryFilter from "../common/CategoryFilter";
import Spinner from "../../common/Spinner";
import ProductList from "./ProductList";
import { getProducts } from "../../../actions/productsActions";
import isEmpty from "../../../validation/is-empty";

class Products extends Component {
  constructor(props) {
    super(props);
    this.state = {
      index: 0
    };
  }

  componentDidMount() {
    // Detect when scrolled to bottom.
    this.refs.myscroll.addEventListener("scroll", e => {
      e.preventDefault();
      if (
        this.refs.myscroll.scrollTop + this.refs.myscroll.clientHeight >=
        this.refs.myscroll.scrollHeight
      ) {
        this.loadMore();
      }
    });
  }

  loadMore() {
    if (this.props.product.hasMore) {
      this.setState({
        index: this.state.index + 1
      });
      this.props.getProducts(this.state.index);
    } else {
      this.setState({
        index: 0
      });
    }
  }

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
        <CategoryFilter />
        <button
          className="btn more-rounded hover-w-b btn-sm my-2 my-sm-0 mr-sm-2"
          type="submit"
        >
          Add Product
        </button>
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
        </table>
        <div ref="myscroll" style={{ height: "500px", overflow: "auto" }}>
          <table className="table table-sm table-hover">
            <tbody>{this.show()}</tbody>
          </table>
        </div>
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
