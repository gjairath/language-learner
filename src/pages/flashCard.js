import React, { useState, useEffect, useContext} from "react";

import NavBar from "../components/Navbar.js"
import ContentContainer from "./flashcardOverview.js"
import { AuthContext } from "../components/auth";

const FlashCard = ({ computedMatch, location }) => {
  const [cards, setCards] = useState([0,1,2,3]);

    const  currentUser  = useContext(AuthContext);
    console.log(currentUser);
        
    console.log(location);

  const { params: { setID } } = computedMatch;
  
  console.log(computedMatch);

    
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
