import React, { Component } from "react";
import { connect } from "react-redux";
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import {
    sortCategoriesByParam
  } from "../../../actions/categoryActions";

class ProductCategoryRow extends Component {
    constructor(props) {
        super(props);
        this.sortCategoryByCount = this.sortCategoryByCount.bind(this);
        
    }

    sortCategoryByCount() {
        this.props.sortCategoriesByParam("0", "count");
      }

    render() {
        return(
            <div className="container mb-4">
                <div className="row">
                    <div className="col">
                        <div className="dropdown">
                            <button className="btn dropdown-toggle more-rounded parent-wide hover-w-b btn-sm my-2 my-sm-0 mr-sm-2" type="button" id="categoryDropDownMenu" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                            Shop by category
                            </button>
                            <div className="dropdown-menu" aria-labelledby="categoryDropDownMenu">
                                <a className="dropdown-item more-rounded" href="#">Cameras</a>
                            </div>
                        </div>
                    </div>
                    <div className="col">
                        <Link 
                            className="btn more-rounded parent-wide hover-t-b btn-sm my-2 my-sm-0 mr-sm-2"
                            to="/adminportal"
                        >
                        Cameras
                        </Link>
                    </div>
                    <div className="col">
                        <Link 
                            className="btn more-rounded parent-wide hover-t-b btn-sm my-2 my-sm-0 mr-sm-2"
                            to="/adminportal"
                        >
                        Watches
                        </Link>
                    </div>
                    <div className="col">
                        <Link 
                            className="btn more-rounded parent-wide hover-t-b btn-sm my-2 my-sm-0 mr-sm-2"
                            to="/adminportal"
                        >
                        Food
                        </Link>
                    </div>
                    <div className="col">
                        <Link 
                            className="btn more-rounded parent-wide hover-t-b btn-sm my-2 my-sm-0 mr-sm-2"
                            to="/adminportal"
                        >
                        Drinks
                        </Link>
                    </div>
                    <div className="col">
                        <Link 
                            className="btn more-rounded parent-wide hover-t-b btn-sm my-2 my-sm-0 mr-sm-2"
                            to="/adminportal"
                        >
                        Bags
                        </Link>
                    </div>
                </div>
            </div>
        );
    }
}

ProductCategoryRow.propTypes = {
    sortCategoriesByParam: PropTypes.func.isRequired
};

// const mapStateToProps = state => ({
//     category: state.category
// });
  
export default connect(
    null,
    { sortCategoriesByParam }
  )(ProductCategoryRow);
  