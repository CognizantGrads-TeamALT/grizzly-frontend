import React, { Component } from "react";
import spinner from "./spinner.svg";

class Spinner extends Component {
  constructor(props) {
    super(props);

    this.state = {
      size: this.props.size || '50px'
    }
  }

  render() {
    return <img src={spinner} alt="Loading..." width={this.state.size} />;
  }
}

export default Spinner;