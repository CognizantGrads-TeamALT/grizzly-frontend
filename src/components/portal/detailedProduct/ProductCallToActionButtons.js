import React, { Component } from "react";
import {
    Button
} from "reactstrap";

class ProductCallToActionButtons extends Component {
    render() {
        return (
            <div className="col">
                <div className="row-10">
                </div>
                <div className="row-1">
                <Button
                    className="btn more-rounded hover-w-b btn-sm row-auto mt-auto"

                >
                    Finish
                </Button>
                </div>
                <div className="row-1">
                <Button
                    className="btn more-rounded hover-w-b btn-sm row-auto"
                    // onClick={this.onSubmit}
                >
                    Cancel
                </Button>
                </div>
            </div>

        );
    }
}

export default ProductCallToActionButtons;
