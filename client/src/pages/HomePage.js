//Welcome Page
//Announcements on right side
//Photos under announcements
//Carasol of images at top
//Registration button
//Upcoming events
//Document download links
import { useQuery } from "@apollo/client";
import React from "react";
import { Container } from "react-bootstrap";
import { QUERY_ANNOUNCEMENTS } from "../graphql/queries";

function HomePage() {
  const { loading, data } = useQuery(QUERY_ANNOUNCEMENTS);

  const userAnnouncement = data?.getAnnouncements || [];

  console.log(data);
  return (
    <Container>
      <div
        id="carouselExampleSlidesOnly"
        className="carousel slide"
        data-ride="carousel"
      >
        <div className="carousel-inner">
          <div className="carousel-item active">
            <img className="d-block w-100" src="../assets/carolinaClovers.png" alt="First slide" />
          </div>
          <div className="carousel-item">
            <img className="d-block w-100" src="..." alt="Second slide" />
          </div>
          <div className="carousel-item">
            <img className="d-block w-100" src="..." alt="Third slide" />
          </div>
        </div>
      </div>
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
