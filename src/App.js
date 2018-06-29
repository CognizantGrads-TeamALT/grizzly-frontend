import React, { Component } from 'react';
import { BrowserRouter } from 'react-router-dom';
import Navbar from './components/layout/Navbar';
import { connect } from 'react-redux';
import Routes from './Routes';
import toastr from './toastr/toast';
import isEmpty from './validation/is-empty';
class App extends Component {
  render() {
    return (
      <BrowserRouter>
        <div className="App h-100">
          {!isEmpty(this.props.errors) &&
            this.props.errors.message !== 'No message available' &&
            toastr.warning(this.props.errors.message)}
          <Navbar />
          <div className="griz-real-body griz-portal-parent h-100 surround-parent">
            <Routes />
          </div>
        </div>
      </BrowserRouter>
    );
  }
}
const mapStateToProps = state => ({
  userType: state.user.userType,
  errors: state.errors
});
export default connect(mapStateToProps)(App);
