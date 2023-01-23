import React from "react";
import { Link } from "react-router-dom";
import { Container, Button, Alert } from "react-bootstrap";

import Auth from "../context/auth";

function Admin() {
  return (
    <div style={{ backgroundColor: "rgba(255,255,255,0.9)", height: "100%" }}>
      {Auth.loggedIn() ? (
        <Container>
          <Button variant="success">
            <Link to="/admin/add-announcement">Add Announcement</Link>
          </Button>
          <Button variant="success">
            <Link to="/admin/add-league">Add League</Link>
          </Button>
          <Button variant="success">
            <Link to="/admin/add-member">Add Team Members</Link>
          </Button>
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
