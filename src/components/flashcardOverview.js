import React, { useState, useEffect } from "react";

import { Nav } from 'react-bootstrap'

import styled from 'styled-components'
import './styles/flashcardOverview.css';

const ContentContainer = (props) => {

// componentDidUpdate + DidMount to check condition after render + changes
    const {cards} = props;
    
  return (
      <ContainerBelow>
          <WrapperBelow>
          
              < Overview currentCards={cards}>
              </Overview>
          
          </WrapperBelow>
      </ContainerBelow>
  )
}


const Overview = (props) => {

    // God this shit was so hard to pull off 
    // TODO FIX EDGE CASES.
        // Allow for cards to re-render on screen, save and reinstantiate last state on re-load.

    // destructure it first
    const {currentCards} = props;
    const [loadedCards, setLoadedCards] = useState([]);
    // One big state for question/answer flashcards.
       // The rest are added on its own beacuse im lazy 
    const [query, setQuery] = useState(all_cards);

    var all_cards = JSON.parse(localStorage.getItem('flashcards'));

    if (all_cards == null) {
        all_cards = [["", ""]];
        for (let i = 1; i < loadedCards.length; i++) {
            all_cards.push(["",""]);        
        }
    }


    useEffect(() => {
        // Save it but only if the length is more than 1.
            // This is safe because the default state has 3 cards.
            // If the default state is changed to 1 card, its still safe.            
            // This is to skip componentWillUnmount            
            
        // all_cards is shrodingers data structure, it exists in 2 different states.
                // if there is user input or not

        if(loadedCards.length > 0) {
            localStorage.setItem('currentCards', JSON.stringify(loadedCards));
        }
        
        if (typeof all_cards === 'object') {
            all_cards[loadedCards.length] = ["", ""];
        } else {
                // handled already by null case
                // it works its a piece of shit but it works.
                // only took 6 hours of my life.
        }

    }, [loadedCards]);

    useEffect(() => {
        setLoadedCards(currentCards);
    }, [currentCards]);

    // Set a timeout so this function isn't called too many times.
        // Credit: https://stackoverflow.com/questions/53071774/reactjs-delay-onchange-while-typing
      useEffect(() => {
        const timeOutId = setTimeout(() => console.log(), 1000);
        return () => clearTimeout(timeOutId);
      }, [query]);


    const handleChange = (event) => {
        // which id of textarea?
        const id = event.target.dataset.id;
        
        // question or answer?
        const type = event.target.dataset.type;

        // Since the component is re-rendered with the appropriate value, the set-storage must be called after
            // each character...
        const newOuter = Object.assign({}, all_cards);
        if (type === "question") {
            // OOF 
            newOuter[id] = [event.target.value, newOuter[id][1]];
        } else {
            newOuter[id] = [newOuter[id][0], event.target.value];
        }
        
        console.log("saved");
        localStorage.setItem('flashcards', JSON.stringify(newOuter));
        setQuery(newOuter);
    }
    
    const toggleBox = (e) => {
        
        console.log(e.target.dataset.type);
    
    }
    
    
    // THANKS ASYNC SET states 6 hours to debug this garbage.
    
    const handleMoreCards = () => {
        setLoadedCards( [...loadedCards, parseInt(loadedCards.length)] );   
    }
    
    const handleDelete = (event) => {
        const id = event.target.dataset.id;
        console.log(id);
        
        // change the flashcards, they might be array/object depending upon user-input.
        // change the total # of cards with LoadedCards since it changes based on more-cards.
        

        if (typeof all_cards === 'object') {
            delete all_cards[id];
            console.log(all_cards);
        } else {
            
        }
        
        loadedCards.pop();
        console.log(loadedCards);
        if(loadedCards.length > 0 ) {
            setLoadedCards([...loadedCards]);
        } else {
            setLoadedCards([0,1,2,3]);
        }
    }

  return (
  <div className="list-content-wrapper">
    <ul>
        {loadedCards.map((item, idx) => {
        
            // This should be called after user stops typing, otherwise it will be slow af.
            return <li className="list-items">
                        <div className="text-content"> 
                            <textarea data-id={idx} data-type='question' onClick={toggleBox} onChange={handleChange} placeholder={idx} value={all_cards[idx][0]}> </textarea> 
                        </div>
                        <div className="text-content move-box">
                            <textarea data-id={idx} data-type='answer' onClick={toggleBox} onChange={handleChange} value={all_cards[idx][1]}> </textarea> 
                        </div>
                        <a className="button" data-id={idx} onClick={handleDelete}> x </a>
                    </li>;
                          })}
    </ul>
    <ToolBar>
        <ToolBarWrapper>
            <a onClick={handleMoreCards} class="button">More</a>
            <a href="#" class="button">Quiz</a>
            <a href="#" class="button">Pdf</a>
        </ToolBarWrapper>
    </ToolBar>

  </div>
  );
};


const ContainerBelow = styled.div`
    width: 100%;
    height: 85%;
`

const WrapperBelow = styled.div`
    font-family: "Denso Var", sans-serif;
    display: flex;
    align-items: center;
    justify-content: center;    

    height: 100%;
    
    color: rgba(0,0,0,0.7);
    flex-direction: column;    
`

const ToolBar = styled.div`
    background-color: rgba(254,245,218, 0.4);
    max-width: 960px;
    margin: 10px auto;
    border-radius: 8px;
    
    height: 40px;
`

const ToolBarWrapper = styled.div`
    display: flex;
    justify-content: flex-end;
    gap: 25px;
    
    height: 40px;
    width 100%;
`

export default ContentContainer