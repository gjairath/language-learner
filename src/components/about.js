// About.js

import React, { Component } from "react";

import NavBar from "./navbar.js";
import AboutContent from "./aboutContent.js"

import uniqid from "uniqid";

const About = (props) => {

    return (
        <div className="parent">
            <NavBar />        
            <AboutContent/>
        </div>              
    );
}

export default About;
