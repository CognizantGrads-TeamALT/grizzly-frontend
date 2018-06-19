import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import isEmpty from '../../../validation/is-empty';
import { getProductWithImgs } from '../../../actions/productsActions';
import unavailable from '../../../img/unavailable.png';
import { Carousel } from 'react-responsive-carousel';


class ProductCard extends Component {
  constructor(props) {
    super(props);
    this.state = {
      activeTab: 0
    };
    this.props.getProductWithImgs(this.props.prodid);
    // console.log(this.props)
  }

  showImg() {
    return (
        <img src={unavailable} className="profile-userpic" alt="Unavailable" />
    );
    // imageDTO is empty??
    // const { single, loading} = this.state.prods;
    // if (isEmpty(single.imageDTO) || loading) {
    //   return (
    //     <img src={unavailable} className="img-fluid" alt="Unavailable" />
    //   );
    // } else {
    //   return <Carousel>{this.loadImg()}</Carousel>;
    // }
  }

  loadImg() {
    const { single } = this.props.product;
    if (!isEmpty(single.imageDTO)) {
      return single.imageDTO.map((img, index) => (
        <div id={index}>
          <img src={img.base64Image} className="profile-userpic" alt="" />
        </div>
      ));
    }
  }


  render() {
    return (
        <div className="col profile-userpic">
            {this.showImg()}
        </div>
    );
  }
}

ProductCard.propTypes = {
  getProductWithImgs: PropTypes.func.isRequired
};

const mapStateToProps = state => ({
  product: state.product
});

export default connect(
  mapStateToProps,
  { getProductWithImgs }
)(ProductCard);
