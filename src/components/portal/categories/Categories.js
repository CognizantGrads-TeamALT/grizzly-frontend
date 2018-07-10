import React, { Component } from "react";
import { connect } from "react-redux";
import Spinner from "../../common/Spinner";
import PropTypes from "prop-types";
import CategorySearchSort from "../common/CategorySearchSort";
import {
  getCategories,
  setCategoryUpdated
} from "../../../actions/categoryActions";
import CategoriesList from "./CategoriesList";
import isEmpty from "../../../validation/is-empty";
import { toast } from 'react-toastify';

class Categories extends Component {
  componentDidMount() {
    // Detect when scrolled to bottom.
    this.refs.myscroll.addEventListener("scroll", e => {
      e.preventDefault();
      if (
        this.refs.myscroll.scrollTop + this.refs.myscroll.clientHeight >=
        this.refs.myscroll.scrollHeight &&
        !this.props.category.loading
      ) {
        this.loadMore();
      }
    });
  }

  componentDidUpdate() {
    if (this.props.category.updateOnce)
      this.props.setCategoryUpdated();
  }

  shouldComponentUpdate() {
    if (this.props.category.updateOnce || this.props.category.loading)
      return true;

    return false;
  }

  loadMore() {
    if (this.props.category.hasMore) {
      this.notify('Loading more categories...');
      this.props.getCategories(this.props.category.index);
      if (!isEmpty(this.props.errors.errorMessage))
        toast.info(this.props.errors.errorMessage);
    }
  }

  show() {
    const { categories, loading } = this.props.category;
    // const { errorMessage } = this.props.errors;
    //show errors if finsihed loading, no cats were found and an error message exists
   if (loading) {
      return (
        <tr>
          <td>
            <Spinner size={'150px'} />
          </td>
        </tr>
      );
    } else {
      if (isEmpty(categories)) {
        return <tr><td>No categories found.</td></tr>;
      }

      return categories.map(category => (
        <CategoriesList key={category.categoryId} category={category} />
      ));
    }
  }

  render() {
    return (
      <div>
        <CategorySearchSort />
        <table className="table table-sm table-hover">
          <thead>
            <tr>
              <th scope="col">Category Name</th>
              <th scope="col">Description</th>
              <th scope="col">Products</th>
              <th scope="col" />
            </tr>
          </thead>
          <tbody ref="myscroll" style={{ overflowX: 'hidden', overflowY: 'auto' }}>{this.show()}</tbody>
        </table>
      </div>
    );
  }
}

Categories.propTypes = {
  getCategories: PropTypes.func.isRequired,
  setCategoryUpdated: PropTypes.func.isRequired,
  category: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
  category: state.category,
  errors: state.errors
});

export default connect(
  mapStateToProps,
  { getCategories, setCategoryUpdated }
)(Categories);
