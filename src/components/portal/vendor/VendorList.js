import React, { Component } from "react";
import ConfirmModal from "../common/ConfirmModal";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { toggleBlockVendor, deleteVendor } from "../../../actions/vendorActions";
import ErrorComponent from "../../common/ErrorComponent";

class VendorList extends Component {
  constructor(props) {
    super(props);
    this.state = {
      showError: false,
      count:0

    }
    this.onBlockClick = this.onBlockClick.bind(this);
    this.closeError = this.closeError.bind(this);
  }
  //closes the error message popup.
  closeError(){
    this.setState({showError: false});
  }

  onDeleteClick(id) {
    this.props.deleteVendor(id);
        //begins a wait method to listen for an error
    this.setState({listenForError: true,
      count: 0,
      intervalId: setInterval(this.waitForResponce, 10)});
  }

  onBlockClick() {
    const { vendor } = this.props;
    this.props.toggleBlockVendor(vendor.vendorId, !vendor.enabled);
    //begins a wait method to listen for an error
    this.setState({listenForError: true,
      count: 0,
      intervalId: setInterval(this.waitForResponce, 100)});
  }

  waitForResponce = () => {
    //method waits for a responce from the server, to check it doesn't result in an error
    if(this.props.errors.errorMessage !== "" && this.state.listenForError){
      this.setState({showError:true,
      listenForError: false})
      clearInterval(this.state.intervalId) ;
    }
    else if(this.state.count> 5){
      clearInterval(this.state.intervalId);
      this.setState({listenForError:false})}
      
    else this.setState({count: this.state.count+1})
  }

  render() {
    const { vendor } = this.props;
    return (
      <tr>
        <th scope="row">{vendor.vendorId}</th>
        <td>{vendor.name}</td>
        <td>{vendor.website}</td>
        <td>{vendor.contactNum}</td>
        <td>
        <div className="row">
            <div className="col pr-0">
              <button
                className="btn more-rounded blue-b btn-sm mr-sm-2 d-inline "
                type="button"
              >
                View
              </button>
            </div>
            <div className="col p-0">
              <ConfirmModal
                  buttonLabel={vendor.enabled ? "Block" : "Unblock"}
                  title="Block Vendor"
                  confirmText={(vendor.enabled ? "Block" : "Unblock") + " " + vendor.name}
                  buttonClass="btn more-rounded orange-b btn-sm mr-sm-2 d-inline"
                  onSubmit={this.onBlockClick}
                />
            </div>
            <div className="col p-0">
              <ConfirmModal
                  buttonLabel="Delete"
                  title="Delete Vendor"
                  confirmText={"Delete " + vendor.name}
                  buttonClass="btn more-rounded red-b btn-sm mr-sm-2 d-inline"
                  onSubmit={this.onDeleteClick.bind(this, vendor.vendorId)}
                />
                {/* error component, load error popup if showerrror = true */}
              <ErrorComponent 
                errormsg={this.props.errors.errorMessage} 
                popup={true} 
                show={this.state.showError} 
                closeError={this.closeError} />
            </div>
          </div>
        </td>
      </tr>
    );
  }
}

VendorList.propTypes = {
  toggleBlockVendor: PropTypes.func.isRequired,
  deleteVendor: PropTypes.func.isRequired
};

const mapStateToProps = state => ({
  errors: state.errors
});

export default connect(
  mapStateToProps,
  { toggleBlockVendor, deleteVendor }
)(VendorList);