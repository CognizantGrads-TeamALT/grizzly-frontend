import React, { Component } from "react";

class Footer extends Component {
  render() {
    return (
      <footer className="mt-5 p-4 text-center">
        Copyright &copy; {new Date().getFullYear()} Grizzly
      </footer>
    );
  }
}
export default Footer;
