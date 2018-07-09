import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import isEmpty from '../../../validation/is-empty';
import { Link } from 'react-router-dom';
import StarRatings from 'react-star-ratings';
import ProductImage from '../common/ProductImage';
import { toast } from 'react-toastify';

class ProductGridList extends Component {
constructor(props){
  super(props);

  this.count = 0;
  this.getCategoryEnabled = this.getCategoryEnabled.bind(this);
}

  show() {
    this.count=0;
    const products = this.props.product.products;
    let prodArray = [];
    if (!isEmpty(products)) {
      for (let i = 0; i < products.length; i++) {
        prodArray.push(products[i]);
      }
      return prodArray.filter(prod => prod.enabled !== false).map(
        function(prod) {
          if (!this.getCategoryEnabled(prod.categoryId))
            return '';
          else
            return (
              <div key={prod.productId} className="col-md-2 col-sm-4 imageGrid mt-3">
                <Link
                  to={`/customerdetailedproduct/${prod.productId}`}
                  className="img-thumbnail surround-parent h-100 w-100 card product-card"
                >
                  <ProductImage prod={prod} />
                  <div className="card-body inner-product-card surround-parent h-100 w-100">
                    <div className="inner-product-card card-text fnt-weight-400 surround-parent w-100">
                      {prod.name}
                    </div>
                    {/* Totally mock data */}
                    <div className="fnt-weight-300 dscrptnSize-8 surround-parent w-100">
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
                    <div className="fnt-weight-600 surround-parent w-100">
                      ${prod.price}
                    </div>
                  </div>
                </Link>
              </div>
            );
        }, this
      );
    }
    else{
      if(this.count === 0)
        this.count =1;
      else{
      toast.info("Please, search properly");
      this.count =0;
    }}
  }

  getCategoryEnabled(categoryId) {
    const category = this.props.product.product_category.filter(
      item => item.categoryId === categoryId
    )[0];

    return !isEmpty(category) ? category.enabled : false;
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
  product: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
  product: state.product
});

export default connect(mapStateToProps)(ProductGridList);
