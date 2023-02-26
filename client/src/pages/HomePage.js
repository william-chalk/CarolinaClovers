//Welcome Page
//Announcements on right side
//Photos under announcements
//Carasol of images at top
//Registration button
//Upcoming events
//Document download links
import { useQuery } from "@apollo/client";
import React from "react";
import { Container, Carousel } from "react-bootstrap";
import { QUERY_ANNOUNCEMENTS } from "../graphql/queries";

function HomePage() {
  const { loading, data } = useQuery(QUERY_ANNOUNCEMENTS);

  const userAnnouncement = data?.getAnnouncements || [];

  console.log(data);
  return (
    <Container>
      <Carousel>
        <Carousel.Item>
          <img
            className="d-block w-100"
            src={require("../assets/Website Photos/carolinaClovers.png")}
            alt="First slide"
          />
          <Carousel.Caption>
            <h3>First slide label</h3>
            <p>Nulla vitae elit libero, a pharetra augue mollis interdum.</p>
          </Carousel.Caption>
        </Carousel.Item>
        <Carousel.Item>
          <img
            className="d-block w-100"
            src={require("../assets/Website Photos/carolinaClovers.png")}
            alt="Second slide"
          />

          <Carousel.Caption>
            <h3>Second slide label</h3>
            <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit.</p>
          </Carousel.Caption>
        </Carousel.Item>
        <Carousel.Item>
          <img
            className="d-block w-100"
            src={require("../assets/Website Photos/website-background.jpg")}
            alt="Third slide"
          />

          <Carousel.Caption>
            <h3>Third slide label</h3>
            <p>
              Praesent commodo cursus magna, vel scelerisque nisl consectetur.
            </p>
          </Carousel.Caption>
        </Carousel.Item>
      </Carousel>
      <div>
        <h3>Welcome to our site!</h3>
        <p>Carolina Clovers is a baseball team!</p>
      </div>
      <div>
        <h4>Announcements</h4>
        {userAnnouncement.map((announcement) => (
          <div key={announcement._id}>
            <p>{announcement.announcementTitle}</p>
            <p>{announcement.announcementBody}</p>
            <p>Posted On {announcement.createdAt}</p>
          </div>
        ))}
      </div>
    </Container>
  );
}

export default HomePage;
