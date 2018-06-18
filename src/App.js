import React, { Component } from 'react';
import { BrowserRouter } from 'react-router-dom';
import Navbar from './components/layout/Navbar';
import Footer from './components/layout/Footer';
import { connect } from 'react-redux';
import Routes from './Routes';
class App extends Component {
  render() {
    return (
      <BrowserRouter>
        <div className="App">
          <Navbar />
          <div className="container">
            <Routes />
          </div>
          <Footer />
        </div>
      </BrowserRouter>
    );
  }
}
const mapStateToProps = state => ({
  userType: state.user.userType
});
export default connect(mapStateToProps)(App);
