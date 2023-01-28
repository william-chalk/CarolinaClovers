import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Container, Form, Button, Alert } from "react-bootstrap";
import { useMutation } from "@apollo/client";
import { ADD_LEAGUE } from "../graphql/mutations";

import { QUERY_USER, QUERY_LEAGUES } from "../graphql/queries";

import Auth from "../context/auth";

function AddLeague() {
  const [leagueName, setLeagueName] = useState("");
  const navigate = useNavigate();

  const [addLeague] = useMutation(ADD_LEAGUE, {
    update(cache, { data: { addLeague } }) {
      try {
        const { getUsers } = cache.readQuery({ query: QUERY_USER });
        cache.writeQuery({
          query: QUERY_USER,
          data: {
            getUsers: {
              ...getUsers,
              createdLeagues: [...getUsers?.createdLeagues, addLeague],
            },
          },
        });
      } catch (e) {
        console.warn(e);
      }

      const { getLeagues } = cache.readQuery({
        query: QUERY_LEAGUES,
      });
      cache.writeQuery({
        query: QUERY_LEAGUES,
        data: { getLeagues: [addLeague, ...getLeagues] },
      });
    },
  });

  const handleChange = (event) => {
    setLeagueName(event.target.value);
  };

  const handleLeagueSubmit = async (event) => {
    event.preventDefault();
    try {
      await addLeague({
        variables: {
          leagueName,
        },
      });

      // clear form value
      setLeagueName("");
      navigate("/admin");
      window.location.reload();
    } catch (e) {
      console.error(e);
    }
  };

  return (
    <div style={{ backgroundColor: "rgba(255,255,255,0.9)", height: "100%" }}>
      {Auth.loggedIn() ? (
        <Container>
          <>
            <h2>Add League</h2>
            <Form>
              <Form.Group className="mb-3" controlId="leagueName">
                <Form.Label>League Name</Form.Label>
                <Form.Control
                  type="text"
                  placeholder="League Name"
                  name="leagueName"
                  onChange={handleChange}
                />
              </Form.Group>
              <Button
                onClick={handleLeagueSubmit}
                type="submit"
                variant="success"
              >
                Add League
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

export default AddLeague;
