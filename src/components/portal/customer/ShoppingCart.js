import React, { Component } from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import { Link } from 'react-router-dom';
import isEmpty from '../../../validation/is-empty';
import unavailable from '../../../img/unavailable.png';
import Spinner from '../../common/Spinner';
import PropTypes from 'prop-types';
import { getProductWithImgs } from '../../../actions/productsActions';
//import showImg from '../detailedProduct/CustomerProductDescription';


class ShoppingCart extends Component {
    constructor(props) {
        super(props);
        this.state = {
            cart: this.props.product.cart,
            totalprice: this.props.totalprice
        }
        this.onChange = this.onChange.bind(this);
    }

     
  onChange(e) {
    this.setState({ [e.target.totalprice]: e.target.quantity * e.target.price });
  }

  onClick = event => {
    this.setState({ clicks: this.state.value - 1 });
    console.log(this.clicks);

  }
    showImg(product) {
        // If we don't have any images.
        if (isEmpty(this.props.product.images[product.productId])) {
          // If the product details has no images.
          if (isEmpty(product.imageDTO)) {
            return (
              <img
                src={unavailable}
                className="img-responsive"
                style={{ width: '150px', height: '150px' }}
                alt="Unavailable"
              />
            );
            // We have image but its loading, so wait.
          } else {
            return <Spinner size={'150px'} />;
          }
          // Return the loaded image.
        } 
      }
    render() {
        console.log(this.state.cart);

        const products = this.state.cart;

        return products.map(prod => (
            <div className="shopping cart">
            <div className="row-2 mt-8 items-in-cart">
                <h2 className="ml-5">Items in Your Cart</h2>
                <hr width="100%" />
            </div>
           
            <div className="row-8 d-inline products-information">
                    <div key={prod.productId} className="col-3 ml-5 d-inline products-image">
                    <Link
                     to={`/customerdetailedproduct/${prod.productId}`}
                        className="img-thumbnail ml-4 h-10 w-20" >
                        </Link>
                        {/* <img  alt="Product" width="10" height="150"></img> */}
                    </div>
                    <div className="col-6 d-inline product-price-quantity align-right">
                        <h6 className="d-inline ml-5">{prod.name}</h6>
                        <ul className="d-inline">
                            <li id= "price"className="d-inline mr-3">$ {prod.price}</li>
                            <li className="d-inline">
                                <input id="quantity" className="quantity-select" Value="1"
                                 min="1" max="50" maxLength="2" type="number" 
                                 onChange={this.onChange} ></input></li>
                        </ul>
                    </div>
                    <div align="right" className="col-2 d-inline product-total-price ">
                        <p id="totalprice" className="d-inline"> A$ {this.totalprice}</p>
                    </div>
                    <div className="col-1 d-inline remove-btn">
                        <button className=" d-inline more-rounded hover-w-b fas fa-times"
                        onClick={this.removeItem} />
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
