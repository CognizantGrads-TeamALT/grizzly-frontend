import React, { Component } from "react";
import {
    Row,
    Col,
    Nav,
    NavItem
  } from "reactstrap";
import { connect } from "react-redux";
import { Link } from "react-router-dom";
import PropTypes from "prop-types";
import classnames from "classnames";
import ProductList from "../products/ProductList";
import { getProducts } from "../../../actions/productsActions";
import Profile from "../profile/Profile"
import ProductDescription from "./ProductDescription";
import ProductTitle from "./ProductTitle";
import Spinner from "../../common/Spinner";
import isEmpty from '../../../validation/is-empty'

class DetailedProduct extends Component {
    constructor(props) {
        super(props);
        this.state = {
            activeTab: "1"
        };
    }
    render() {
        const { products, loading} = this.props.product;

        let prodDetails;
        if (isEmpty(products) || loading) {
                prodDetails = <Spinner />;
          } 
          else {
            prodDetails = products.filter(
                product => product.productId == this.props.match.params.productId
            )[0];
          }
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
                            <ProductTitle
                                productDetails={prodDetails}
                            />
                            
                        </div>
                        <div className="col-7">
                            <ProductDescription 
                                productDetails={prodDetails}
                            />
                        </div>
                    </div>

                </div> 
            </div>
        );
    }
}  

ProductList.propTypes = {
    getProducts: PropTypes.func.isRequired
};

const mapStateToProps = state => ({
    product: state.product
  });

export default connect(mapStateToProps, { getProducts })(DetailedProduct);
