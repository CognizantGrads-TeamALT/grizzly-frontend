import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import Slider from 'react-slick';
import { Link } from 'react-router-dom';

const imageArray = [
  'https://akshaybhasme.com/imgs/watch_banner_big.jpg',
  'https://www.atomos.com/assets/images/home/UNLEASH-banner.jpg',
  'https://mymobile.com.au/media/wysiwyg/note8banner.png',
  'https://www.affordablelaptops.com.au/contents/media/b_gigabyte-gaming-laptop-notebook-banner.jpg',
  'https://www.hamiltonbeach.com/media/cat-headers/category_banner_hbpro.jpg'
];

const catLinks = [
  '/category/Watches/1',
  '/category/Cameras/2',
  '/category/Phones/3',
  '/category/Laptops/4',
  '/category/Blenders/5'
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
