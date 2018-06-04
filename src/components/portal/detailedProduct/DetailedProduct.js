import React, { Component } from "react";
import {
    Row,
    Col,
    Nav,
    Button,
    NavItem,
    NavLink
  } from "reactstrap";
import { connect } from "react-redux";
import { Link } from "react-router-dom";

import PropTypes from "prop-types";
import classnames from "classnames";
import Products from "../products/Products";
import { getProducts } from "../../../actions/productsActions";
import Profile from "../profile/Profile"
import ProductDescription from "./ProductDescription";
import ProductCallToActionButtons from "./ProductCallToActionButtons";
import ProductTitle from "./ProductTitle";

class DetailedProduct extends Component {
    constructor(props) {
        super(props);
        this.state = {
            activeTab: "1"
        };
    }
    render() {
        return (
            <div className="row">
                <div className="col-3">
                    <Profile />
                </div>
                <div className="col-9">
                    <Row>
                        <Col>
                            <Nav tabs>
                                <NavItem>
                                    <Link to="/adminportal"
                                    className={classnames("nav-link hover-w-b btn-outline-success my-2 my-sm-0",
                                    {
                                        active: this.state.activeTab === "1"
                                    })}
                                    >
                                    PRODUCTS
                                    </Link>
                                </NavItem>
                                <NavItem>
                                    <Link to="/adminportal"
                                    className={classnames("nav-link hover-w-b btn-outline-success my-2 my-sm-0")}
                                    >
                                    VENDORS
                                    </Link>
                                </NavItem>
                                <NavItem>
                                    <Link to="/adminportal"
                                    className={classnames("nav-link hover-w-b btn-outline-success my-2 my-sm-0")}
                                    >
                                    CATEGORIES
                                    </Link>
                                </NavItem>
                            </Nav>
                        </Col>
                    </Row>

                    <div className="row mt-4">
                        <div className="col-5">
                            <ProductTitle />
                        </div>
                        <div className="col-7">
                            <ProductDescription />
                        </div>
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
