import React, { Component } from "react";
import {
    Button
} from "reactstrap";

class ProductDescription extends Component {
    render() {
        return (
            <div className="container">
                <div className="row align-items-start">
                    <div className="col">
                        <div className="mb-3 mt-5">
                            Product Description
                        </div>
                    </div>
                </div>
                <div className="row align-items-center">
                    <div className="col-8">
                        <div className="dscrptnSize-7">
                            <p>Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of</p>
                        </div>
                    </div>
                    
                </div>
                <div className="row align-items-end">
                    <div className="col">  
                        <p className="mb-0 bottom-zero bottom-heavy">$14</p>
                    </div> 
                    <div className="col">  
                        
                    </div> 
                    <div className="col surround-parent parent-wide">  
                        <div class="row surround-parent parent-wide">
                            <div class="col align-self-end surround-parent parent-wide">
                                    <Button
                                        className="btn more-rounded hover-w-b btn-sm mx-auto surround-parent parent-wide mt-2"

                                            >
                                                Finish
                                    </Button>
                                    <Button
                                        className="btn more-rounded hover-w-b btn-sm mx-auto surround-parent parent-wide mt-2"
                                        // onClick={this.onSubmit}
                                    >
                                        Cancel
                                    </Button>
                            </div>
                        </div>

                    </div> 

                        
                </div>
            </div>
  
        );
    }
}

export default ProductDescription;