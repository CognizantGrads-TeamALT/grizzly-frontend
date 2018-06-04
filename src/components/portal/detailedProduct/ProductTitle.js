import React, { Component } from "react";
import exampleImg from "../../../img/exampleImg.png";


class ProductTitle extends Component {
    render() {
        return (
            <div className="container">
                <div className="row align-items-start">

                    <div className="col">
                        <div className="productTitle">
                            <b className="d-inline">Trimmer </b><p className="d-inline">by Philips</p>
                        </div>
                        <div className="productRating">
                            <i className="d-inline fas fa-star fa-xs mr-1"/><p className="d-inline descriptionSize">4.7</p>
                        </div>
                    </div>


                </div>
                <div className="row align-items-end">
                    <img
                        src={ exampleImg }
                        alt="Example Product Image"
                        style={{ width: "333px", display: "block" }}
                    />
                </div>
            </div>
        );
    }
}

export default ProductTitle;