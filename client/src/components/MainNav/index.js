//About us
//Parent/Coach Resources
//Team Pages
//Tournament Sites
//FanZone Store
//Schedules
//Donate
//Sponser

import React from "react";
import { Link } from "react-router-dom";

import Auth from "../../context/auth";

function MainNav() {
  const logout = (event) => {
    event.preventDefault();
    Auth.logout();
  };

  return (
    <header>
      <nav>
        <div>
          <Link to="/">
            <h1>Carolina Clovers</h1>
          </Link>
        </div>

        <div>
          <select>
            <option disabled selected>
              About Us
            </option>
            <option value="Our Vision">
              <Link to="/our-vision">Our Vision</Link>
            </option>
            <option value="Our Purpose">Our Purpose</option>
            <option value="Message To Our Parents">
              Message To Our Parents
            </option>
            <option value="Saftey Spotlight">Saftey Spotlight</option>
            <option value="Contact Us">Contact Us</option>
          </select>
          <select>
            <option disabled selected>
              Clovers Team Pages
            </option>
            <option value="Team One">Team One</option>
            <option value="Team Two">Team Two</option>
            <option value="Team Three">Team Three</option>
            <option value="Team Four">Team Four</option>
            <option value="Team Five">Team Five</option>
          </select>
          <select>
            <option disabled selected>
              Tournament Sites
            </option>
            <option value="Team One">Team One</option>
            <option value="Team Two">Team Two</option>
            <option value="Team Three">Team Three</option>
            <option value="Team Four">Team Four</option>
            <option value="Team Five">Team Five</option>
          </select>
          <select>
            <option disabled selected>
              Schedules
            </option>
            <option value="Team One">Team One</option>
            <option value="Team Two">Team Two</option>
            <option value="Team Three">Team Three</option>
            <option value="Team Four">Team Four</option>
            <option value="Team Five">Team Five</option>
          </select>
          <select>
            <option disabled selected>
              Sponser Us
            </option>
            <option value="Team One">Team One</option>
            <option value="Team Two">Team Two</option>
            <option value="Team Three">Team Three</option>
            <option value="Team Four">Team Four</option>
            <option value="Team Five">Team Five</option>
          </select>
        </div>
      </nav>
    </header>
  );
}

export default MainNav;
