import React from "react";
import ReactDOM from "react-dom";
import "./index.css";
import "../node_modules/react-fontawesome";
import "../node_modules/bootstrap/dist/css/bootstrap.min.css";
import "../node_modules/jquery/dist/jquery.slim.min.js";
import "../node_modules/popper.js/dist/umd/popper.js";
import "../node_modules/bootstrap/dist/js/bootstrap.min.js";
import App from "./App";
import registerServiceWorker from "./registerServiceWorker";

ReactDOM.render(<App />, document.getElementById("root"));
registerServiceWorker();
