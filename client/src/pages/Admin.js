import React, { useState } from "react";
import { Container, Form, Button,Alert } from "react-bootstrap";
import { useMutation } from "@apollo/client";
import {
  ADD_ANNOUNCEMENT,
  ADD_LEAGUE,
  ADD_PLAYERS,
} from "../graphql/mutations";

import {QUERY_ANNOUNCEMENTS, QUERY_USER,QUERY_LEAGUES,QUERY_PLAYERS} from "../graphql/queries";

import Auth from "../context/auth";

function Admin() {
  const [formState, setFormState] = useState({
    title: "",
    content: "",
    leagueName: "",
    firstname: "",
    lastname: "",
    playerPosition: "",
    playerNumber: "",
  });
  const [addAnnouncement] = useMutation(ADD_ANNOUNCEMENT,{
    update(cache,{data:{addAnnouncement}}){
      try{
        const {user} = cache.readQuery({query: QUERY_USER});
        cache.writeQuery({
          query:QUERY_USER,
          data:{user:{...user,announcements:[...user.announcements,addAnnouncement]}},
        });
      }
      catch(e){
        console.warn(e);
      }

      const {announcements} = cache.readQuery({query:QUERY_ANNOUNCEMENTS});
      cache.writeQuery({
        query:QUERY_ANNOUNCEMENTS,
        data:{announcements:[addAnnouncement,...announcements]}
      });
    }
  });
  const [addLeague] = useMutation(ADD_LEAGUE,{
    update(cache,{data:{addLeague}}){
      try{
        const {user} = cache.readQuery({query: QUERY_USER});
        cache.writeQuery({
          query:QUERY_USER,
          data:{user:{...user,createdLeagues:[...user.createdLeagues,addLeague]}},
        });
      }
      catch(e){
        console.warn(e);
      }

      const {createdLeagues} = cache.readQuery({query:QUERY_ANNOUNCEMENTS});
      cache.writeQuery({
        query:QUERY_LEAGUES,
        data:{createdLeagues:[addLeague,...createdLeagues]}
      });
    }
  });
  const [addPlayer] = useMutation(ADD_PLAYERS,{
    update(cache,{data:{addPlayer}}){
      try{
        const {user} = cache.readQuery({query: QUERY_USER});
        cache.writeQuery({
          query:QUERY_USER,
          data:{user:{...user,createdTeamMembers:[...user.createdTeamMembers,addPlayer]}},
        });
      }
      catch(e){
        console.warn(e);
      }

      const {createdTeamMembers} = cache.readQuery({query:QUERY_PLAYERS});
      cache.writeQuery({
        query:QUERY_PLAYERS,
        data:{createdTeamMembers:[addPlayer,...createdTeamMembers]}
      });
    }
  });

  const handleChange = (event) => {
    const { name, value } = event.target;

    setFormState({
      ...formState,
      [name]: value,
    });

  };

  const handleAnnouncementSubmit = async(event)=>{
    event.preventDefault();

    try {
      await addAnnouncement({
        variables: {...formState,[event.target.name]:event.target.value},
      });

      // clear form value
      setFormState("");
    } catch (e) {
      console.error(e);
    }
  }

  const handleLeagueSubmit = async(event)=>{
    event.preventDefault();

    try {
      await addLeague({
        variables: {...formState,[event.target.name]:event.target.value},
      });

      // clear form value
      setFormState("");
    } catch (e) {
      console.error(e);
    }
  }

  const handleMemberSubmit = async(event)=>{
    event.preventDefault();

    try {
      await addPlayer({
        variables: {...formState,[event.target.name]:event.target.value},
      });

      // clear form value
      setFormState("");
    } catch (e) {
      console.error(e);
    }
  }

  return (
    <div style={{backgroundColor:"rgba(255,255,255,0.9)",height:"100%"}}>
      {Auth.loggedIn() ? (
                <Container>
                <>
                  <h1>Welcome to the Admin Panel</h1>
                  <h2>Add Announcement</h2>
                  <Form>
                    <Form.Group className="mb-3" controlId="announcementTitle">
                      <Form.Label>Title</Form.Label>
                      <Form.Control
                        type="text"
                        placeholder="Title"
                        name="title"
                        onChange={handleChange}
                      />
                    </Form.Group>
                    <Form.Group className="mb-3" controlId="announcementContent">
                      <Form.Label>Content</Form.Label>
                      <Form.Control
                        as="textarea"
                        rows={3}
                        name="content"
                        onChange={handleChange}
                      />
                    </Form.Group>
                    <Form.Group className="mb-3" controlId="announcementImage">
                      <Form.Label>Add Image</Form.Label>
                      <Form.Control type="file" multiple />
                    </Form.Group>
                    <Button onClick={handleAnnouncementSubmit} type="submit" variant="success">
                      Add Announcement
                    </Button>
                  </Form>
                </>
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
                    <Button onClick={handleLeagueSubmit} type="submit" variant="success">
                      Add League
                    </Button>
                  </Form>
                </>
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
                    <Button onClick={handleMemberSubmit} type="submit" variant="success">
                      Add Team Member
                    </Button>
                  </Form>
                </>
              </Container>
      ):(
        <div>
          <Alert variant="danger">You must be an Admin to access this!</Alert>
          </div>
      )}

    </div>
  );
}

export default Admin;
