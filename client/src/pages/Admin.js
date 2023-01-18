import React from "react";
import Container from "react-bootstrap/Container";
import Form from "react-bootstrap/Form";
import { Link } from "react-router-dom";


import Auth from "../context/auth";

function Admin(){

    return(
        <div>
            <Container>
                <>
                <h2>Add Announcement</h2>
                <Form>
                    <Form.Group className="mb-3" controlId="announcementTitle">
                        <Form.Label>Title</Form.Label>
                        <Form.Control type="text" placeholder="Title"/>
                    </Form.Group>
                    <Form.Group className="mb-3" controlId="announcementContent">
                        <Form.Label>Content</Form.Label>
                        <Form.Control as="textarea" rows={3}/>
                    </Form.Group>
                    <Form.Group className="mb-3" controlId="announcementImage">
                        <Form.Label>Add Image</Form.Label>
                        <Form.Control type="file" multiple/>
                    </Form.Group>
                    <button type="submit" className="btn" >Add Announcement</button>
                </Form>
                </>
                <>
                <h2>Add League</h2>
                <Form>
                    <Form.Group className="mb-3" controlId="leagueName">
                        <Form.Label>League Name</Form.Label>
                        <Form.Control type="text" placeholder="League Name"/>
                    </Form.Group>
                    <button type="submit" className="btn">Add League</button>
                </Form>
                </>
                <>
                <h2>Add New Teammember</h2>
                <Form>
                    <Form.Group className="mb-3" controlId="teamMemberFirstName">
                        <Form.Label>First Name</Form.Label>
                        <Form.Control type="text" placeholder="First Name"/>
                    </Form.Group>
                    <Form.Group className="mb-3" controlId="teamMemberLastName">
                        <Form.Label>Last Name</Form.Label>
                        <Form.Control type="text" placeholder="Last Name"/>
                    </Form.Group>
                    <Form.Group className="mb-3" controlId="teamMemberPosition">
                        <Form.Label>Position</Form.Label>
                        <Form.Control type="text" placeholder="Player Position"/>
                    </Form.Group>
                    <Form.Group className="mb-3" controlId="teamMemberNumber">
                        <Form.Label>Player Number</Form.Label>
                        <Form.Control type="number" placeholder="Player Number"/>
                    </Form.Group>
                </Form>
                </>
            </Container>
        </div>
    )
}

export default Admin;