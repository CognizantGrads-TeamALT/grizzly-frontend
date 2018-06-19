import React, { Component } from "react";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import Spinner from "../common/Spinner";
import isEmpty from "../../validation/is-empty";

class CustomerTab extends Component {
  show() {
    const { products, loading } = this.props.product;
    if (!isEmpty(products) && !loading) {
      return products.map(prod => (
        <div className="row">
          <div className="col-md-3 col-sm-6">
            <div className="img-thumbnail" style={{ width: "65%" }}>
              <img
                style={{ width: "100%" }}
                src="https://cdn.shopify.com/s/files/1/0377/2037/products/Mens36.Front_5a287144-63e8-4254-bef0-450a68ccd268_1024x.progressive.jpg?v=1510684704"
              />
              <span>{prod.name}</span>
            </div>
          </div>
        </div>
      ));
    } else {
      return (
        <tr>
          <td>
            <Spinner size={'150px'}/>
          </td>
        </tr>
      );
    }
  }

  render() {
    return <div>{this.show()}</div>;
  }
}

CustomerTab.propTypes = {
  product: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
  product: state.product
});

export default connect(mapStateToProps)(CustomerTab);
