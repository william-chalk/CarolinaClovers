//Welcome Page
//Announcements on right side
//Photos under announcements
//Carasol of images at top
//Registration button
//Upcoming events
//Document download links
import { useQuery } from "@apollo/client";
import React from "react";
import { QUERY_ANNOUNCEMENTS } from "../graphql/queries";

function HomePage() {
  const { loading, data } = useQuery(QUERY_ANNOUNCEMENTS);

  const userAnnouncement = data?.getAnnouncements || [];

  console.log(data);
  return (
    <div style={{ backgroundColor: "rgba(255,255,255,0.9)", height: "50vh" }}>
      <div
        id="carouselExampleSlidesOnly"
        className="carousel slide"
        data-ride="carousel"
      >
        <div className="carousel-inner">
          <div className="carousel-item active">
            <img className="d-block w-100" src="..." alt="First slide" />
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
        {userAnnouncement.map((announcement) => (
          <div key={announcement._id}>
            <p>{announcement.announcementTitle}</p>
            <p>{announcement.announcementBody}</p>
          </div>
        ))}
      </div>
    </div>
  );
}

export default HomePage;
