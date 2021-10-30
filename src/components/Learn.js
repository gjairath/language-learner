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
        
        get_question_options();
    }    
    
    const get_question_options = () => {

        // Use a module to get rid of all the boilerplate parsing.
      
      var ret = [];
      var Dictionary = require("oxford-dictionary");
      
      var config = {
        app_id : "53cc5cfd",
        app_key : "87e49c9fedbd3884d923f8a043c75afb",
        source_lang : "fr"
      };
  
      var dict = new Dictionary(config);
      
      // try this word
      var try_this_word = all_cards[idx][0];
      console.log(try_this_word);
      var lookup = null;
      
      try {
          lookup = dict.find(try_this_word);
        } catch(e){
            
        }
      lookup.then(function(res) {
          console.log(res);

          let base_json = res.results[0].lexicalEntries[0];

          
          let gender = "No Gender";
          
          try{
              gender = base_json.entries[0].grammaticalFeatures[0].text;
          } catch (e) {
              console.log(e);
          }
          let plural = "No Plural";
          
          try {
              plural = base_json.entries[0].inflections[0].inflectedForm;          
          } catch (e) {
              console.log(e);
              //setIdx(idx + 1);
              
          }
          
          let phrase_def = base_json.entries[0].senses;
          
//          console.log(phrase_def);
          
          ret[0] = gender;
          ret[1] = plural;
          let i = 2;
          for (let item of phrase_def) {
              
              let obj = {};
              obj['def'] = item.definitions[0];
              
              let examples_arr = [];
              try {
                  for (let i of item.examples) {
                      examples_arr.push(i.text);
                  }
              } catch (e) {
                console.log(e);                  
              }
              obj['examples'] = examples_arr;

              ret[i] = obj;
              i += 1;              
              // .defintiions[0]
              // .examples[i].text
          }
          
          var newDisplay = [];
          newDisplay.push([ret[2].def]);
          
          setDisplay(newDisplay);
      },
      function(err) {
          // we failed
          console.log(err);
          
          // try again with a new word
            setQuestionsObj([]);
            setDisplay([]);
            setIdx(idx + 1);
            return;
            
        });
            
      setQuestionsObj(ret);
    }
    
    useEffect(() => {
        if (windowSize == false) {
            get_question_options();
            setWindowSize(true);
        }
    });
    

    const handleDisplay = () => {
    
        if(questionsObj == undefined){
            return;
        }
    
        // this is probably an "overthinking" way of doing it 
        // but my expierence with react is limited
        // so no fancy pants one liner solution here 
    
        let current_idx = display.length - 1;
        
        if (current_idx < 0){
            current_idx = 0;
        }
        
        console.log(questionsObj);
        
        let total_examples = questionsObj[current_idx + 2].examples.length;
        

        let current_example_ctr = display[current_idx].length - 1;
        

        var newDisplay = display.slice();
        
        if (total_examples == current_example_ctr) {
            // we have exhausted this option, update it
            current_idx += 1;
            newDisplay = [...newDisplay, []];
            
            if (questionsObj[current_idx + 2] == null){
                return;
            }
            
            newDisplay[current_idx].push(questionsObj[current_idx + 2].def);            
        } else {
            newDisplay[current_idx].push(questionsObj[current_idx + 2].examples[current_example_ctr]);
        }
        
        setDisplay(newDisplay);
    }
    
// wtf is this shit lmao.
    // what is life
    // maybe i should use conditional renders but brute force is the best force.
    // plus the API only ever fetches so many definitions.
    
  return (
  
   <div className={styles.flash_content}>
          <div className={styles.question}>

        {questionsObj.length == 0 && idx != 0 &&
          <i>
              {all_cards[idx-1][0]} was not found in the Dictionary.
              <p> Consider changing it. (<a href="/about" style={{textDecoration: `none`}}>Guide</a>)</p>
          </i>
        }


        {questionsObj.length > 0 && idx == 0 &&
          <i>
              {all_cards[0][0]} [{questionsObj[0]} - {questionsObj[1]}]
          </i>
            }

        {questionsObj.length > 0 && idx !=0 &&
          <i>
              {all_cards[idx-1][0]} [{questionsObj[0]} - {questionsObj[1]}]
          </i>
            }

          </div>
       <div style={{height: "25px"}}> </div>   
          
          <div className={styles.question_options}>
                
            {display.map((item, idx) => {

                  return <ul className={styles.list}>
                      <p> {display.length != 0 && display[idx][0]} </p>
                      
                      {display[idx].map((item, i) => {
                              return <li className={styles.list_item}> {i+1 < display[idx].length && display[idx][i+1]} </li>;
                            })}
                         </ul> 
                  
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
