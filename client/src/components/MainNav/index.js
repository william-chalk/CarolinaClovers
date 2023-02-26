//About us
//Parent/Coach Resources
//Team Pages
//Tournament Sites
//FanZone Store
//Schedules
//Donate
//Sponser

import React from "react";
import {
  Dropdown,
  Button,
  Container,
  Nav,
  Navbar,
  NavDropdown,
  Offcanvas,
  Form,
} from "react-bootstrap";
import { Link } from "react-router-dom";

import Auth from "../../context/auth";

function MainNav() {
  const logout = (event) => {
    event.preventDefault();
    Auth.logout();
  };

  return (
    <>
      {[false].map((expand) => (
        <Navbar key={expand} bg="light" expand={expand} className="mb-3">
          <Container fluid>
            <Navbar.Toggle aria-controls={`offcanvasNavbar-expand-${expand}`} />
            <Navbar.Offcanvas
              id={`offcanvasNavbar-expand-${expand}`}
              aria-labelledby={`offcanvasNavbarLabel-expand-${expand}`}
              placement="start"
            >
              <Offcanvas.Header closeButton>
                <Offcanvas.Title id={`offcanvasNavbarLabel-expand-${expand}`}>
                  Menu
                </Offcanvas.Title>
              </Offcanvas.Header>
              <Offcanvas.Body>
                <Nav className="justify-content-end flex-grow-1 pe-3">
                  <Nav.Link href="/">Home</Nav.Link>
                  <NavDropdown
                    title="About Us"
                    id={`offcanvasNavbarDropdown-expand-${expand}`}
                  >
                    <NavDropdown.Item href="/our-vision">
                      Our Vision
                    </NavDropdown.Item>
                    <NavDropdown.Item href="/our-purpose">
                      Our Purpose
                    </NavDropdown.Item>
                    <NavDropdown.Item href="/message-to-parents">
                      Message To Our Parents
                    </NavDropdown.Item>
                    <NavDropdown.Item href="/saftey">
                      Saftey Policy
                    </NavDropdown.Item>
                    <NavDropdown.Item href="/contact-us">
                      Contact Us
                    </NavDropdown.Item>
                  </NavDropdown>
                  <NavDropdown
                    title="Team Pages"
                    id={`offcanvasNavbarDropdown-expand-${expand}`}
                  >
                    <NavDropdown.Item href="/head-coaches">
                      Head Coaches
                    </NavDropdown.Item>
                    <NavDropdown.Item href="/teams">Our Teams</NavDropdown.Item>
                  </NavDropdown>
                  <NavDropdown
                    title="Schedules"
                    id={`offcanvasNavbarDropdown-expand-${expand}`}
                  ></NavDropdown>
                  <NavDropdown
                    title="Show Support"
                    id={`offcanvasNavbarDropdown-expand-${expand}`}
                  >
                    <NavDropdown.Item href="/sponsor">Sponsor</NavDropdown.Item>
                    <NavDropdown.Item href="/donate">Donate</NavDropdown.Item>
                  </NavDropdown>
                </Nav>
              </Offcanvas.Body>
            </Navbar.Offcanvas>
          </Container>
        </Navbar>
      ))}
    </>
  );
}

export default MainNav;
