import React from "react";

import NavBar from "../components/Navbar.js"
import ContentContainer from "./quizOverview.js"

const Quiz = ({ computedMatch, location }) => {
      const { params: { setID } } = computedMatch;
    
  return (
        <div className="parent">
            <NavBar />
            <ContentContainer setID={setID}/>
        </div> 
  );
};

export default Quiz;
