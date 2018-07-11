import React, { Component } from "react";
import { connect } from "react-redux";
import { withRouter } from "react-router-dom";
import { Button, Modal, ModalHeader, ModalBody, ModalFooter } from "reactstrap";

class TrackOrderModal extends Component {
  constructor(props) {
    super(props);
    this.state = {
      ordr: this.props.ordr,
      modal: false,
      shouldToggle: false
    };

    this.onToggle = this.onToggle.bind(this);
    this.onChange = this.onChange.bind(this);
  }

  onToggle() {
    this.setState({
      modal: !this.state.modal
    });
  }

  componentDidUpdate(){
    if(this.state.shouldToggle){
      this.onToggle();
     }
  }

  onChange(e) {
    this.setState({ [e.target.name]: e.target.value });
  }

  render() {
    return (
      <div className="form-group mb-0">
        <input
          type="button"
          value={this.props.buttonLabel}
          className={this.props.buttonClass}
          onClick={this.onToggle}
        />
        <Modal
          isOpen={this.state.modal}
          toggle={this.toggle}
          className={this.props.className}
        >
          <ModalHeader toggle={this.onToggle}>{this.props.title}</ModalHeader>
          <ModalBody>
          <div className="mt-2 mb-4 row" key={this.state.ordr.txn_id}>
            <div className="col ml-2">
              <div className="row fnt-weight-400 dscrptnSize-7 bottom-border mb-2">
                <div className="col mb-1">
                  Txn ID: {this.state.ordr.txn_id}
                </div>
              </div>
              <div className="row mb-2">
                <div className="col-8">
                  <div className="dscrptnSize-8">Delivered at:</div> 
                  <div className="dscrptnSize-7 fnt-weight-300">ABC Warehouse</div>  
                </div>               
                <div className="col-4">
                  <i className="fas fa-check-circle"></i>
                </div>
              </div>
              <div className="row mb-2">
                <div className="col-8">
                  <div className="dscrptnSize-8">Delivered at:</div>
                  <div className="dscrptnSize-7 fnt-weight-300">Next Courier Facility</div>
                </div>                
                <div className="col-4">
                  <i className="fas fa-check-circle"></i>
                </div>
              </div>
              <div className="row mb-2">
                <div className="col-8">
                  <div className="dscrptnSize-8">Yet to Deliver at:</div> 
                  <div className="dscrptnSize-7 fnt-weight-300">{this.state.ordr.departing_location}</div>    
                </div>                
                <div className="col-4">
                  <i className="far fa-check-circle"></i>
                </div>
              </div>
            </div>
            <div className="col text-left">
              <div className="mt-2 fnt-weight-500 dscrptnSize-9 mb-2">Details: </div>
              <div className="mb-2 w-75">
                <div className="fnt-weight-400 dscrptnSize-8">Delivered at:</div>
                <div className="fnt-weight-300 dscrptnSize-7">ABC Warehouse</div> 
              </div>
              <div className="mb-2 w-75">
                <div className="fnt-weight-400 dscrptnSize-8">Dispatched for:</div>
                <div className="fnt-weight-300 dscrptnSize-7">{this.state.ordr.departing_location}</div> 
              </div>
            </div>
          </div>
          </ModalBody>
          <ModalFooter>
            <div>
              <Button
                className="btn more-rounded orange-b btn-sm mr-sm-2 d-inline"
                onClick={this.onToggle}
              >
                Done
              </Button>
            </div>
          </ModalFooter>
        </Modal>
      </div>
    );
  }
}



export default connect(
  null,
      {}
    )(withRouter(TrackOrderModal));
