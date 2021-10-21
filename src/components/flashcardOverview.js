import React, { useState, useEffect, useRef } from "react";

import { Nav } from 'react-bootstrap'
import Dialog from 'react-bootstrap-dialog'

import styled from 'styled-components'
import './styles/flashcardOverview.css';

import ToolBarComp from "./toolbar.js"

const ContentContainer = (props) => {

// componentDidUpdate + DidMount to check condition after render + changes
    const {cards, set} = props;
    
    
    
  return (
      <ContainerBelow>
          <WrapperBelow>
          
              < Overview currentCards={cards} set={set}>
              </Overview>
          
          </WrapperBelow>
      </ContainerBelow>
  )
}


const Overview = (props) => {

    // God this shit was so hard to pull off.
    // TODO FIX EDGE CASES.
    const {currentCards, set} = props;
    const [loadedCards, setLoadedCards] = useState([]);
    const [query, setQuery] = useState(all_cards);



    var all_cards = JSON.parse(localStorage.getItem(`flashcards-${set}`));
    if (all_cards == null) {
        all_cards = [["", ""]];
        for (let i = 1; i < loadedCards.length; i++) {
            all_cards.push(["",""]);        
        }
    }

    
    const reinit = () => {
        setLoadedCards([0,1,2,3]);
        const newOuter = {}
        for (let i = 0; i < 4; i++) {
            newOuter[i] = ["", ""];
        }    
        localStorage.setItem(`flashcards-${set}`, JSON.stringify(newOuter));

     }
     
    
    useEffect(() => {
        // Save it but only if the length is more than 1.
            // This is safe because the default state has 3 cards.          
            
        // all_cards is shrodingers data structure, it exists in 2 different states.
                // if there is user input or not

        if(loadedCards.length > 0) {
            localStorage.setItem(`currentCards-${set}`, JSON.stringify(loadedCards));
        }

    }, [loadedCards]);

    useEffect(() => {
        const initCards = JSON.parse(localStorage.getItem(`currentCards-${set}`));
        if (initCards) {
            setLoadedCards(initCards);
        } else {
            setLoadedCards(currentCards);
        }
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
        
        localStorage.setItem(`flashcards-${set}`, JSON.stringify(newOuter));
        setQuery(newOuter);
    }
        
    // THANKS ASYNC SET states 6 hours to debug this garbage.    
    const handleMoreCards = () => {
        setLoadedCards( [...loadedCards, parseInt(loadedCards.length)] );
        
        all_cards[loadedCards.length] = ["", ""];
        setQuery(all_cards);
        const newOuter = Object.assign({}, all_cards);
        localStorage.setItem(`flashcards-${set}`, JSON.stringify(newOuter));
    }
    
    const isEmptyObject = (obj) => {
        // a faster way of checking isEmpty
        for (var i in obj) {
            return false;
        }
        return true;
    }
        
    const handleDelete = (event) => {
        const id = event.target.dataset.id;

        
        loadedCards.pop();
        if(loadedCards.length > 0 ) {
            setLoadedCards([...loadedCards]);
        }
        
        delete all_cards[id];
        const newOuter = {};
        let new_idx = 0;
        for (const old_idx in all_cards) {
            if (new_idx == loadedCards.length) {
                break;
            }
            newOuter[new_idx] = all_cards[old_idx];
            new_idx += 1;
        }
        if (isEmptyObject(newOuter) && loadedCards.length === 0) {
             setLoadedCards([0,1,2,3]);
             for (let i = 0; i < 4; i++) {
                 newOuter[i] = ["", ""];
             }       
        }
        localStorage.setItem(`flashcards-${set}`, JSON.stringify(newOuter));
        localStorage.setItem(`currentCards-${set}`, JSON.stringify(loadedCards));
    }

    
    // https://stackoverflow.com/questions/54633690/how-can-i-use-multiple-refs-for-an-array-of-elements-with-hooks
    const questionRefs = useRef([]);
    const answerRefs = useRef([]);
    useEffect(() => {
       questionRefs.current = questionRefs.current.slice(0, loadedCards.length);
       answerRefs.current = answerRefs.current.slice(0, loadedCards.length);
    }, [loadedCards]);

    const addAnimationBox = (e) => {
        const type = e.target.dataset.type;
        const id = e.target.dataset.id;
        
        console.log(type);
        
        if (type == undefined || id == undefined) {
            return;
        }
        
        if (type == 'question'){        
            answerRefs.current[id].classList.add('move-box');
        } else if (type == 'answer'){
            questionRefs.current[id].classList.add('move-box');
        }
    }
        
    const removeAnimationBox = (e) => {
        const type = e.target.dataset.type;
        const id = e.target.dataset.id;
        
        if (type == undefined || id == undefined) {
        // sometimes when u dont click the text-area this shit happens.
            return;
        }
        
        if (type == 'question'){        
            answerRefs.current[id].classList.remove('move-box');
        } else if (type == 'answer') {
            questionRefs.current[id].classList.remove('move-box');
        }    
    }
    
    
    const confirm = () => {
        Dialog.dialog.show({
          title: 'Delete All Flashcards?',
          body: 'Are you sure you want to do this.',
          actions: [
            Dialog.CancelAction(),
            Dialog.Action(
                  'OK',
                  () => reinit(),
                  'btn-success'
                )
          ],
          bsSize: 'small',
        });   
    }

    
    // Utility for Tool-Bar at the bottom, reusable user-component.    
   let left_reset_button = <a href="#" onClick={confirm} style={{marginLeft: "30px"}} class="button">Reset all</a>;
   let right_more_btn = <a onClick={handleMoreCards} class="button">More</a>
   let right_quiz_btn = <a href={`/quiz/${set}`} class="button">Quiz</a>
   let right_pdf_btn = <a onClick={window.print} class="button">Pdf</a>
   let right_back = <a href="/fsets" class="button">Back To Sets</a>
   
   
  return (
  
  <div className="list-content-wrapper">
    <ul>
    
    <Dialog ref={(el) => { Dialog.dialog = el }} />

        {loadedCards.map((item, idx) => {
  
            // This should be called after user stops typing, otherwise it will be slow af.
            return <li className="list-items">
                        <div className="text-content" ref={el => questionRefs.current[idx] = el} onClick={addAnimationBox} onBlur={removeAnimationBox}> 
                            <textarea data-id={idx} data-type='question' onChange={handleChange} placeholder={idx + 1} value={all_cards[idx][0]}> </textarea> 
                        </div>
                        <div className="text-content" ref={el => answerRefs.current[idx] = el} onClick={addAnimationBox}  onBlur={removeAnimationBox}>
                            <textarea data-id={idx} data-type='answer' onChange={handleChange} value={all_cards[idx][1]}> </textarea> 
                        </div>
                        <a className="button" data-id={idx} style={{marginTop: "8px", marginLeft:"15px"}} onClick={handleDelete}> x </a>
                    </li>;
                          })}
    </ul>
    
    <ToolBarComp 
            left = 
                {[right_back, right_quiz_btn, right_pdf_btn]} 
            right = 
                {[right_more_btn, left_reset_button]}
    />
    
    <div style={{height: "15px"}}> </div>

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

export default ContentContainer