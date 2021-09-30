import React, { useState, useEffect, useRef } from "react";

import { Nav } from 'react-bootstrap'
import { FaLongArrowAltRight, FaLongArrowAltLeft } from 'react-icons/fa';
import {GiCardExchange} from 'react-icons/gi'
import styled from 'styled-components'

import styles from './styles/quizOverview.module.css';

const ContentContainer = (props) => {

    
  return (
      <ContainerBelow>
          <OptionsWrapper>
                <a class={styles.button}>Normal</a>
                <a class={styles.button}>Multiple-Choice</a>
                <a href="#" class={styles.button}>Match</a>
          </OptionsWrapper>
          
          <Overview>
          </Overview>
          
      </ContainerBelow>
  )
}

const Overview = (props) => {

// Handle case where quiz is loaded first.

    var all_cards = JSON.parse(localStorage.getItem('flashcards'));    
    var length_questions = Object.keys(all_cards).length;

    const [idx, setIdx] = useState(0);

    // 0 for question 1 for answer
    const [q_or_a, setQ] = useState(0);
    
    const handleFlip = (e) => {
        if (q_or_a == 0) {
            setQ(1);
        } else {
           setQ(0);
        }
    }
    
    const handleTranslation = (e) => {
        const type = e.currentTarget.dataset.type;  
    
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

  return (
  <div className={styles.flash_wrapper}>  
      <div className={styles.flash_content}>
          <div className={styles.question_title}>
            Question {idx + 1} of {length_questions}
          </div>
          
          <div className={styles.card}>
              {all_cards[idx][q_or_a].length > 0 && all_cards[idx][q_or_a]}
              {all_cards[idx][q_or_a].length == 0 && "No Question Found"}
          </div>
          
          <div className={styles.card_toolbar}>
                <a className={styles.button} data-type='l' onClick={handleTranslation}>
                    <FaLongArrowAltLeft/>
                </a>
                
                <a className={styles.button} onClick={handleFlip}>
                    <GiCardExchange/>
                </a>
                
                <a className={styles.button} onClick={handleTranslation} data-type={"r"}>
                  <FaLongArrowAltRight/>
                </a>

          </div>
      </div>
  </div>
    )
}

const ContainerBelow = styled.div`
    width: 100%;
    height: 85%;
`

const OptionsWrapper = styled.div`
    font-family: "Denso Var", sans-serif;
    display: flex;
    align-items: center;
    justify-content: center;    

    height: 15%;
    
    color: rgba(0,0,0,0.7);
    
    margin-top: 25px;
    gap: 50px;
`

export default ContentContainer