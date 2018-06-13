import React, { Component } from "react";
import { connect } from "react-redux";
import ProductGridList from "./common/ProductGridList";
import PropTypes from "prop-types";
import { getProducts } from "../../actions/productsActions";
import ProductCarousel from "./common/ProductCarousel";
// import Slider from "react-slick";

class CustomerPortal extends Component {
  constructor(props) {
    super(props);
    this.props.getProducts("0");
  }

  render() {
    // var settings = {
    //   dots: true,
    //   infinite: true,
    //   speed: 500,
    //   slidesToShow: 1,
    //   slidesToScroll: 1
    // };
    return (
      // <div>
      //   <div>
      //     <Slider {...settings}>
      //       <div>
      //         <h3>1</h3>
      //       </div>
      //       <div>
      //         <h3>2</h3>
      //       </div>
      //       <div>
      //         <h3>3</h3>
      //       </div>
      //       <div>
      //         <h3>4</h3>
      //       </div>
      //       <div>
      //         <h3>5</h3>
      //       </div>
      //       <div>
      //         <h3>6</h3>
      //       </div>
      //     </Slider>
      //   </div>
      <div>
        <ProductCarousel />
        <ProductGridList />
      </div>
      // </div>
    );
  }
}
CustomerPortal.propTypes = {
  getProducts: PropTypes.func.isRequired
};

export default connect(
  null,
  { getProducts }
)(CustomerPortal);
