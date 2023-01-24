import React, { useState } from "react";
import { Container, Form, Button, Alert } from "react-bootstrap";
import { useMutation } from "@apollo/client";
import { ADD_PLAYERS } from "../graphql/mutations";

import { QUERY_USER, QUERY_PLAYERS } from "../graphql/queries";

import Auth from "../context/auth";

function AddMember() {
  const [valueFields, setValueFields] = useState({
    firstName: "",
    lastName: "",
    playerPosition: "",
    playerNumber: 0,
  });

  const [addPlayer] = useMutation(ADD_PLAYERS, {
    update(cache, { data: { addPlayer } }) {
      try {
        const { getUsers } = cache.readQuery({ query: QUERY_USER });
        cache.writeQuery({
          query: QUERY_USER,
          data: {
            getUsers: {
              ...getUsers,
              createdTeamMembers: [...getUsers.createdTeamMembers, addPlayer],
            },
          },
        });
      } catch (e) {
        console.warn(e);
      }

      const { getPlayers } = cache.readQuery({ query: QUERY_PLAYERS });
      cache.writeQuery({
        query: QUERY_PLAYERS,
        data: { getPlayers: [addPlayer, ...createTeamMembers] },
      });
    },
  });

  const handleChange = (event) => {
    const { name, value } = event.target;

    setValueFields({
      ...valueFields,
      [name]: value,
    });
  };

  const handleMemberSubmit = async (event) => {
    event.preventDefault();
    try {
      await addPlayer({
        variables: { ...valueFields },
      });

      // clear form value
      setValueFields({
        firstName: "",
        lastName: "",
        playerPosition: "",
        playerNumber: 0,
      });
    } catch (e) {
      console.error(e);
    }
  };

  return (
    <div style={{ backgroundColor: "rgba(255,255,255,0.9)", height: "100%" }}>
      {Auth.loggedIn() ? (
        <Container>
          <>
            <h2>Add New Teammember</h2>
            <Form>
              <Form.Group className="mb-3" controlId="teamMemberFirstName">
                <Form.Label>First Name</Form.Label>
                <Form.Control
                  type="text"
                  placeholder="First Name"
                  name="firstName"
                  onChange={handleChange}
                />
              </Form.Group>
              <Form.Group className="mb-3" controlId="teamMemberLastName">
                <Form.Label>Last Name</Form.Label>
                <Form.Control
                  type="text"
                  placeholder="Last Name"
                  name="lastName"
                  onChange={handleChange}
                />
              </Form.Group>
              <Form.Group className="mb-3" controlId="teamMemberPosition">
                <Form.Label>Position</Form.Label>
                <Form.Control
                  type="text"
                  placeholder="Player Position"
                  name="playerPosition"
                  onChange={handleChange}
                />
              </Form.Group>
              <Form.Group className="mb-3" controlId="teamMemberNumber">
                <Form.Label>Player Number</Form.Label>
                <Form.Control
                  type="number"
                  placeholder="Player Number"
                  name="playerNumber"
                  onChange={handleChange}
                />
              </Form.Group>
              <Button
                onClick={handleMemberSubmit}
                type="submit"
                variant="success"
              >
                Add Team Member
              </Button>
            </Form>
          </>
        </Container>
      ) : (
        <div>
          <Alert variant="danger">You must be an Admin to access this!</Alert>
        </div>
      )}
    </div>
  );
}

export default AddMember;
