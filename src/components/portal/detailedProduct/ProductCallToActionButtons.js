import React, { Component } from "react";
import { onToggle } from "../AdminTab";
import {
    Button
} from "reactstrap";

class ProductCallToActionButtons extends Component {
    render() {
        return (
            <div>
                <div className="row-11">
                    <Button
                        className="btn more-rounded hover-w-b btn-sm my-2 my-sm-0 mr-sm-2 pr-2"

                    >
                        Finish
                    </Button>
                </div>
                <div className="row-12">
                    <Button
                        className="btn more-rounded hover-w-b btn-sm my-2 my-sm-0 mr-sm-2 pr-2"
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