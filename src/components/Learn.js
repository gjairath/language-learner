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
    

  return (
      <ContainerBelow>          
            <FlashWrapper>
                  <LearnContent set={set}/>
          </FlashWrapper>
          
      </ContainerBelow>
  )
}

const LearnContent = (props) => {

    const [questionsObj, setQuestionsObj] = useState([]);
    const [display, setDisplay] = useState([]);
    const [windowSize, setWindowSize] = useState(false);
    const [idx, setIdx] = useState(0);
        
    const {set} = props;
    
    var all_cards = JSON.parse(localStorage.getItem(`flashcards-${set}`));    
    const length_questions = Object.keys(all_cards).length;
    
    const handleTransition = (e) => {        
        
        if (idx + 1 === length_questions) {
            return; 
        }         
        setIdx(idx + 1);  
    }    
    
    const get_question_options = () => {

        // Use a module to get rid of all the boilerplate parsing.
      
      var ret = [];
      var Dictionary = require("oxford-dictionary");
      
      var config = {
        app_id : "bdb00920",
        app_key : "1847085a4095260be60c932963766b66",
        source_lang : "fr"
      };
  
      var dict = new Dictionary(config);
    
      var lookup = dict.find("cheval");
    
      lookup.then(function(res) {

          let base_json = res.results[0].lexicalEntries[0];

          
          let gender = base_json.entries[0].grammaticalFeatures[0].text;
          let plural = base_json.entries[0].inflections[0].inflectedForm;
          
          let phrase_def = base_json.entries[0].senses;
          
//          console.log(phrase_def);
          
          ret[0] = gender;
          ret[1] = plural;
          let i = 2;
          for (let item of phrase_def) {
              
              let obj = {};
              obj['def'] = item.definitions[0];
              
              let examples_arr = []
              for (let i of item.examples) {
                  examples_arr.push(i.text);
              }
              obj['examples'] = examples_arr;

              ret[i] = obj;
              i += 1;              
              // .defintiions[0]
              // .examples[i].text
          }
          
          display.push(ret[2].def);
          
          setDisplay(display);
      },
      function(err) {
          console.log(err);
      });
            
      setQuestionsObj(ret);
      
      console.log(ret);      

    } 

    useEffect(() => {
        if (windowSize == false) {
            get_question_options();
            setWindowSize(true);
        }
    });

    const handleDisplay = () => {
        console.log('ye');
        let arr = [...display, 2];
        setDisplay(arr);
    }

  return (
  
   <div className={styles.flash_content}>
          <div className={styles.question}>
          <i>{questionsObj.length != 0 && all_cards[idx][0]} [{questionsObj[0]} - {questionsObj[1]}]</i>
          </div>
       <div style={{height: "25px"}}> </div>   
          
          <div className={styles.question_options}>
                
            {display.map((item, idx) => {

                  return <p className={styles.question_option}>
                      {display.length != 0 && display[idx]}
                  </p>;
            })}

            <button onClick={handleTransition}> Got it </button>          
            <button onClick={handleDisplay}> Show Another! </button>          

          </div>

       <div style={{height: "50px"}}> </div>
            
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
