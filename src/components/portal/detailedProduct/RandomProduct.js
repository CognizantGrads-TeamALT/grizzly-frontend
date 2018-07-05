import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import { withRouter } from 'react-router-dom';
import { getRandomProducts } from '../../../actions/productsActions';
import isEmpty from '../../../validation/is-empty';
import Spinner from '../../common/Spinner';
import StarRatings from 'react-star-ratings';
import ProductImage from '../common/ProductImage';

class RandomProduct extends Component {
  constructor(props) {
    super(props);

    this.count = 0;
  }

  addCount() {
    this.count++;
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

  showProducts() {
    if (!isEmpty(this.props.product.random_products)) {
      return this.props.product.random_products
        .filter(item => item.productId !== this.props.productId)
        .map(prod => (
          <div
            key={prod.productId}
            className="col-md-2 col-sm-4 imageGrid mt-3"
          >
            <Link
              to={`/customerdetailedproduct/${prod.productId}`}
              className="img-thumbnail surround-parent h-100 w-100 card product-card"
              key={prod.productId}
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
            {this.addCount()}
          </div>
        ));
    }
  }

  render() {
    if (isEmpty(this.props.product.random_products))
      return (
        <div className="row straight-grid">
          <Spinner size={'150px'} />
        </div>
      );
    else {
      let result = this.showProducts();
      if (this.count > 0)
        return <div className="row straight-grid">{result}</div>;
      else
        return (
          <div className="row straight-grid">
            <p>No similar products found :(</p>
          </div>
        );
    }
  }
}

const mapStateToProps = state => ({
  product: state.product
});

export default connect(
  mapStateToProps,
  { getRandomProducts }
)(withRouter(RandomProduct));
