import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import isEmpty from '../../../validation/is-empty';
import { Link } from 'react-router-dom';
import StarRatings from 'react-star-ratings';
import ProductImage from '../common/ProductImage';
import { toast } from 'react-toastify';
import addtocart from '../../../img/addtocart.png';
import { setProductUpdated } from '../../../actions/productsActions';

class ProductGridList extends Component {
  constructor(props) {
    super(props);

    this.count = 0;
    this.getCategoryEnabled = this.getCategoryEnabled.bind(this);
  }

  toastId = null;
  onClick(e) {
    if (!toast.isActive(this.toastId)) {
      this.toastId = toast.info('Added to cart!');
    }
  }

  showCartBtn(prod) {
    if (
      (isEmpty(this.props.user.role) &&
        isEmpty(this.props.user.isRegistered)) ||
      this.props.user.role === 'customer'
    ) {
      return (
        <button
          className="btn p-0 my-auto"
          onClick={() => {
            this.props.addToCart(prod);
            this.onClick();
          }}
        >
          <img
            src={addtocart}
            alt="Add to cart"
            style={{ width: '20px', verticalAlign: 'top' }}
          />
        </button>
      );
    }
  }

  show() {
    this.count = 0;
    const products = this.props.product.products;
    let prodArray = [];
    if (!isEmpty(products)) {
      for (let i = 0; i < products.length; i++) {
        prodArray.push(products[i]);
      }
      return prodArray
        .filter(prod => prod.enabled !== false && 
          this.getCategoryEnabled(prod.categoryId) !== false && 
          this.getVendorEnabled(prod.vendorId)  !== false)
        .map(function(prod) {
          return (
            <div
              key={prod.productId}
              className="col-lg-2 col-sm-4 imageGrid mt-3"
            >
              <div className="card-body inner-product-card text-left surround-parent h-100 w-100">
                <Link
                  to={`/customerdetailedproduct/${prod.productId}`}
                  className="img-thumbnail surround-parent pl-0 h-100 w-100 card product-card"
                >
                  <ProductImage prod={prod} />
                  <div className="inner-product-card card-text text-truncate d-inline-block fnt-weight-400 surround-parent w-100">
                    {prod.name}
                  </div>
                </Link>
                <div className="fnt-weight-300 dscrptnSize-8 text-truncate d-inline-block surround-parent w-100">
                  {this.showVendorName(prod.vendorId)}
                </div>

                <div className="fnt-weight-300 dscrptnSize-8">
                  <StarRatings
                    rating={prod.rating}
                    starRatedColor="#f0ca4d"
                    numberOfStars={5}
                    name="rating"
                    starDimension="15px"
                    starSpacing="1px"
                  />
                </div>
                <div className="fnt-weight-600 surround-parent w-100 row">
                  <div className="col text-left d-inline">${prod.price}</div>
                  <div className="col text-right d-inline pr-0">
                    {this.showCartBtn(prod)}
                  </div>
                </div>
              </div>
            </div>
          );
        }, this);
    } else {
      if (this.count === 0) this.count = 1;
      else {
        toast.info('Please enter some keywords');
        this.count = 0;
      }
    }
  }

  getCategoryEnabled(categoryId) {
    const category = this.props.product.product_category.filter(
      item => item.categoryId === categoryId
    )[0];

    return !isEmpty(category) ? category.enabled : false;
  }

  getVendorEnabled(vendorId) {
    const vendor = this.props.product.product_vendor.filter(
      item => item.vendorId === vendorId
    )[0];

    return !isEmpty(vendor) ? vendor.enabled : false;
  }

  showVendorName(vendorId) {
    if (isEmpty(vendorId) || vendorId === 0) {
      return '';
    } else {
      const vendor = this.props.product.product_vendor.filter(
        item => item.vendorId === vendorId
      );
      if (!isEmpty(vendor)) {
        return ' by ' + vendor[0].name;
      }
    }
  }

  render() {
    return <div className="row straight-grid">{this.show()}</div>;
  }
}

ProductGridList.propTypes = {
  setProductUpdated: PropTypes.func.isRequired,

  product: PropTypes.object.isRequired,
  user: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
  product: state.product,
  user: state.user
});

export default connect(
  mapStateToProps,
  { setProductUpdated }
)(ProductGridList);
