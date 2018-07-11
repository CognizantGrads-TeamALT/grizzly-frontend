import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import Slider from 'react-slick';
import { Link } from 'react-router-dom';

const imageArray = [
  'https://raw.githubusercontent.com/CognizantGrads-TeamALT/grizzly-frontend/development/src/img/grizzbanner1.jpg',
  'https://raw.githubusercontent.com/CognizantGrads-TeamALT/grizzly-frontend/development/src/img/grizzbanner2.jpg',
  'https://raw.githubusercontent.com/CognizantGrads-TeamALT/grizzly-frontend/development/src/img/grizzbanner6.jpg',
  'https://raw.githubusercontent.com/CognizantGrads-TeamALT/grizzly-frontend/development/src/img/grizzbanner5.jpg',
  'https://raw.githubusercontent.com/CognizantGrads-TeamALT/grizzly-frontend/development/src/img/grizzbanner4.jpg'
];

const catLinks = [
  '/category/Cameras/2',
  '/category/Maps/8',
  '/category/Blenders/5',
  '/category/Laptops/4',
  '/category/Phones/3'
];
class VendorCarousel extends Component {
  show() {
    return imageArray.map((img, index) => (
      <Link key={index} to={catLinks[index]}>
        <div>
          <img
            src={img}
            className="rounded parent-wide custCarousel"
            style={{
              height: '400px',
              width: 'auto',
              display: 'block',
              objectFit: 'cover'
            }}
            alt=""
          />
        </div>
      </Link>
    ));
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
