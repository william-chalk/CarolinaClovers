//About us
//Parent/Coach Resources
//Team Pages
//Tournament Sites
//FanZone Store
//Schedules
//Donate
//Sponser

import React from "react";
import {Dropdown,Button} from "react-bootstrap";
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
            <Dropdown.Toggle style={{color:"gold"}} variant="success" id="dropdown-basic">
              About Us
            </Dropdown.Toggle>

            <Dropdown.Menu>
              <Dropdown.Item>
                <Link style={{textDecoration:"none",color:"green",fontWeight:"800",WebkitTextStroke:"1.2px black",letterSpacing:"2px"}} to="/our-vision">Our Vision</Link>
              </Dropdown.Item>
              <Dropdown.Item>
                <Link style={{textDecoration:"none",color:"green",fontWeight:"800",WebkitTextStroke:"1.2px black",letterSpacing:"2px"}} to="/our-purpose">Our Purpose</Link>
              </Dropdown.Item>
              <Dropdown.Item>
                <Link style={{textDecoration:"none",color:"green",fontWeight:"800",WebkitTextStroke:"1.2px black",letterSpacing:"2px"}} to="/message-to-parents">Message To Our Parents</Link>
              </Dropdown.Item>
              <Dropdown.Item>
                <Link style={{textDecoration:"none",color:"green",fontWeight:"800",WebkitTextStroke:"1.2px black",letterSpacing:"2px"}} to="/saftey">Our Saftey Policy</Link>
              </Dropdown.Item>
              <Dropdown.Item>
                <Link style={{textDecoration:"none",color:"green",fontWeight:"800",WebkitTextStroke:"1.2px black",letterSpacing:"2px"}} to="/contact-us">Contact Us</Link>
              </Dropdown.Item>
            </Dropdown.Menu>
          </Dropdown>
        </>
        <>
          <Dropdown>
            <Dropdown.Toggle style={{color:"gold"}} variant="success" id="dropdown-basic">
              Team Pages
            </Dropdown.Toggle>

            <Dropdown.Menu>
              <Dropdown.Item>
                <Link style={{textDecoration:"none",color:"green",fontWeight:"800",WebkitTextStroke:"1.2px black",letterSpacing:"2px"}} to="/head-coaches">Our Head Coaches</Link>
              </Dropdown.Item>
              <Dropdown.Item>
                <Link style={{textDecoration:"none",color:"green",fontWeight:"800",WebkitTextStroke:"1.2px black",letterSpacing:"2px"}} to="/leagues">Our Leagues</Link>
              </Dropdown.Item>
            </Dropdown.Menu>
          </Dropdown>
        </>
        <>
          <Dropdown>
            <Dropdown.Toggle style={{color:"gold"}} variant="success" id="dropdown-basic">
              Schedules
            </Dropdown.Toggle>

            <Dropdown.Menu></Dropdown.Menu>
          </Dropdown>
        </>
        {Auth.loggedIn()?(
          <>
            <Button onClick={logout} variant="success">
              <Link style={{color:"gold",textDecoration:"none"}} to="/">Logout</Link>
            </Button>
          </>
        ):(
          <>
          <>
          <Button variant="success">
          <Link style={{color:"gold",textDecoration:"none"}} to="/login">Login</Link>
          </Button>
          </>
          <>
          <Button variant="success">
          <Link style={{color:"gold",textDecoration:"none"}} to="/signup">Signup</Link>
          </Button>
          </>
          </>
        )}
      </nav>
    </header>
  );
}

export default MainNav;
