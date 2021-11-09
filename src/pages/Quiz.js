import React from "react";

import NavBar from "../components/navbar.js"
import ContentContainer from "./quizOverview.js"

const Quiz = ({ match, location }) => {
      const { params: { setID } } = match;
    
  return (
        <div className="parent">
            <NavBar />
            <ContentContainer setID={setID}/>
        </div> 
  );
};

export default Quiz;
