import React, { Component } from "react";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import Spinner from "../../common/Spinner";
import isEmpty from "../../../validation/is-empty";
import Slider from "react-slick";
import { Link } from "react-router-dom";

class ProductCarousel extends Component {
  show() {
    const { products, loading } = this.props.product;
    let prodArray = [];
    if (!isEmpty(products) && !loading) {
      for (let i = 0; i < 18; i++) {
        prodArray.push(products[i]);
      }
      return prodArray.map(prod => (
        <Link
          to={`/detailedproduct/${prod.productId}`}
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
      return <Spinner />;
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

ProductCarousel.propTypes = {
  product: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
  product: state.product
});

export default connect(mapStateToProps)(ProductCarousel);
