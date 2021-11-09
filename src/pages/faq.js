// Faq.js

import React from "react";

import NavBar from "../components/navbar.js";
import FaqContent from "./faqContent.js"


const Faq = (props) => {

    return (
        <div className="parent">
            <NavBar />        
            <FaqContent/>
        </div>              
    );
}

export default Faq;