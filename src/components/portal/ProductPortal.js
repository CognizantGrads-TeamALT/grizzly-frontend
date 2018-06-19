import React, { Component } from 'react';
import { connect } from "react-redux";
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import Spinner from '../../components/common/Spinner';
import isEmpty from '../../validation/is-empty';
import {
    searchCategories
} from "../../actions/categoryActions";
import { 
    filterProductsByCategory
} from "../../actions/productsActions";
import ProductCard from "./detailedProduct/ProductCard";

class ProductPortal extends Component {
    constructor(props) {
        super(props);
        this.state = {
            searchId: this.props.match.params.searchParam,
            searchFilter: this.props.match.params.searchFilter
        }
        const { catId } = props.location.state
        // this.props.searchCategories(this.state.searchId);
        this.props.filterProductsByCategory({
            cur_id: catId,
            index: 0
        });
        console.log('props')
        console.log(this.props)
        console.log('state')
        console.log(this.state)
    }

    show() {
        if (this.props.match.params.searchFilter == "category") {
            const { products, loading } = this.props.product
            if(!isEmpty(products) && !loading) {
                return products.map((prod) => (
                <div className="card text-left mb-2" key={prod.productId}>
                    <div className="card-body">
                        <div className="row">
                                <div className="col-3">
                                    <ProductCard prodid={prod.productId}/>
                                </div>
                                <div className="col-5">
                                    <div className="productTitle">
                                        <b className="d-inline">{prod.name}</b>
                                        <p className="d-inline dscrptnSize-9"> by {prod.vendorId}</p>
                                    </div>
                                </div>
                                <div className="col-2">
                                    ${prod.price}
                                </div>
                                <div className="col-2">
                                    <a href="#" className="btn more-rounded hover-t-b btn-sm mx-auto surround-parent parent-wide">View</a>
                                </div>
                        </div>

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
            <div className="col">
                    {this.show()}
            </div>
        );
    }
}

ProductPortal.propTypes = {
    filterProductsByCategory: PropTypes.func.isRequired
};

const mapStateToProps = state => ({
    product: state.product
});
  
export default connect( mapStateToProps, { 
    filterProductsByCategory
})(ProductPortal);
  