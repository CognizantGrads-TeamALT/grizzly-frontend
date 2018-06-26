import React, { Component } from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import { Link } from 'react-router-dom';

import PropTypes from 'prop-types';


import { getProductWithImgs } from '../../../actions/productsActions';
//import showImg from '../detailedProduct/CustomerProductDescription';


class ShoppingCart extends Component {
    constructor(props) {
        super(props);
        this.state = {
            cart: this.props.product.cart
        }
    }
    render() {
        console.log(this.state.cart);

        const products = this.state.cart;
        // let prodArray = [];
        // if (!isEmpty(products)) {
        //   for (let i = 0; i < products.length; i++) {
        //     prodArray.push(products[i]);
        //   }
        // }

        return products.map(prod => (
            <div className="shopping cart">

            <div className="row-2 items-in-cart">
                <p>Items in Your Cart</p>
                <hr width="100%" />
            </div>
            <div className="row-8 d-inline products-information">
                {/* <div key={prod.productId} className="col-md-2 col-sm-4 imageGrid mt-5"> </div> */}
                    <div key={prod.productId} className="col-3 d-inline products-image">
                        <img src={prod.img} alt="Product" width="10" height="150"></img>
                    </div>
                    <div className="col-6 d-inline product-price-quantity align-right">
                        <h6 className="d-inline ml-5">{prod.name}</h6>
                        <ul className="d-inline">
                            <li className="d-inline mr-3">$ {prod.price}</li>
                            <li className="d-inline">
                                <input className="quantity-select" min="0" max="50" maxLength="2" type="number"  ></input></li>
                        </ul>
                    </div>
                    <div align="right" className="col-2 d-inline product-total-price ">
                        <p className="d-inline"> A$ (quantity * price)</p>
                    </div>
                    <div className="col-1 d-inline remove-btn">
                        <button className=" d-inline more-rounded hover-w-b fas fa-times" />
                    </div>
                </div>
                <hr width="100%" />
                <div align="right" className="row-2 d-inline checkout-btn div-checkout">
                    <Link className="d-inline btn continue-btn more-rounded btnCheckOutCart "
                        to="/customer" > Continue Shopping</Link>
                    <button className="d-inline ml-3 checkout-btn more-rounded btnCheckOutCart" >Checkout</button>
                </div>
            </div>
        ));
    
    }
}

ShoppingCart.propTypes = {
    getProductWithImgs: PropTypes.func.isRequired,
}
const mapStateToProps = state => ({
    product: state.product,
    cart: state.cart
});

export default connect(mapStateToProps,
    { getProductWithImgs })(withRouter(ShoppingCart));
