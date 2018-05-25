import React from "react";
import loading from "./loading.svg";

export default () => {
  return (
    <div>
      <img
        src={loading}
        alt="Loading..."
        style={{ width: "200px", margin: "auto", display: "block" }}
      />
    </div>
  );
};
