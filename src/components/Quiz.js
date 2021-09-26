import React, { useState, useEffect } from "react";

import NavBar from "./navbar.js"
import ContentContainer from "./quizOverview.js"

const Quiz = () => {
        
      
  return (
        <div className="parent">
            <NavBar />
            <ContentContainer/>
        </div> 
  );
};

export default Quiz;
