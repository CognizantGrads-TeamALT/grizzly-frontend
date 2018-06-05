import React, { Component } from "react";
import { Link } from "react-router-dom";


class ProductDescription extends Component {
    constructor(props) {
        super(props);
        this.state = {
            desc: this.props.productDetails.desc,
            price: this.props.productDetails.price
        }
    }
    render() {
        return (
            <div className="container surround-parent parent-high">
                <div className="row align-items-start">
                    <div className="col">
                        <div className="mb-3 mt-5">
                            Product Description
                        </div>
                    </div>
                </div>
                <div className="row align-items-start parent-min-high">
                    <div className="col-8">
                        <div className="dscrptnSize-7">
                            <p>{this.state.desc}</p>
                        </div>
                    </div>
                    
                </div>
                <div className="row align-items-end">
                    <div className="col">  
                        <p className="mb-0 bottom-zero bottom-heavy">${this.state.price}</p>
                    </div> 
                    <div className="col">  
                        
                    </div> 
                    <div className="col surround-parent parent-wide">  
                        <div className="row surround-parent parent-wide">
                            <div className="col align-self-end surround-parent parent-wide">
                                    <Link 
                                        className="btn more-rounded hover-t-b btn-sm mx-auto surround-parent parent-wide mt-2"
                                        to="/adminportal"
                                        // Please change when you do Edit Product
                                            >
                                                Finish
                                    </Link>
                                    <Link
                                        className="btn more-rounded hover-w-b btn-sm mx-auto surround-parent parent-wide mt-2"
                                        to="/adminportal"
                                    >
                                        Cancel
                                    </Link>

                            </div>
                        </div>

                    </div> 

                        
                </div>
            </div>
  
        );
    }
}

export default ProductDescription;