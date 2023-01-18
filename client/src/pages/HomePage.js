//Welcome Page
//Announcements on right side
//Photos under announcements
//Carasol of images at top
//Registration button
//Upcoming events
//Document download links
import React from "react";
import { Link } from "react-router-dom";

import Auth from "../context/auth";

function HomePage(){
    return(
        <div>
            <div id="carouselExampleSlidesOnly" className="carousel slide" data-ride="carousel">
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
        </div>
    )
}

export default HomePage;