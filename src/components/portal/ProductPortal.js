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
        this.props.searchCategories(this.state.searchId);
        this.props.filterProductsByCategory({
            cur_id: catId,
            index: 0
        });
        this.state = {
            prods: this.props.product
        }
    }

    show() {
        if (this.props.match.params.searchFilter == "category") {
            const { products, loading } = this.state.prods
            if(!isEmpty(products) && !loading) {
                return products.map((prod) => (
                <div className="card text-center" key={prod.productId}>
                    <div className="card-body">
                        <div className="row">
                            <div className="col-9">
                                <div className="row align-items-start">
                                    <div className="col pl-0">
                                        <div className="productTitle">
                                        <b className="d-inline">{prod.name}</b>
                                        <p className="d-inline dscrptnSize-9"> by {prod.vendorId}</p>
                                        </div>
                                    </div>
                                </div>
                                <div className="row align-items-end mt-3 mx-auto parent-high">
                                    <ProductCard prodid={prod.productId}/>
                                </div>
                            </div>

                            <div className="col-3">
                                ${prod.price}
                                <a href="#" className="btn more-rounded hover-t-b btn-sm mx-auto surround-parent parent-wide mt-">View</a>
                            </div>
                        </div>
                    </div>
                </div>
                ));
            } else {
                console.log("wait why you here")
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
    searchCategories: PropTypes.func.isRequired,
    filterProductsByCategory: PropTypes.func.isRequired
};

const mapStateToProps = state => ({
    category: state.category,
    product: state.product
});
  
export default connect( mapStateToProps, { 
    searchCategories,
    filterProductsByCategory
})(ProductPortal);
  