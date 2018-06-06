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

class Categories extends Component {
  constructor(props) {
    super(props);
    this.index = 0;
  }

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

  shouldComponentUpdate() {
    if (this.props.category.updateOnce) {
      this.props.setCategoryUpdated();
      return true;
    }

    return this.props.category.loading || false;
  }

  loadMore() {
    if (this.props.category.hasMore) {
      this.index += 1;
      this.props.getCategories(this.index);
    } else {
      this.index = 0;
    }
  }

  show() {
    const { categories, loading } = this.props.category;
    if (isEmpty(categories) || loading) {
      return (
        <tr>
          <td>
            <Spinner />
          </td>
        </tr>
      );
    } else {
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
        </table>
        <div ref="myscroll" style={{ height: "500px", overflow: "auto" }}>
          <table className="table table-sm table-hover">
            <tbody>{this.show()}</tbody>
          </table>
        </div>
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
  category: state.category
});

export default connect(
  mapStateToProps,
  { getCategories, setCategoryUpdated }
)(Categories);
