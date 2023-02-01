import React from "react";
import { Link } from "react-router-dom";
import { Container, Button, Alert } from "react-bootstrap";

import Auth from "../context/auth";

function Admin() {
  return (
    <div>
      {Auth.loggedIn() ? (
        <Container>
          <div>
          <Button variant="success">
            <Link to="/admin/add-announcement">Add Announcement</Link>
          </Button>
          <Button variant="success">
            <Link to="/admin/add-upcoming">Add Upcoming Event</Link>
          </Button>
          <Button variant="success">
            <Link to="/admin/add-league">Add League</Link>
          </Button>
          <Button variant="success">
            <Link to="/admin/add-member">Add Team Members</Link>
          </Button>
          </div>
          <h3>
          Welcome to the Admin Panel
          </h3>
        </Container>
      ) : (
        <div>
          <Alert variant="danger">You must be an Admin to access this!</Alert>
        </div>
      )}
    </div>
  );
}

export default Admin;
