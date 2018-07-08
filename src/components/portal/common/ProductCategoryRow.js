import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import isEmpty from '../../../validation/is-empty';
import {
  searchCategories,
  sortCategoriesByParamCustomer
} from '../../../actions/categoryActions';
import { getProducts } from '../../../actions/productsActions';

class ProductCategoryRow extends Component {
  componentDidMount() {
    if (isEmpty(this.props.product.products)) {
      this.props.getProducts();
    }
    if (isEmpty(this.props.category.categories)) {
      this.props.sortCategoriesByParamCustomer('0', 'count');
    }
  }

  show() {
    const { categories, loading } = this.props.category;
    if (!isEmpty(categories) && !loading) {
      return categories.map((cat, index) => (
        <div className="col" key={index}>
          <Link
            to={`/category/${cat.name}/${cat.categoryId}`}
            className="btn more-rounded parent-wide hover-t-b btn-sm my-2 my-sm-0 mr-sm-2"
          >
            {cat.name}
          </Link>
        </div>
      ));
    }
  }

  displayAllCategories() {
    const { categories, loading } = this.props.category;
    if (!isEmpty(categories) && !loading) {
      return categories.map((cat, index) => (
        <Link
          key={index}
          to={`/category/${cat.name}/${cat.categoryId}`}
          className="dropdown-item more-rounded"
        >
          {cat.name}
        </Link>
      ));
    }
  }

  render() {
    return (
      <div className="mb-4">
        <div className="row">
          <div className="col">
            <div className="dropdown">
              <button
                className="btn dropdown-toggle more-rounded parent-wide hover-w-b btn-sm my-2 my-sm-0 mr-sm-2"
                type="button"
                id="categoryDropDownMenu"
                data-toggle="dropdown"
                aria-haspopup="true"
                aria-expanded="false"
              >
                Shop by Category
              </button>
              <div
                className="dropdown-menu"
                aria-labelledby="categoryDropDownMenu"
              >
                {this.displayAllCategories()}
              </div>
            </div>
          </div>
          {this.show()}
        </div>
      </div>
    );
  }
}

ProductCategoryRow.propTypes = {
  searchCategories: PropTypes.func.isRequired,
  sortCategoriesByParamCustomer: PropTypes.func.isRequired,
  getProducts: PropTypes.func.isRequired,

  product: PropTypes.object.isRequired,
  category: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
  product: state.product,
  category: state.category
});

export default connect(
  mapStateToProps,
  {
    searchCategories,
    sortCategoriesByParamCustomer,
    getProducts
  }
)(ProductCategoryRow);
