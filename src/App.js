import React, { Component } from 'react';
import { BrowserRouter } from 'react-router-dom';
import Navbar from './components/layout/Navbar';
import { connect } from 'react-redux';
import Routes from './Routes';
import { ToastContainer, Flip, toast } from 'react-toastify';
import isEmpty from './validation/is-empty';
class App extends Component {
  toastId = null;

  notify() {
    if (!toast.isActive(this.toastId) && this.props.errors.message !== undefined) {
      this.toastId = toast.info(this.props.errors.message);
    }
  }

  render() {
    return (
      <BrowserRouter>
        <div className="App h-100">
          <ToastContainer
            className="toast"
            position="top-center"
            autoClose={4000}
            hideProgressBar
            newestOnTop
            closeOnClick
            rtl={false}
            pauseOnVisibilityChange
            draggable
            transition={Flip}
            pauseOnHover={false}
          />
          {!isEmpty(this.props.errors) &&
            this.props.errors.message !== 'No message available' &&
            this.notify()}
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
