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
            <div id="carouselExampleSlidesOnly" class="carousel slide" data-ride="carousel">
                <div class="carousel-inner">
                    <div class="carousel-item active">
                        <img class="d-block w-100" src="..." alt="First slide" />
                    </div>
                    <div class="carousel-item">
                        <img class="d-block w-100" src="..." alt="Second slide" />
                    </div>
                    <div class="carousel-item">
                        <img class="d-block w-100" src="..." alt="Third slide" />
                    </div>
                </div>
            </div>
            <div>
                <a href="https://google.com">Register Now!</a>
            </div>
            <div>
                <h3>Welcome to our site!</h3>
                <p>Carolina Clovers is a baseball team!</p>
            </div>
        </div>
    )
}

export default HomePage;