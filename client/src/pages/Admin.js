import React from "react";
import { Link } from "react-router-dom";

import Auth from "../context/auth";

function Admin(){

    return(
        <div>
            <h3>Add a new announcement</h3>
            <label>Title</label>
            <input type="text" placeholder="Title"/>
            <label>Content</label>
            <textarea placeholder="Content"/>
            <h3>Add a new league</h3>
            <label>League Name</label>
            <input type="text" placeholder="League Name"/>
            <h3>Add a new Team Member</h3>
            <label>Team Member First Name</label>
            <input type="text" placeholder="First Name"/>
            <label>Team Member Last Name</label>
            <input type="text" placeholder="Last Name"/>
            <label>Team Member Position</label>
            <input type="text" placeholder="Position"/>
            <label>Team Member Number</label>
            <input type="number" placeholder="Number"/>
            <h3>Add a new photo</h3>
        </div>
    )
}

export default Admin;