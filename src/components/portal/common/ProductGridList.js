import React, { Component } from "react";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import Spinner from "../../common/Spinner";
import isEmpty from "../../../validation/is-empty";

class ProductGridList extends Component {
  show() {
    const { products, loading } = this.props.product;
    let prodArray = [];
    if (!isEmpty(products) && !loading) {
      for (let i = 0; i < 18; i++) {
        prodArray.push(products[i]);
      }
      return prodArray.map(prod => (
        <div className="col-md-2 col-sm-4 imageGrid">
          <div className="img-thumbnail">
            <img
              style={{ width: "100%" }}
              src="https://cdn.shopify.com/s/files/1/0377/2037/products/Mens36.Front_5a287144-63e8-4254-bef0-450a68ccd268_1024x.progressive.jpg?v=1510684704"
            />
            <span>{prod.name}</span>
          </div>
        </div>
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
    return <div className="row">{this.show()}</div>;
  }
}

ProductGridList.propTypes = {
  product: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
  product: state.product
});

export default connect(mapStateToProps)(ProductGridList);
