import React, { Component } from "react";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import Spinner from "../../common/Spinner";
import isEmpty from "../../../validation/is-empty";
import Slider from "react-slick";
import { Link } from "react-router-dom";

class VendorCarousel extends Component {
  fetchBanners() {
    let imageArray = [];
    imageArray.push("http://akshaybhasme.com/imgs/watch_banner_big.jpg");
    imageArray.push(
      "https://www.atomos.com/assets/images/home/UNLEASH-banner.jpg"
    );
    imageArray.push("https://mymobile.com.au/media/wysiwyg/note8banner.png");
    imageArray.push(
      "https://www.affordablelaptops.com.au/contents/media/b_gigabyte-gaming-laptop-notebook-banner.jpg"
    );
    imageArray.push(
      "http://froothieinternationalstore.com/skin/frontend/tricore/default/images/Blender%20category%20banner.jpg"
    );
    return imageArray;
  }
  show() {
    const { products, loading } = this.props.product;
    let prodArray = [];
    let bannerArray = this.fetchBanners();
    // let currentImage = 0;
    if (!isEmpty(products) && !loading) {
      for (let i = 2; i < 28; i += 6) {
        prodArray.push(products[i]);
      }
      if (!isEmpty(prodArray)) {
        return prodArray.map((prod, index) => (
          <Link
            key={prod.productId}
            to={`/customerdetailedproduct/${prod.productId}`}
          >
            <img
              src={bannerArray[index]}
              className="rounded parent-wide custCarousel"
              style={{
                height: "385px",
                width: "auto",
                display: "block",
                objectFit: "cover"
              }}
              alt=""
            />
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
      speed: 5000,
      slidesToShow: 1,
      slidesToScroll: 1,
      autoplay: true
    };
    return (
      <Slider className="mb-5" {...settings}>
        {this.show()}
      </Slider>
    );
  }
}

VendorCarousel.propTypes = {
  product: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
  product: state.product
});

export default connect(mapStateToProps)(VendorCarousel);
