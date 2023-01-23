import React from "react";
import { Container, Button, Alert } from "react-bootstrap";

import Auth from "../context/auth";

function Admin() {
  return (
    <div style={{ backgroundColor: "rgba(255,255,255,0.9)", height: "100%" }}>
      {Auth.loggedIn() ? (
        <Container></Container>
      ) : (
        <div>
          <Alert variant="danger">You must be an Admin to access this!</Alert>
        </div>
      )}
    </div>
  );
}

export default Admin;
