import React, { Component } from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';


class ShoppingCart extends Component {
    render() {

        return (
            <div className="container">
                <div className="row-2 items-in-cart">
                    <h4> Items in your Cart </h4>
                    <hr width="100%" />
                </div>
                <div className="row-8 d-inline products-information">
                    <div className="col-4 d-inline products-image">
                        <img alt="Product image" width="10" height="150"></img>
                    </div>
                    <div className="col-8 d-inline product-price-quantity align-right">
                        <h6 className="d-inline ml-5">Black Digital Watch</h6>
                        <ul className="d-inline">
                            <li className="d-inline"> Price of one product</li>
                            <li className="d-inline">
                                <input width="50%" type="number"  ></input></li>
                        </ul>
                    </div>
                    <div className="col-2 d-inline product-total-price">
                    <p className="d-inline">quantity * price</p>
                    </div>
                </div>
            </div>


        );
    }
}

export default connect(null)(withRouter(ShoppingCart));
