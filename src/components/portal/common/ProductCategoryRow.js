import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import Spinner from '../../common/Spinner';
import isEmpty from '../../../validation/is-empty';
import { searchCategories, } from "../../../actions/categoryActions";

class ProductCategoryRow extends Component {
    show() {
        const { categories, loading } = this.props.category;
        let categoryArray = [];
        if(!isEmpty(categories) && !loading) {
            for (let i = 0; i < 5; i++) {
                categoryArray.push(categories[i]);
            }
            return categoryArray.map((cat) => (
                <div className="col" key={cat.categoryId}>
                    <Link
                        to={{
                            pathname: `/category/${cat.name}`,
                            state: {catId: cat.categoryId}
                        }}
                        className="btn more-rounded parent-wide hover-t-b btn-sm my-2 my-sm-0 mr-sm-2"
                    >
                    {cat.name}
                    </Link>
                </div>
            ));
        } else {
            return <Spinner />
        }
    }
  }
    displayAllCategories() {
        const { categories, loading } = this.props.category;
        if(!isEmpty(categories) && !loading) {
            return categories.map((cat) => (
                <Link
                    key={cat.categoryId}
                    to={{
                        pathname: `/category/${cat.name}`,
                        state: {catId: cat.categoryId}
                    }}
                    className="dropdown-item more-rounded"
                >
                {cat.name}
                </Link>
            ));
        } else {
            return <Spinner /> 
        }
    }
  }

    render() {
        return(
            <div className="container mb-4">
                <div className="row">
                    <div className="col">
                        <div className="dropdown">
                            <button className="btn dropdown-toggle more-rounded parent-wide hover-w-b btn-sm my-2 my-sm-0 mr-sm-2" type="button" id="categoryDropDownMenu" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                            Shop by Category
                            </button>
                            <div className="dropdown-menu" aria-labelledby="categoryDropDownMenu">
                                {this.displayAllCategories()}
                            </div>
                        </div>
                    </div>
                    {this.show()}
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
};

const mapStateToProps = state => ({
  category: state.category
});
 
export default connect( mapStateToProps, {
    searchCategories
  }
)(ProductCategoryRow);
