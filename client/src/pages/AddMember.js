import React, { useState } from "react";
import { Container, Form, Button, Alert } from "react-bootstrap";
import { useMutation } from "@apollo/client";
import { ADD_PLAYERS } from "../graphql/mutations";

import { QUERY_USER, QUERY_PLAYERS } from "../graphql/queries";

import Auth from "../context/auth";

function AddMember() {
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [playerPosition, setPlayerPosition] = useState("");
  const [playerNumber, setPlayerNumber] = useState(0);

  const [addPlayer] = useMutation(ADD_PLAYERS, {
    update(cache, { data: { addPlayer } }) {
      try {
        const { user } = cache.readQuery({ query: QUERY_USER });
        cache.writeQuery({
          query: QUERY_USER,
          data: {
            user: {
              ...user,
              createdTeamMembers: [...user.createdTeamMembers, addPlayer],
            },
          },
        });
      } catch (e) {
        console.warn(e);
      }

      const { createdTeamMembers } = cache.readQuery({ query: QUERY_PLAYERS });
      cache.writeQuery({
        query: QUERY_PLAYERS,
        data: { createdTeamMembers: [addPlayer, ...createdTeamMembers] },
      });
    },
  });

  const handleChange = (event) => {
    setFirstName(event.target.value);
    setLastName(event.target.value);
    setPlayerPosition(event.target.value);
    setPlayerNumber(event.target.value);
  };

  const handleMemberSubmit = async (event) => {
    event.preventDefault();
    console.log(firstName);
    // console.log(lastName);
    // console.log(playerPosition);
    // console.log(playerNumber);
    try {
      await addPlayer({
        variables: {
          firstName,
          lastName,
          playerPosition,
          playerNumber,
        },
      });

      // clear form value
      setFirstName("");
      setLastName("");
      setPlayerPosition("");
      setPlayerNumber("");
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
                  name="firstname"
                  onChange={handleChange}
                />
              </Form.Group>
              <Form.Group className="mb-3" controlId="teamMemberLastName">
                <Form.Label>Last Name</Form.Label>
                <Form.Control
                  type="text"
                  placeholder="Last Name"
                  name="lastname"
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
