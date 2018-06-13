import React, { Component } from "react";
import { Row, Col, Nav, NavItem } from "reactstrap";
import { connect } from "react-redux";
import { Link } from "react-router-dom";
import classnames from "classnames";
import Profile from "../profile/Profile";
import ProductDescription from "./ProductDescription";
import ProductTitle from "./ProductTitle";
import Spinner from "../../common/Spinner";
import isEmpty from "../../../validation/is-empty";
import { getProductWithImgs } from "../../../actions/productsActions";

class DetailedProduct extends Component {
    constructor(props) {
        super(props);
        this.state = {
            activeTab: 0,
            productId: this.getID(this.props.location),
            count: 0,
            product: "",
            intervalID: ""
            
        };
        this.getProductDetails=this.getProductDetails.bind(this);
        this.populateProduct();
    }

    getID(id){
        var res = id.pathname.split("/");
        var productId = res[res.length-1];
        return productId;
    }

    getProductDetails(){
        if(!isEmpty(this.props.product.single)){
            //console.log("found a product");
            const single = this.props.product.single[0];
            this.setState({product : single});
            clearInterval(this.state.intervalID);
            this.state.count=0;
            console.log(single);
        }
        else if(this.state.count > 50){
            clearInterval(this.state.intervalID);
            //console.log("cancelled search products");
        }
        else{
            this.setState({count: this.state.count +1});
            //console.log("searching for product");
        }
    }

    populateProduct = () => {
        this.props.getProductWithImgs(this.state.productId);
        this.setState({intervalID: setInterval(this.getProductDetails, 100)});
    }

    onClick = () => {
        console.log(this.state.productId);
        this.populateProduct();
    }

    show() {
        const { products, loading } = this.props.product;
        if (isEmpty(products) || loading) {
          return (
            <tr>
              <td>
                <Spinner />
              </td>
            </tr>
          );
        } else {
            return products.filter(
                product => product.productId === parseInt(this.props.match.params.productId, 10)
            )[0];
        }
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
                  <Link
                    to="/adminportal"
                    className={classnames(
                      'nav-link btn-outline-success my-2 my-sm-0',
                      {
                        active: this.state.activeTab === 0
                      }
                    )}
                  >
                    PRODUCTS
                  </Link>
                </NavItem>
                <NavItem>
                  <Link
                    to="/adminportal"
                    className={classnames(
                      'nav-link btn-outline-success my-2 my-sm-0'
                    )}
                  >
                    VENDORS
                  </Link>
                </NavItem>
                <NavItem>
                  <Link
                    to="/adminportal"
                    className={classnames(
                      'nav-link btn-outline-success my-2 my-sm-0'
                    )}
                  >
                    CATEGORIES
                  </Link>
                </NavItem>
              </Nav>
            </Col>
          </Row>

                    <div className="row mt-4 parent-min-half-high">
                        <div className="col-5">
                            <ProductTitle
                                productDetails={this.show()}
                            />
                            
                        </div>
                        <div className="col-7 parent-min-half-high">
                            <ProductDescription 
                                productDetails={this.show()}
                            />
                            <button onClick={this.onClick} >testButton</button>
                        </div>
                    </div>
                </div> 
            </div>
    );
    }
}


const mapStateToProps = state => ({
  product: state.product
});

export default connect(
  mapStateToProps, 
  { getProductWithImgs }
)(DetailedProduct);
