import React, { Component } from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import { Button, Modal, ModalHeader, ModalBody, ModalFooter } from "reactstrap";

class ErrorComponent extends Component {
    constructor(props) {
        super(props);
        
    this.onSubmit=this.onSubmit.bind(this);
        
      }
      //for model only, method call to close the popup
    onSubmit(e){
        e.preventDefault();
        this.props.closeError();
    }

    show(){
        if(this.props.popup === true){
            // returns a popup, with the error message and a 'ok' button to close.
            return(
                <Modal
                isOpen={this.props.show}
              >
                <ModalHeader ></ModalHeader>
                <ModalBody>
                    <p className="text-danger">{this.props.errormsg}</p>
                </ModalBody>
                <ModalFooter>
                  <div>
                    <Button
                      className="btn more-rounded plain-b btn-sm mr-sm-2 d-inline"
                      onClick={this.onSubmit}
                    >
                      ok
                    </Button>
                  </div>
                </ModalFooter>
              </Modal>
            )
        }
        else{
            //returns error in line in red text
            return (<p className="text-danger">{this.props.errormsg}</p>);
        }
    }

    render(){
        return (
            <div className="align-left">
                {this.show()}
            </div>
        )

    }
    
}


export default connect(
null,
    {}
  )(withRouter(ErrorComponent));
