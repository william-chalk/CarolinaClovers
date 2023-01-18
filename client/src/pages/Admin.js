import React, { useState } from "react";
import {Container,Form,Button} from "react-bootstrap";
import { useMutation } from "@apollo/client";
import { ADD_ANNOUNCEMENT,ADD_LEAGUE,ADD_PLAYERS } from "../graphql/mutations";

import Auth from "../context/auth";

function Admin(){

    const [formState,setFormState] = useState({title:"",content:"",leagueName:"",firstname:"",lastname:"",playerPosition:"",playerNumber:""});
    const [addAnnouncement] = useMutation(ADD_ANNOUNCEMENT);
    const [addLeague] = useMutation(ADD_LEAGUE);
    const [addPlayer] = useMutation(ADD_PLAYERS);

    const handleChange=(event)=>{
        const {name,value} = event.target;

        setFormState({
            ...formState,
            [name]:value,
        });
    };



    return(
        <div>
            {Auth.loggedIn() ? (
            <Container>
                <>
                <h2>Add Announcement</h2>
                <Form>
                    <Form.Group className="mb-3" controlId="announcementTitle">
                        <Form.Label>Title</Form.Label>
                        <Form.Control type="text" placeholder="Title" name="title" onChange={handleChange}/>
                    </Form.Group>
                    <Form.Group className="mb-3" controlId="announcementContent">
                        <Form.Label>Content</Form.Label>
                        <Form.Control as="textarea" rows={3} name="content" onChange={handleChange}/>
                    </Form.Group>
                    <Form.Group className="mb-3" controlId="announcementImage">
                        <Form.Label>Add Image</Form.Label>
                        <Form.Control type="file" multiple/>
                    </Form.Group>
                    <Button type="submit" variant="success" >Add Announcement</Button>
                </Form>
                </>
                <>
                <h2>Add League</h2>
                <Form>
                    <Form.Group className="mb-3" controlId="leagueName">
                        <Form.Label>League Name</Form.Label>
                        <Form.Control type="text" placeholder="League Name" name="leagueName" onChange={handleChange}/>
                    </Form.Group>
                    <Button type="submit" variant="success">Add League</Button>
                </Form>
                </>
                <>
                <h2>Add New Teammember</h2>
                <Form>
                    <Form.Group className="mb-3" controlId="teamMemberFirstName">
                        <Form.Label>First Name</Form.Label>
                        <Form.Control type="text" placeholder="First Name" name="firstname" onChange={handleChange}/>
                    </Form.Group>
                    <Form.Group className="mb-3" controlId="teamMemberLastName">
                        <Form.Label>Last Name</Form.Label>
                        <Form.Control type="text" placeholder="Last Name" name="lastname" onChange={handleChange}/>
                    </Form.Group>
                    <Form.Group className="mb-3" controlId="teamMemberPosition">
                        <Form.Label>Position</Form.Label>
                        <Form.Control type="text" placeholder="Player Position" name="playerPosition" onChange={handleChange}/>
                    </Form.Group>
                    <Form.Group className="mb-3" controlId="teamMemberNumber">
                        <Form.Label>Player Number</Form.Label>
                        <Form.Control type="number" placeholder="Player Number" name="playerNumber" onChange={handleChange}/>
                    </Form.Group>
                </Form>
                </>
            </Container>
            ) : (
                <div>
                    You need Admin access to view this page!
                </div>
            )}
        </div>
    )
}

export default Admin;