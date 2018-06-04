import React, { Component } from "react";

class ProductTitle extends Component {
    render() {
        return (
            <div className="align-left">
                <div className="productTitle">
                    <b className="d-inline">Trimmer </b><p className="d-inline">by Philips</p>
                </div>
                <div className="productRating">
                    <i className="d-inline fas fa-star fa-xs mr-1"/><p className="d-inline descriptionSize">4.7</p>
                </div>
            </div>

        );
    }
}

export default ProductTitle;