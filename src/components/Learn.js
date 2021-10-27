//Libraries
import React, { useState, useEffect, useRef } from "react";
import { FaLongArrowAltRight, FaLongArrowAltLeft } from 'react-icons/fa';
import {GiCardExchange} from 'react-icons/gi'
import styled from 'styled-components'

//My Files
import styles from './styles/learn.module.css';
import NavBar from "./navbar.js"

const Learn = ({ match, location }) => {
        
        const { params: { setID } } = match;

  return (
        <div className="parent">
            <NavBar />
            <LearnContainer set={setID}/>
        </div> 
  );
};

const LearnContainer = (props) => {

    const {set} = props;
    
    console.log("hey")

  return (
      <ContainerBelow>          
            <FlashWrapper>
                  <LearnContent set={set}/>
          </FlashWrapper>
          
      </ContainerBelow>
  )
}

const LearnContent = (props) => {

    const [windowSize, setWindowSize] = useState(false);
    const [questionsObj, setQuestionsObj] = useState([]);

    const [idx, setIdx] = useState(0);
        
    const {set} = props;
    
    var all_cards = JSON.parse(localStorage.getItem(`flashcards-${set}`));    
    const length_questions = Object.keys(all_cards).length;
    
    
    
    const get_question_options = (window) => {

        // Use a module to get rid of all the boilerplate parsing.
        
      var Dictionary = require("oxford-dictionary");
      
      var config = {
        app_id : "bdb00920",
        app_key : "1847085a4095260be60c932963766b66",
        source_lang : "fr"
      };
  
      var dict = new Dictionary(config);
    
      var lookup = dict.find("cheval");
    
      lookup.then(function(res) {    
          console.log(JSON.stringify(res, null, 4));
      },
      function(err) {
          console.log(err);
      });
            
        var questions = [];
        while(questions.length < window){
            var r = Math.floor(Math.random() * window);
            if(questions.indexOf(r) === -1) questions.push(r);
        }
                
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
            get_question_options(length_questions);
            setWindowSize(true);
        }
    });
    
        
    const reinit = (e) => {
        setIdx(0);
        get_question_options(length_questions);
    }


    const handleTransition = (e) => {        
        
        if (idx + 1 === length_questions) {
            return; 
        }         
        setIdx(idx + 1);    
        
    }
 
  return (
  
   <div className={styles.flash_content}>
          <div className={styles.question}>
          <i>{questionsObj.length != 0 && all_cards[questionsObj[idx][4]][0]}</i>
          </div>
       <div style={{height: "25px"}}> </div>   
          
          <div className={styles.question_options}>
          <p className={styles.question_option} onClick={handleTransition}>{questionsObj.length != 0 && all_cards[questionsObj[idx][0]][1]}</p>
          <p  className={styles.question_option} onClick={handleTransition}>{questionsObj.length != 0 && all_cards[questionsObj[idx][1]][1]}</p>
          <p  className={styles.question_option} onClick={handleTransition}>{questionsObj.length != 0 && all_cards[questionsObj[idx][2]][1]}</p>
          <p  className={styles.question_option} onClick={handleTransition}>{questionsObj.length != 0 && all_cards[questionsObj[idx][3]][1]}</p>
          </div>
            
                   <div style={{height: "10px"}}> </div>


       <div style={{height: "10px"}}> </div>
            
            
       <div style={{height: "25px"}}> </div>

            
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

export default Learn;
