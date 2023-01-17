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
            <Dropdown.Item href="#/action-1">Action</Dropdown.Item>
            <Dropdown.Item href="#/action-2">Another action</Dropdown.Item>
            <Dropdown.Item href="#/action-3">Something else</Dropdown.Item>
          </Dropdown.Menu>
        </Dropdown>
        </>
      </nav>
    </header>
  );
}

export default MainNav;
