import React, { useState, useEffect, useRef } from "react";
import { FaLongArrowAltRight, FaLongArrowAltLeft } from 'react-icons/fa';
import {GiCardExchange} from 'react-icons/gi'
import styled from 'styled-components'

import styles from './styles/EamOverview.module.css';


const ContentContainer = (props) => {    
  return (
      <ContainerBelow>          
            <FlashWrapper>
                  <Normal />
          </FlashWrapper>
          
      </ContainerBelow>
  )
}

const Normal = (props) => {

    var all_cards = JSON.parse(localStorage.getItem('flashcards'));    
    var length_questions = Object.keys(all_cards).length;

    const [idx, setIdx] = useState(0);
    const [q_or_a, setQ] = useState(0);
    
    const [file, setFile] = useState(null);
    
   const handleChange = (event) => {
        setFile(URL.createObjectURL(event.target.files[0]));
        console.log(file);
   }
   console.log(file);
   
    const handleTranslation = (e) => {
          
        var type = null;
        var allowedKeys = ['ArrowRight', 'ArrowLeft'];
     
        // Re-use the same function for keyboard, prevent de-duplication
     
         if (e instanceof KeyboardEvent) {
         
             if (allowedKeys.includes(e.key) == false) {
                return;
             }
         
            if (e.key == 'ArrowRight') {
                type = "r";
            }
            
            if (e.key == 'ArrowLeft') {
                type = "l";
            }
        } else {
            type = e.currentTarget.dataset.type;
        }    
        
        // 0 for left 1 for right, to prevent de-duplication.
        
        if (type == "l") {
            //console.log("left")
            
            if (idx == 0) {
                console.log("Cant go left");
                return;
            }
            setIdx(idx - 1);
        } else {
        
            if (idx == length_questions - 1) {
                console.log("Cant go right");
                return;
            }
            setIdx(idx + 1);
        }
    
    }
    
    useEffect(() => {
      document.addEventListener("keydown", handleTranslation);
      
        return () => {
          document.removeEventListener("keydown", handleTranslation);
        };
    });

    
  return (
    <div className={styles.flash_content}>

              Under Construction, Database and display.

          <div className={styles.question_big}> <i>
              {all_cards[idx][q_or_a].length > 0 && all_cards[idx][q_or_a]}
              {all_cards[idx][q_or_a].length == 0 && "No Question Found"}
              </i>
          </div>
          
          <div className={styles.question_title}>
            {q_or_a == 0 && 'Question'} {q_or_a == 1 && 'Answer'} {idx + 1} of {length_questions}
          </div>
          
          <div className={styles.card}>
                    {file == null && 'Insert Something Dummy'}
                    <img src={file}/>
          </div>
 
     <div className='button' onChange={handleChange}>
          <input type="file" id="image_file" accept="image/*" />
    </div>
     
          <div className={styles.card_toolbar}>
                <a className={styles.button} data-type='l' onClick={handleTranslation}>
                    <FaLongArrowAltLeft/>
                </a>
                
                
                <a className={styles.button} onClick={handleTranslation} data-type={"r"}>
                  <FaLongArrowAltRight/>
                </a>
          </div>
         </div>
    )
}



const FlashWrapper = styled.div`
    height: calc(100% - 15% - 50px);
    display:flex;
    width: 100%;
    justify-content: center;
    
    margin-top: 55px;
`

const ContainerBelow = styled.div`
    width: 100%;
    height: auto;
`

export default ContentContainer;
