// FlashcardSets.js
// This is reusing the component Overview.js because I'm lazy.

import React, { useState, useEffect } from "react";

import NavBar from "./navbar.js";
import OverviewContainer from "./Overview.js"
import styles from './styles/overview.module.css'; 


const FlashcardSet = (props) => {

    const [numSets, setNumSets] = useState(JSON.parse(localStorage.getItem('totalSets')) || 1);

    const addSet = () => {
        
        console.log("test");
        setNumSets(numSets + 1);
        localStorage.setItem('totalSets', JSON.stringify(numSets));
        
        return;
    }
    
    const deleteSet = (e) => {
        let id = e.currentTarget.dataset.idx;
       // setNumSets(numSets - 1);
        console.log(id);
        
        // delete the currentCards, flashcards, edited header(if it exists)
        // the loop should handle the rest
        
        var ascii = String.fromCharCode(parseInt(id) + 97).toUpperCase();
        console.log(ascii);
        
        if (localStorage.getItem(`currentCards-${ascii}`)) {
            localStorage.removeItem(`currentCards-${ascii}`);
        }

        if (localStorage.getItem(`flashcards-${ascii}`)) {
            localStorage.removeItem(`flashcards-${ascii}`);
        }
        
        if (localStorage.getItem(`EditedHeader-${id}`)) {
            localStorage.removeItem(`EditedHeader-${id}`);
        }        
        
    }
    
    const constructPage = () => {
    // this below id href is brilliant ngl
        let btn = <a href="#tbf" id="tbf" className={styles.link_inside} onClick={addSet}> Add More </a>;
        let i = 1;

        let delete_btn = <div className={styles.link_inside2} data-idx={0} onClick={deleteSet}> Delete </div>;        
        let bp = [['Deck A', '', 'flash-cards.png', '/flashcards/A', delete_btn]];
        
        while (i < numSets) {
            var ascii = String.fromCharCode(i + 97).toUpperCase();
            var str = `Deck ${ascii}`
            var link = `/flashcards/${ascii}`
            
            let delete_btn = <div className={styles.link_inside2} data-idx={i} onClick={deleteSet}> Delete </div>;        
            bp.push([str, '', 'flash-cards.png', link, delete_btn]);
            i += 1;
        }
        
        bp[bp.length - 1].push(btn);
        
        console.log(bp);
        return bp;
    }

    
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
    
    console.log(arr);
    
    return (
        <div className="parent">
            <NavBar />        
            <OverviewContainer basePageItems={arr} style={overideStyling} styleWrapper={overrideWrapper} isDotted={true}
                disabled={false}/>

                <div style={{height: "50px"}}> </div>

        </div>              
    )
}


export default FlashcardSet;
