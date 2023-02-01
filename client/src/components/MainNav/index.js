//About us
//Parent/Coach Resources
//Team Pages
//Tournament Sites
//FanZone Store
//Schedules
//Donate
//Sponser

import React from "react";
import {Dropdown,Button, Container} from "react-bootstrap";
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
                <Dropdown.Item style={{padding:"5px"}}>
                <Link to="/message-to-parents">Message To Our Parents</Link>
                </Dropdown.Item>
                <Dropdown.Item style={{padding:"5px"}}>
                <Link to="/saftey">Saftey Policy</Link>
                </Dropdown.Item>
                <Dropdown.Item style={{padding:"5px"}}>
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
                <Link to="/head-coaches">Head Coaches</Link>
                </Dropdown.Item>
                <Dropdown.Item>
                <Link to="/teams">Our Teams</Link>
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
        <>
        <Dropdown>
            <Dropdown.Toggle variant="success" id="dropdown-basic">
              Show Support
            </Dropdown.Toggle>
            <Dropdown.Menu>
            <Dropdown.Item>
            <Link to="/sponsor">Sponsor</Link>
            </Dropdown.Item>
            <Dropdown.Item>
            <Link to="/donate">Donate</Link>
            </Dropdown.Item>
            </Dropdown.Menu>
          </Dropdown>
        </>
        {Auth.loggedIn()?(
          <>
            <Button onClick={logout} variant="success" style={{marginRight:"20px"}}>
              <Link to="/">Logout</Link>
            </Button>
          </>
        ):(
          <>
          <>
          <Button variant="success">
          <Link to="/login">Login</Link>
          </Button>
          </>
          <>
          <Button variant="success">
          <Link to="/signup">Signup</Link>
          </Button>
          </>
          </>
        )}
      </nav>
    </header>
  );
}

export default MainNav;
