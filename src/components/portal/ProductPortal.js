import React, { Component } from 'react';
import { connect } from "react-redux";
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import Spinner from '../../components/common/Spinner';
import isEmpty from '../../validation/is-empty';
import {
    searchCategories
} from "../../actions/categoryActions";

class ProductPortal extends Component {
    constructor(props) {
        super(props);
        this.state = {
            searchId: this.props.match.params.searchParam,
            searchFilter: this.props.match.params.searchFilter
        }
        this.props.searchCategories(this.state.searchId);

    }

    show() {
        if (this.props.match.params.searchFilter == "category") {
            const { categories, loading } = this.props.category
            if(!isEmpty(categories) && !loading) {
                console.log(categories);
                return categories.map(cat => (
                    <div className="col">
                        <div className="row">
                            {cat.name} 
                        </div>
                        <div className="row">
                            {cat.description} 
                        </div>
                    </div>
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
                        {this.show()}
                    </div>
                </div>
            </div>
        );
    }
}

ProductPortal.propTypes = {
    searchCategories: PropTypes.func.isRequired
};

const mapStateToProps = state => ({
    category: state.category
});
  
export default connect( mapStateToProps, { 
    searchCategories 
})(ProductPortal);
  