import React from "react";
import { Link } from "react-router-dom";

function NotFound() {
  return (
    <div>
      <h3>Oops looks like that page is out of bounds!</h3>
      <p>
        All good though before freaking out let me assist you you can click{" "}
        <Link to="/">here</Link> to get to home plate!
      </p>
    </div>
  );
}

export default NotFound;
