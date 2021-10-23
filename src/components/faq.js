// Faq.js

import React, { Component } from "react";

import NavBar from "./navbar.js";
import FaqContent from "./faqContent.js"

import uniqid from "uniqid";

const Faq = (props) => {

    return (
        <div className="parent">
            <NavBar />        
            <FaqContent/>
        </div>              
    );
}

export default Faq;