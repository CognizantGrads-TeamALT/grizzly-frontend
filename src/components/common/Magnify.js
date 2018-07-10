import React, { Component } from 'react';
import magnify from './magnify.svg';

class Magnify extends Component {
  constructor(props) {
    super(props);

    this.state = {
      size: this.props.size || '50px'
    };
  }

  render() {
    return <img src={magnify} alt="Searching..." width={this.state.size} />;
  }
}

export default Magnify;
