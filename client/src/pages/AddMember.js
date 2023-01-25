import React, { useState } from "react";
import { Container, Form, Button, Alert, Dropdown } from "react-bootstrap";
import { useMutation, useQuery } from "@apollo/client";
import { ADD_PLAYERS } from "../graphql/mutations";

import { QUERY_USER, QUERY_PLAYERS, QUERY_LEAGUES } from "../graphql/queries";

import Auth from "../context/auth";

function AddMember() {
  // const [valueFields, setValueFields] = useState({
  //   firstName: "",
  //   lastName: "",
  //   playerPosition: "",
  //   playerNumber: 0,
  // });

  const { loading, data } = useQuery(QUERY_LEAGUES);

  const listLeagues = data?.getLeagues || [];

  console.log(listLeagues);
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [playerPosition, setPlayerPosition] = useState("");
  const [playerNumber, setPlayerNumber] = useState("0");

  const [addPlayer] = useMutation(ADD_PLAYERS, {
    update(cache, { data: { addPlayer } }) {
      try {
        const { getUsers } = cache.readQuery({ query: QUERY_USER });
        cache.writeQuery({
          query: QUERY_USER,
          data: {
            createdTeamMembers: {
              ...getUsers,
              createdTeamMembers: [...getUsers?.createdTeamMembers, addPlayer],
            },
          },
        });
      } catch (e) {
        console.log("Caught here");
        console.warn(e);
      }

      // const { teamMembers } = cache.readQuery({ query: QUERY_PLAYERS });
      // cache.writeQuery({
      //   query: QUERY_PLAYERS,
      //   data: { teamMembers: [addPlayer, ...teamMembers] },
      // });
    },
  });

  const handleMemberSubmit = async (event) => {
    event.preventDefault();
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
    } catch (e) {
      console.log();
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
                  onChange={(e) => setFirstName(e.target.value)}
                />
              </Form.Group>
              <Form.Group className="mb-3" controlId="teamMemberLastName">
                <Form.Label>Last Name</Form.Label>
                <Form.Control
                  type="text"
                  placeholder="Last Name"
                  name="lastName"
                  onChange={(e) => setLastName(e.target.value)}
                />
              </Form.Group>
              <Form.Group className="mb-3" controlId="teamMemberPosition">
                <Form.Label>Position</Form.Label>
                <Form.Control
                  type="text"
                  placeholder="Player Position"
                  name="playerPosition"
                  onChange={(e) => setPlayerPosition(e.target.value)}
                />
              </Form.Group>
              <Form.Group className="mb-3" controlId="teamMemberNumber">
                <Form.Label>Player Number</Form.Label>
                <Form.Control
                  type="number"
                  placeholder="Player Number"
                  name="playerNumber"
                  onChange={(e) => setPlayerNumber(e.target.value)}
                />
              </Form.Group>
              <>
                <Form.Group className="mb-3" controlId="teamMemberLeague">
                  <Form.Label>Player League</Form.Label>
                  <select>
                    {listLeagues.map((leagues) => (
                      <>
                        <option value={leagues.leagueName}>
                          {leagues.leagueName}
                        </option>
                      </>
                    ))}
                  </select>
                </Form.Group>
              </>

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
