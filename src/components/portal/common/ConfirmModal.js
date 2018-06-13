import React, { Component } from "react";
import { connect } from "react-redux";
import { Button, Modal, ModalHeader, ModalBody, ModalFooter } from "reactstrap";

class ConfirmModal extends Component {
    constructor(props) {
        super(props);
        this.state = {
            modal: false,
        };

        this.onToggle = this.onToggle.bind(this);
        this.onSubmit = this.onSubmit.bind(this);
    }

    onToggle() {
        this.setState({
            modal: !this.state.modal
        });
    }

    onSubmit() {
        this.props.onSubmit();
        this.onToggle();
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
                    className={this.props.className}
                    >
                    <ModalHeader toggle={this.confirmToggle}>{this.props.title}</ModalHeader>
                    <ModalBody>
                        <form onSubmit={this.onSubmit}>
                            <p className="text-center">Are you sure you want to {this.props.confirmText}?</p>
                        </form>
                    </ModalBody>
                    <ModalFooter>
                        <div>
                        <Button
                            //className="btn more-rounded hover-w-b btn-sm my-2 my-sm-0 mr-sm-2 pr-2"
                            className={this.props.buttonClass}
                            onClick={this.onSubmit}
                        >
                            {this.props.buttonLabel}
                        </Button>

                        <Button
                            className="btn more-rounded hover-w-b btn-sm my-2 my-sm-0 mr-sm-2 pr-2"
                            onClick={this.onToggle}
                        >
                            Cancel
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
  )(ConfirmModal);