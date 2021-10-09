import React, { useState, useEffect } from "react";

import NavBar from "./navbar.js"
import ContentContainer from "./EamOverview.js"

const EAM = () => {
        
      
  return (
        <div className="parent">
            <NavBar />
            <ContentContainer/>
        </div> 
  );
};

export default EAM;
