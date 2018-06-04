import React, { Component } from "react";
import { connect } from "react-redux";
import Spinner from "../../common/Spinner";
import PropTypes from "prop-types";
import CategorySearchSort from "../common/CategorySearchSort";
import { getCategories } from "../../../actions/categoryActions";
import CategoriesList from "./CategoriesList";
import isEmpty from "../../../validation/is-empty";

class Test2 extends Component {
  constructor(props) {
    super(props);
    this.state = {
      index: 0
    };
  }

  componentDidMount() {
    // Detect when scrolled to bottom.
    this.refs.myscroll.addEventListener("scroll", e => {
      e.preventDefault();
      if (
        this.refs.myscroll.scrollTop + this.refs.myscroll.clientHeight >=
        this.refs.myscroll.scrollHeight
      ) {
        this.loadMore();
      }
    });
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
      this.setState({
        index: this.state.index + 1
      });
      this.props.getCategories(this.state.index);
    }
  }

  render() {
    return (
      <div ref="myscroll" style={{ height: "450px", overflow: "auto" }}>
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
          <tbody>{this.show()}</tbody>
        </table>
      </div>
    );
  }
}

Test2.propTypes = {
  getCategories: PropTypes.func.isRequired,
  category: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
  category: state.category
});

export default connect(mapStateToProps, { getCategories })(Test2);
