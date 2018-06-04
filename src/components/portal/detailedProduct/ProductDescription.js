import React, { Component } from "react";
import exampleImg from "../../../img/exampleImg.png";

class ProductDescription extends Component {
    render() {
        return (
            <div className="row">
                <div className="col-5">
                    <img
                        src={ exampleImg }
                        alt="Example Product Image"
                        style={{ width: "300px", display: "block" }}
                    />
                </div>
                <div className="col-4">
                    <div className="mb-3">
                        Product Description
                    </div>
                    <div className="dscrptnSize-7">
                        <p>Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.</p>
                    </div>
                </div>
                <div className="col-3">
                    Buttons
                </div>
            </div>
        );
    }
}

export default ProductDescription;