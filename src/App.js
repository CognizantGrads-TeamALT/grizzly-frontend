import React, { Component } from 'react';
import { BrowserRouter } from 'react-router-dom';
import './App.css';
import Navbar from './components/layout/Navbar';
import { connect } from 'react-redux';
import Routes from './Routes';
import { ToastContainer, Flip } from 'react-toastify';
class App extends Component {
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
  role: state.user.role,
  errors: state.errors
});
export default connect(mapStateToProps)(App);
