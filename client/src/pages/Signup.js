import React, { useState } from "react";
import { useMutation } from "@apollo/client";
import { useNavigate } from "react-router-dom";
import { Form, Button, Alert } from "react-bootstrap";
import { CREATE_USER } from "../graphql/mutations";

import Auth from "../context/auth";

const Signup = () => {
  const [formState, setFormState] = useState({
    username: "",
    email: "",
    password: "",
  });
  const [addUser, { error }] = useMutation(CREATE_USER);
  const navigate = useNavigate();
  // update state based on form input changes
  const handleChange = (event) => {
    const { name, value } = event.target;

    setFormState({
      ...formState,
      [name]: value,
    });
  };

  // submit form
  const handleFormSubmit = async (event) => {
    event.preventDefault();

    try {
      const { data } = await addUser({
        variables: { ...formState },
      });

      Auth.login(data.createUser.token);
      navigate("/");
      window.location.reload();
    } catch (e) {
      console.error(e);
    }
  };

  return (
    <main className="form-log mb-4">
      <div className="col-12 col-md-6">
        <div className="card">
          <h4 className="card-header">Sign Up</h4>
          <div className="card-body">
            <Form onSubmit={handleFormSubmit}>
              <Form.Control
                className="form-input"
                placeholder="Your username"
                name="username"
                type="username"
                id="username"
                value={formState.username}
                onChange={handleChange}
              />
              <Form.Control
                className="form-input"
                placeholder="Your email"
                name="email"
                type="email"
                id="email"
                value={formState.email}
                onChange={handleChange}
              />
              <Form.Control
                className="form-input"
                placeholder="******"
                name="password"
                type="password"
                id="password"
                value={formState.password}
                onChange={handleChange}
              />
              <Button
                variant="success"
                className="btn d-block w-100"
                type="submit"
              >
                Sign Up
              </Button>
            </Form>

            {error && <Alert variant="danger">Signup failed</Alert>}
          </div>
        </div>
      </div>
    </main>
  );
};

export default Signup;
