import React, { Component } from 'react';
import { BrowserRouter } from 'react-router-dom';
import Navbar from './components/layout/Navbar';
import { connect } from 'react-redux';
import Routes from './Routes';
class App extends Component {
  render() {
    return (
      <BrowserRouter>
        <div className="App h-100">
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
  userType: state.user.userType
});
export default connect(mapStateToProps)(App);
