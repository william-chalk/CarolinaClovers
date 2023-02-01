import React from "react";
import { Link } from "react-router-dom";
import carolinaClovers from "../../assets/Website Photos/carolinaClovers.png"

function Header() {
  return (
    <div>
      <Link className="headerStyle" to="/">
        <img src={carolinaClovers} style={{height:"12vh",width:"20vh"}}/>
      </Link>
    </div>
  );
}

export default Header;
