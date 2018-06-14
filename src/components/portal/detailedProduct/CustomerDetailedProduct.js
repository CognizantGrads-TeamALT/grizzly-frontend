import React, { Component } from "react";
import { Row, Col, Nav, NavItem } from "reactstrap";
import { connect } from "react-redux";
import { Link } from "react-router-dom";
import classnames from "classnames";
import Profile from "../profile/Profile";
import ProductDescription from "./ProductDescription";
import ProductTitle from "./ProductTitle";
import PropTypes from "prop-types";
import Spinner from "../../common/Spinner";
import isEmpty from "../../../validation/is-empty";
import { getProductWithImgs } from "../../../actions/productsActions";
class CustomerDetailedProduct extends Component {
  constructor(props) {
    super(props);
    this.state = {
      activeTab: 0
    };
    this.props.getProductWithImgs(this.props.match.params.productId);
  }

  show() {
    const { single, loading } = this.props.product;
    if (isEmpty(single) || loading) {
      return <Spinner />;
    } else {
      return (
        <div className="row mt-4 parent-min-half-high">
          <div className="col-5">
            <ProductTitle single={single} />
          </div>
          <div className="col-7 parent-min-half-high">
            <ProductDescription single={single} />
          </div>
        </div>
      );
    }
  }

  render() {
    return <div className="row">{this.show()}</div>;
  }
}

CustomerDetailedProduct.propTypes = {
  getProductWithImgs: PropTypes.func.isRequired
};

const mapStateToProps = state => ({
  product: state.product
});

export default connect(
  mapStateToProps,
  { getProductWithImgs }
)(CustomerDetailedProduct);
