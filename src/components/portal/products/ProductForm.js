// import React, { Component } from "react";
// import PropTypes from "prop-types";
// import { connect } from "react-redux";
// import { withRouter } from "react-router-dom";

// class ProductForm extends Component {
//     constructor(props) {
//       super(props);
//       this.state = {
//         modal: false,
//         vendorname: "",
//         website: "",
//         contactNumber: ""
//       };

//       this.onToggle = this.onToggle.bind(this);
//       this.onChange = this.onChange.bind(this);
//       this.onSubmit = this.onSubmit.bind(this);
//     }
  
//     onToggle() {
//       this.setState({
//         modal: !this.state.modal
//       });
//     }
  
//     onChange(e) {
//       this.setState({ [e.target.name]: e.target.value });
//     }