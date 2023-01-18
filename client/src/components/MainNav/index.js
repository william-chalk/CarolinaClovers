//About us
//Parent/Coach Resources
//Team Pages
//Tournament Sites
//FanZone Store
//Schedules
//Donate
//Sponser

import React from "react";
import Dropdown from 'react-bootstrap/Dropdown';
import { Link } from "react-router-dom";

import Auth from "../../context/auth";

function MainNav() {
  const logout = (event) => {
    event.preventDefault();
    Auth.logout();
  };

  return (
    <header>
      <nav>
        <div>
          <Link to="/">
            <h1>Carolina Clovers</h1>
          </Link>
        </div>
        <>
        <Dropdown>
          <Dropdown.Toggle variant="success" id="dropdown-basic">
            Dropdown Button
          </Dropdown.Toggle>

          <Dropdown.Menu>
            <Dropdown.Item><Link to="/sponsor">Sponsor</Link></Dropdown.Item>
            <Dropdown.Item><Link to="/our-purpose">Our Purpose</Link></Dropdown.Item>
            <Dropdown.Item><Link to="/message-to-parents">Message To Our Parents</Link></Dropdown.Item>
          </Dropdown.Menu>
        </Dropdown>
        </>
      </nav>
    </header>
  );
}

export default MainNav;
