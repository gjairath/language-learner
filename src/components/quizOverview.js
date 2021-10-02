import React, { useState, useEffect, useRef } from "react";

import { Nav } from 'react-bootstrap'
import { FaLongArrowAltRight, FaLongArrowAltLeft } from 'react-icons/fa';
import {GiCardExchange} from 'react-icons/gi'
import styled from 'styled-components'

import styles from './styles/quizOverview.module.css';

const ContentContainer = (props) => {

    const [active, setActive] = useState(1);
    
    const handleTab = (e) => {
        setActive(parseInt(e.target.dataset.type));
    }
    
  return (
      <ContainerBelow>
          <OptionsWrapper>
                <a class={styles.button} data-type="0" onClick={handleTab}>Normal</a>
                <a class={styles.button} data-type="1" onClick={handleTab}>Multiple-Choice</a>
                <a href="#" class={styles.button} data-type="2" onClick={handleTab}>Match</a>
          </OptionsWrapper>
          
            <div className={styles.flash_wrapper}>  
                  {active == 0 && <Normal />} 
                  {active == 1 && <Mcq />}
          </div>
          
      </ContainerBelow>
  )
}

const Normal = (props) => {

// Handle case where quiz is loaded first.

    var all_cards = JSON.parse(localStorage.getItem('flashcards'));    
    var length_questions = Object.keys(all_cards).length;


    const [idx, setIdx] = useState(0);

    // 0 for question 1 for answer
    const [q_or_a, setQ] = useState(0);
    
    const handleFlip = (e) => {
        if (e instanceof KeyboardEvent) {

           if (e.code != "Space") {
               return;
           }
        }
        console.log(e.code);
        
        if (q_or_a == 0) {
            setQ(1);
        } else {
           setQ(0);
        }
    }
    
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
      document.addEventListener("keydown", handleFlip);
      
        return () => {
          document.removeEventListener("keydown", handleTranslation);
          document.removeEventListener("keydown", handleFlip);
        };
    });

    
  return (
    <div className={styles.flash_content}>

          <div className={styles.question_title}>
            {q_or_a == 0 && 'Question'} {q_or_a == 1 && 'Answer'} {idx + 1} of {length_questions}
          </div>
          
          <div className={styles.card} onClick={handleFlip}>
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
    )
}

const Mcq = (props) => {

    const [windowSize, setWindowSize] = useState(false);
    const [questionsObj, setQuestionsObj] = useState([]);
    
    const [score, setScore] = useState(0);
    const [idx, setIdx] = useState(0);
    
    var all_cards = JSON.parse(localStorage.getItem('flashcards')); 
    
    console.log(Object.keys(all_cards).length);
       
    var length_questions = Object.keys(all_cards).length;

    const get_question_options = () => {
              
        // Note to future self:
            // Each contains an array [opt1, opt2, opt3, opt4, unshuffled question flag]

        var window;
        if (length_questions > 10) {
            window = 10;
        } else { 
            window = length_questions;
        }
        
        //https://stackoverflow.com/questions/2380019/generate-unique-random-numbers-between-1-and-100
        var questions = [];
        while(questions.length < window){
            var r = Math.floor(Math.random() * window);
            if(questions.indexOf(r) === -1) questions.push(r);
        }
        // questions contains array of random indicies that points to all_cards
                
        var results = [];
        for (let idx of questions) {
            // idx is the question number in all_Cards
            var answers = [idx];
            
            while(answers.length < 4){
                var r = Math.floor(Math.random() * window);
                if(answers.indexOf(r) === -1 && r != idx) {
                    answers.push(r);
                }
            }
            
            //  Durstenfeld shuffle
            for (var i = answers.length - 1; i > 0; i--) {
                var j = Math.floor(Math.random() * (i + 1));
                var temp = answers[i];
                answers[i] = answers[j];
                answers[j] = temp;
            }
            
            // push the IDX at the end to  keep it unshuffled, to display the question
            answers.push(idx);
            results.push(answers);
        }
        setQuestionsObj(results);
    } 
    
    useEffect(() => {
        if (windowSize == false) { 
            get_question_options();
            setWindowSize(true);
        }
    });
    
    const handleTransition = (e) => {
    
        // questionsObj's last value has the question on screen.
        // all_cards can make for ez pz comparison. 
        
      //  console.log(all_cards[questionsObj[idx][4]][1])
        
        if (idx + 1 == length_questions) { return; }

        if (all_cards[questionsObj[idx][4]][1] == e.currentTarget.textContent) {
            setScore(score + 1);
        } else {
            setScore(score - 1);
        }
        
         
        console.log(length_questions);
        console.log(idx);
        setIdx(idx + 1);    
    
    }
    
  return (
    <div className={styles.flash_content}>
          <div className={styles.question_title}>
            Question {idx + 1} of {length_questions} [Score: {score}]
          </div>
          <div className={styles.question}>
          What matches <i>{questionsObj.length != 0 && all_cards[questionsObj[idx][4]][0]}</i>?
          </div>
          
          <div className={styles.question_options}>
          <p className={styles.question_option} onClick={handleTransition}>{questionsObj.length != 0 && all_cards[questionsObj[idx][0]][1]}</p>
          <p  className={styles.question_option} onClick={handleTransition}>{questionsObj.length != 0 && all_cards[questionsObj[idx][1]][1]}</p>
          <p  className={styles.question_option} onClick={handleTransition}>{questionsObj.length != 0 && all_cards[questionsObj[idx][2]][1]}</p>
          <p  className={styles.question_option} onClick={handleTransition}>{questionsObj.length != 0 && all_cards[questionsObj[idx][3]][1]}</p>
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