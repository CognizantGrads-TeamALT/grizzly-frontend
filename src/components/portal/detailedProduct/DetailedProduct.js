import React, { Component } from "react";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import classnames from "classnames";
import Products from "../products/Products";
import { getProducts } from "../../../actions/productsActions";
import AdminTab from "../AdminTab"
import Profile from "../profile/Profile"
import ProductDescription from "./ProductDescription";
import ProductCallToActionButtons from "./ProductCallToActionButtons";
import ProductImage from "./ProductImage";

class DetailedProduct extends Component {

    render() {
        return (
            <div className="row">
                <div className="col-3">
                    <Profile />
                </div>
                <div className="col-9">
                    <AdminTab />
                    <div className="col-5">
                    <ProductImage />
                    </div>
                    <div className="col-5">
                        <ProductDescription />
                    </div>
                    <div className="col-2">
                        <ProductCallToActionButtons />
                    </div>
                </div>
            </div>
        );
    }
}  

// DetailedProduct.propTypes = {
//     getDetailedProduct: PropTypes.func.isRequired
// };

// export default connect(null, { getDetailedProduct })(
//     DetailedProduct
// );

export default DetailedProduct;
