//About us
//Parent/Coach Resources
//Team Pages
//Tournament Sites
//FanZone Store
//Schedules
//Donate
//Sponser

import React from "react";
import Dropdown from "react-bootstrap/Dropdown";
import { Link } from "react-router-dom";

import Auth from "../../context/auth";

function MainNav() {
  const logout = (event) => {
    event.preventDefault();
    Auth.logout();
  };

  return (
    <header>
      <nav className="navbar">
        <>
          <Dropdown>
            <Dropdown.Toggle variant="success" id="dropdown-basic">
              About Us
            </Dropdown.Toggle>

            <Dropdown.Menu>
              <Dropdown.Item>
                <Link to="/our-vision">Our Vision</Link>
              </Dropdown.Item>
              <Dropdown.Item>
                <Link to="/our-purpose">Our Purpose</Link>
              </Dropdown.Item>
              <Dropdown.Item>
                <Link to="/message-to-parents">Message To Our Parents</Link>
              </Dropdown.Item>
              <Dropdown.Item>
                <Link to="/saftey">Our Saftey Policy</Link>
              </Dropdown.Item>
              <Dropdown.Item>
                <Link to="/contact-us">Contact Us</Link>
              </Dropdown.Item>
            </Dropdown.Menu>
          </Dropdown>
        </>
        <>
          <Dropdown>
            <Dropdown.Toggle variant="success" id="dropdown-basic">
              Team Pages
            </Dropdown.Toggle>

            <Dropdown.Menu>
              <Dropdown.Item>
                <Link to="/head-coaches">Our Head Coaches</Link>
              </Dropdown.Item>
              <Dropdown.Item>
                <Link to="/leagues">Our Leagues</Link>
              </Dropdown.Item>
            </Dropdown.Menu>
          </Dropdown>
        </>
        <>
          <Dropdown>
            <Dropdown.Toggle variant="success" id="dropdown-basic">
              Schedules
            </Dropdown.Toggle>

            <Dropdown.Menu></Dropdown.Menu>
          </Dropdown>
        </>
      </nav>
    </header>
  );
}

export default MainNav;
