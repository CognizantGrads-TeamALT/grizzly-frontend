import React, { Component } from "react";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import Spinner from "../../common/Spinner";
import isEmpty from "../../../validation/is-empty";
import Slider from "react-slick";
import { Link } from "react-router-dom";

class VendorCarousel extends Component {
  show() {
    const { products, loading } = this.props.product;
    let prodArray = [];
    if (!isEmpty(products) && !loading) {
      for (let i = 0; i < products.length; i++) {
        prodArray.push(products[i]);
      }
      if (!isEmpty(prodArray)) {
        return prodArray.map(prod => (
          <Link
            key={prod.productId}
            to={`/customerdetailedproduct/${prod.productId}`}
            className="img-thumbnail"
          >
            <img
              src="https://static.ebates.com/img/merchant_logo/14781/banner-1168x200_2.jpg"
              alt=""
            />
            <span>{prod.name}</span>
          </Link>
        ));
      } else {
        return <Spinner size={"150px"} />;
      }
    }
  }

  render() {
    var settings = {
      dots: true,
      infinite: true,
      speed: 500,
      slidesToShow: 1,
      slidesToScroll: 1
    };
    return <Slider {...settings}>{this.show()}</Slider>;
  }
}

VendorCarousel.propTypes = {
  product: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
  product: state.product
});

export default connect(mapStateToProps)(VendorCarousel);
