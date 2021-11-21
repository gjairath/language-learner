import React from "react";

import NavBar from "../components/Navbar.js"
import ContentContainer from "./EamOverview.js"

const EAM = ({ computedMatch, location }) => {
        
        const { params: { setID } } = computedMatch;

  return (
        <div className="parent">
            <NavBar />
            <ContentContainer set={setID}/>
        </div> 
  );
};

export default EAM;
