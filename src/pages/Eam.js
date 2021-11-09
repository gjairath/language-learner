import React from "react";

import NavBar from "../components/navbar.js"
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
