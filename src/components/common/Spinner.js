import React from "react";
import spinner from "./spinner.svg";

export default () => {
  return (
    <img
      src={spinner}
      alt="Loading..."
      style={{ width: "50px", margin: "auto", display: "block" }}
    />
  );
};
