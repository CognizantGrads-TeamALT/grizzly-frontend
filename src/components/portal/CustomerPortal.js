import React, { Component } from "react";
import { connect } from "react-redux";
import ProductGridList from "./common/ProductGridList";
import PropTypes from "prop-types";
import {
  getProducts,
  setProductUpdated,
  getProductImageCustomer
} from "../../actions/productsActions";
import ProductCarousel from "./common/ProductCarousel";
import isEmpty from "../../validation/is-empty";
import Spinner from "../common/Spinner";

class CustomerPortal extends Component {
  constructor(props) {
    super(props);

    if (isEmpty(this.props.product.products)) {
      this.props.getProducts();
    }
  }

  componentDidUpdate() {
    if (this.props.product.updateOnce) this.props.setProductUpdated();
  }

  shouldComponentUpdate() {
    if (this.props.product.updateOnce || this.props.product.loading)
      return true;

    return false;
  }

  getImages(products) {
    for (let product of products) {
      if (!isEmpty(product.imageDTO) && isEmpty(product.images)) {
        this.props.getProductImageCustomer(
          product,
          product.imageDTO[0].imgName
        );
      }
    }
  }

  render() {
    const { products, loading } = this.props.product;
    if (!isEmpty(products) && !loading) {
      // Loop through each product and fetch the image for it.
      // This will update the state and change the IMG.
      this.getImages(products);
      return (
        <div className="col-md-12">
          <ProductCarousel />
          <ProductGridList />
        </div>
      );
    } else {
      return (
        <div className="col-md-12">
          <Spinner size={"150px"} />
        </div>
      );
    }
  }
}

CustomerPortal.propTypes = {
  getProducts: PropTypes.func.isRequired,
  product: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
  product: state.product
});

export default connect(
  mapStateToProps,
  { getProducts, setProductUpdated, getProductImageCustomer }
)(CustomerPortal);
