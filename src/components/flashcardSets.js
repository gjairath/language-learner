// FlashcardSets.js
// This is reusing the component Overview.js because I'm lazy.

import React, { useState, useEffect } from "react";

import NavBar from "./navbar.js";
import OverviewContainer from "./Overview.js"
import styles from './styles/overview.module.css'; 
import Dialog from 'react-bootstrap-dialog'


const FlashcardSet = (props) => {

    const [numSets, setNumSets] = useState(JSON.parse(localStorage.getItem('totalSets')) || 1);
    const [cardState, setCardState] = useState(JSON.parse(localStorage.getItem('cardState')) || []);
    const [update, setUpdate] = useState(false);
    
    const addSet = () => {
        
        setNumSets(numSets + 1);
        localStorage.setItem('totalSets', JSON.stringify(numSets));
        
        return;
    }
    
    const deleteConfirmed = (id) => {
            // delete the currentCards, flashcards, edited header(if it exists)
        // the loop should handle the rest
        
        var ascii = String.fromCharCode(parseInt(id) + 97).toUpperCase();
        
        if (localStorage.getItem(`currentCards-${ascii}`)) {
            localStorage.removeItem(`currentCards-${ascii}`);
        }

        if (localStorage.getItem(`flashcards-${ascii}`)) {
            localStorage.removeItem(`flashcards-${ascii}`);
        }
        
        if (localStorage.getItem(`EditedHeader-${id}`)) {
            localStorage.removeItem(`EditedHeader-${id}`);
        }   
        
        localStorage.setItem('totalSets', JSON.stringify(numSets));
        
        console.log(cardState);
        var new_arr = cardState;
        new_arr[id] = "";
        console.log(new_arr);
        
        setCardState(new_arr);
        localStorage.setItem(`cardState`, JSON.stringify(cardState));
        
        setUpdate(!update);
   
    }
         
    useEffect(() => {
        localStorage.setItem(`cardState`, JSON.stringify(cardState));
    });
    
    const deleteSet = (e) => {
            
        let id = e.currentTarget.dataset.idx;

        confirm(id);
    }
    
    const confirm = (id) => {
        Dialog.dialog.show({
          title: 'Delete This Set?',
          body: 'Are you sure you want to do this.',
          actions: [
            Dialog.CancelAction(),
            Dialog.Action(
                  'OK',
                  () => deleteConfirmed(id),
                  'btn-success'
                )
          ],
          bsSize: 'small',
        });   
    }
    
    
    
    const constructPage = () => {
    // this below id href is brilliant ngl
        let btn = <a href="#tbf" id="tbf" className={styles.link_inside} onClick={addSet}> Add More </a>;
        let i = 1;
        
        let card_state = [];

        let delete_btn = <div className={styles.link_inside2} data-idx={0} onClick={deleteSet}> Delete </div>;        
        let bp = [['Deck A', '', 'flash-cards.png', '/flashcards/A', delete_btn]];
        
        card_state.push('Deck A');
        
        while (i < numSets) {
            var ascii = String.fromCharCode(i + 97).toUpperCase();
            var str = `Deck ${ascii}`
            var link = `/flashcards/${ascii}`
            
            if (cardState[i] === ""){
                str = "";
            }
            
            let delete_btn = <div className={styles.link_inside2} data-idx={i} onClick={deleteSet}> Delete </div>;        
            bp.push([str, '', 'flash-cards.png', link, delete_btn]);
            i += 1;
            card_state.push(str);
        }
        
        if (cardState.length === 0 || card_state.length > cardState.length) {
            setCardState(card_state);
        }
        
        let length = bp.length - 1;
        for (let idx = 0; idx < bp.length; idx++){
            if (bp[idx][0] !== "") {
                length = idx;
            }
        }
        
        if (length === 0) {
            localStorage.setItem('totalSets', JSON.stringify(1));
            localStorage.setItem(`cardState`, JSON.stringify([cardState[0]]));
        }
        bp[length].push(btn);
        
        console.log(bp);
        return bp;
    }

    console.log(cardState);
    
    useEffect(() => {
        localStorage.setItem('totalSets', JSON.stringify(numSets));
    });
    
    
    let arr = constructPage();

    let overideStyling = {
      marginTop: "20px" 
    };
    
    let overrideWrapper = {
        width: "59%"
    };
    
    
// this is the most hilarious shit ive done in my entire life
    // because its so bad
    // and im ashamed i did this
    
    return (
        <div className="parent">
            <NavBar />      
                <Dialog ref={(el) => { Dialog.dialog = el }} />
  
            <OverviewContainer basePageItems={arr} style={overideStyling} styleWrapper={overrideWrapper} isDotted={true}
                disabled={false}/>

                <div style={{height: "50px"}}> </div>

        </div>              
    )
}


export default FlashcardSet;
