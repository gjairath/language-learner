import React, { useState, useEffect } from "react";

import NavBar from "./navbar.js"
import ContentContainer from "./quizOverview.js"

const Quiz = ({ match, location }) => {
      const { params: { setID } } = match;
    console.log(setID);
    
  return (
        <div className="parent">
            <NavBar />
            <ContentContainer setID={setID}/>
        </div> 
  );
};

export default Quiz;
