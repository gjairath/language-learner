import React, { useState, useEffect } from "react";

import NavBar from "../components/Navbar.js"
import ContentContainer from "./flashcardOverview.js"

const FlashCard = ({ match, location }) => {
  const [cards, setCards] = useState([0,1,2,3]);

  const { params: { setID } } = match;

    
  useEffect(() => {
      if (localStorage.getItem(`currentCards-${setID}`)) {
        setCards( JSON.parse(localStorage.getItem(`currentCards-${setID}`)) );
      }
    }, []);
    
      
  return (
    <div>
        <div className="parent">
            <NavBar />
            <ContentContainer cards={ cards } set={setID}/>
        </div> 
    </div>
  );
};

export default FlashCard;
