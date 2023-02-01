import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Container, Form, Button, Alert } from "react-bootstrap";
import { useMutation } from "@apollo/client";
import { ADD_ANNOUNCEMENT } from "../graphql/mutations";

import { QUERY_ANNOUNCEMENTS, QUERY_USER } from "../graphql/queries";

import Auth from "../context/auth";

function AddAnounce() {
  const [announcementTitle, setAnnouncementTitle] = useState("");
  const [announcementBody, setAnnouncementBody] = useState("");

  const navigate = useNavigate();

  const [addAnnouncement] = useMutation(ADD_ANNOUNCEMENT, {
    update(cache, { data: { addAnnouncement } }) {
      try {
        const { getUsers } = cache.readQuery({ query: QUERY_USER });
        cache.writeQuery({
          query: QUERY_USER,
          data: {
            getUsers: {
              ...getUsers,
              announcements: [...getUsers?.announcements, addAnnouncement],
            },
          },
        });
      } catch (e) {
        console.warn(e);
      }

      const { getAnnouncements } = cache.readQuery({
        query: QUERY_ANNOUNCEMENTS,
      });
      cache.writeQuery({
        query: QUERY_ANNOUNCEMENTS,
        data: { getAnnouncements: [addAnnouncement, ...getAnnouncements] },
      });
    },
  });

  const fileSelected = (event) => {
    console.log(event.target.files[0]);
  };

  const handleAnnouncementSubmit = async (event) => {
    event.preventDefault();

    try {
      await addAnnouncement({
        variables: {
          announcementTitle,
          announcementBody,
        },
      });

      // clear form value
      setAnnouncementBody("");
      setAnnouncementTitle("");
      navigate("/admin");
      window.location.reload();
    } catch (e) {
      console.error(e);
    }
  };

  return (
    <div>
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
                  name="announcementTitle"
                  onChange={(e) => setAnnouncementTitle(e.target.value)}
                />
              </Form.Group>
              <Form.Group className="mb-3" controlId="announcementContent">
                <Form.Label>Content</Form.Label>
                <Form.Control
                  as="textarea"
                  rows={3}
                  name="announcementBody"
                  onChange={(e) => setAnnouncementBody(e.target.value)}
                />
              </Form.Group>
              <Form.Group className="mb-3" controlId="announcementImage">
                <Form.Label>Add Image</Form.Label>
                <Form.Control type="file" multiple onChange={fileSelected} />
              </Form.Group>
              <Button
                onClick={handleAnnouncementSubmit}
                type="submit"
                variant="success"
              >
                Add Announcement
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

export default AddAnounce;
