import React, { Component } from "react";
import { connect } from "react-redux";
import Spinner from "../../common/Spinner";
import PropTypes from "prop-types";
import CategorySearchSort from "../common/CategorySearchSort";
import { getCategories } from "../../../actions/categoryActions";
import CategoriesList from "./CategoriesList";

class Test3 extends Component {
  constructor(props) {
    super(props);

    this.state = {
      index: 0
    };
  }

  componentWillMount() {
    this.scrollListener = window.addEventListener("scroll", e => {
      this.handleScroll(e);
    });
  }

  handleScroll = e => {
    e.preventDefault();
    const { hasMore, scrolling } = this.props.category;
    if (!hasMore) {
      this.setState({
        index: 0
      });
      return;
    } else {
      var lastTr = document.querySelector("#catDisplay tbody tr:last-child");
      var lastTrOffset = lastTr.offsetTop + lastTr.clientHeight;
      var pageOffset = window.pageYOffset + window.innerHeight;
      var bottomOffset = 20;
      if (pageOffset > lastTrOffset - bottomOffset) {
        this.loadMore();
      }
    }
  };

  loadMore = () => {
    this.setState({
      index: this.state.index + 1
    });
    this.props.getCategories(this.state.index);
  };

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
      </div>
    );
  }
}

Test3.propTypes = {
  getCategories: PropTypes.func.isRequired,
  category: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
  category: state.category
});

export default connect(mapStateToProps, { getCategories })(Test3);
