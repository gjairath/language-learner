import React, { useState, useEffect } from "react";

import NavBar from "./navbar.js"
import ContentContainer from "./EamOverview.js"

const EAM = ({ match, location }) => {
        
        const { params: { setID } } = match;

  return (
        <div className="parent">
            <NavBar />
            <ContentContainer set={setID}/>
        </div> 
  );
};

export default EAM;
