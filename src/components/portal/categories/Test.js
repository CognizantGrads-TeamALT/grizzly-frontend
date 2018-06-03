import React, { Component } from "react";
import { connect } from "react-redux";
import Spinner from "../../common/Spinner";
import PropTypes from "prop-types";
import CategorySearchSort from "../common/CategorySearchSort";
import { getCategories } from "../../../actions/categoryActions";
import CategoriesList from "./CategoriesList";
import isEmpty from "../../../validation/is-empty";

import Waypoint from "react-waypoint";
// need to run: sudo npm i react-waypoint --save

class Test extends Component {
  constructor(props) {
    super(props);
    this.state = {
      index: 0
    };
    this.loadMore = this.loadMore.bind(this);
  }

  componentDidMount() {
    this.loadMore();
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

  loadMore() {
    if (this.props.category.hasMore) {
      this.props.getCategories(this.state.index);
      this.setState({
        index: this.state.index + 1
      });
    }
  }

  render() {
    cl;
    return (
      <section className="photo-feed">
        <CategorySearchSort />
        <table id="catDisplay" className="table table-sm table-hover">
          <thead>
            <tr>
              <th scope="col">Category Name</th>
              <th scope="col">Description</th>
              <th scope="col">Products</th>
              <th scope="col" />
            </tr>
          </thead>
          <tbody>{this.show()}</tbody>
        </table>
        <Waypoint onEnter={this.loadMore} />
      </section>
    );
  }
}

Test.propTypes = {
  getCategories: PropTypes.func.isRequired,
  category: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
  category: state.category
});

export default connect(mapStateToProps, { getCategories })(Test);
