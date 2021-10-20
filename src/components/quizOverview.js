import React, { useState, useEffect, useRef } from "react";

import { Nav } from 'react-bootstrap'
import { FaLongArrowAltRight, FaLongArrowAltLeft } from 'react-icons/fa';
import {GiCardExchange} from 'react-icons/gi'
import styled from 'styled-components'
import {flash} from "react-universal-flash";

import Dialog from 'react-bootstrap-dialog'

import styles from './styles/quizOverview.module.css';
import Progress from "./progress.js"
import ToolBarComp from "./toolbar.js"

const ContentContainer = (props) => {

    const {setID} = props;
    
    console.log("Ye" + setID);

    const [active, setActive] = useState(1);
    
    const handleTab = (e) => {
        setActive(parseInt(e.target.dataset.type));
    }
    
  return (
      <ContainerBelow>
          <OptionsWrapper>
                <a class={styles.button} data-type="0" onClick={handleTab}>Normal</a>
                <a class={styles.button} data-type="1" onClick={handleTab}>Multiple-Choice</a>
                <a class={styles.button} data-type="2" onClick={handleTab}>Match</a>
          </OptionsWrapper>
          
          <FlashWrapper>
                  {active == 0 && <Normal set={setID}/>} 
                  {active == 1 && <Mcq set={setID}/>}
                  {active == 2 && <Match set={setID}/>}
            </FlashWrapper>
      </ContainerBelow>
  )
}

const Normal = (props) => {

// Handle case where quiz is loaded first.

    const {set} = props;

    var all_cards = JSON.parse(localStorage.getItem(`flashcards-${set}`));    
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

       let right_more_btn = <a class="button" href="/fsets">flashcards</a>

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
          
                  <ToolBarComp 
    left = 
        {[]} 
    right = 
        {[right_more_btn]}
    />
              <div style={{height: "20px"}}> </div>

         </div>
    )
}

const Mcq = (props) => {

    const [windowSize, setWindowSize] = useState(false);
    const [questionsObj, setQuestionsObj] = useState([]);
    const [score, setScore] = useState(0);
    const [idx, setIdx] = useState(0);
    const [timer, setTimer] = useState(0);
    const [weight, setWeight] = useState(1);
    
    // I cant reuse score because of weight
    const [correct, setCorrect] = useState(0);
    
    const {set} = props;
    
    var all_cards = JSON.parse(localStorage.getItem(`flashcards-${set}`));    
    const length_questions = Object.keys(all_cards).length;
    
    
    console.log(questionsObj)
    
    const get_question_options = (window) => {
              
        // Note to future self:
            // Each contains an array [opt1, opt2, opt3, opt4, unshuffled question flag]
            
            // Take the first window worth of questions in a random order alongside options in a random order.
        
        //https://stackoverflow.com/questions/2380019/generate-unique-random-numbers-between-1-and-100
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
        
        if (idx == 9) {
            console.log("SWAG")
        }
    });
    
        
    const score_board = () => {
        Dialog.dialog.show({
          title: 'Scoreboard',
          body: `Wins: ${correct} Losses: ${length_questions-correct} Winnings: ${score}$`,
          actions: [
            Dialog.CancelAction(),
            Dialog.Action(
                  'Restart',
                  () => reinit(),
                  'btn-success'
                )
          ],
          bsSize: 'small',
        });   
    }

    
    useEffect(() => {
        // Questions exhausted
        if (idx + 1 === length_questions) {
            score_board();
            return;
        }           
        
        if (timer >= 100){
            setIdx(idx + 1);
            // higher penalty if u miss.
            setScore(score - (150 * weight));
            setTimer(0);
        }
        
        const timeOutId = setTimeout(() => setTimer(timer + (weight*10)), 1000);
        return () => clearTimeout(timeOutId);
      });
      
    const reinit = (e) => {
        setIdx(0);
        setScore(0);
        setTimer(0);
        setWeight(1);
        get_question_options(length_questions);
    }
    const handleTransition = (e) => {
    
        // questionsObj's last value has the question on screen.
        // all_cards can make for ez pz comparison. 
        
      //  console.log(all_cards[questionsObj[idx][4]][1])
      
          setTimer(0);
        

        if (all_cards[questionsObj[idx][4]][1] == e.currentTarget.textContent) {
            setScore(score + (100 * weight));
            let sc = 100 * weight;
            flash(`+${sc}`, 350, "success");
            setCorrect(correct + 1);
        } else {
            setScore(score - (100 * weight));
            flash(-100 * weight, 350, "dark");
        }
        
        if (idx + 1 === length_questions) { return; }         
        setIdx(idx + 1);    
    
    }
    // 10, 5, 2.5, etc.
        // Utility for Tool-Bar at the bottom, reusable user-component.    
   let left_reset_button = <a onClick={reinit} style={{marginLeft: "30px"}} class="button">Try Again</a>;
   let left_easy = <a class="button" onClick={() => setWeight(weight - 1)} >Easier</a>;
   let left_hard = <a class="button" onClick={() => setWeight(weight + 1)}>Harder</a>;
   let right_more_btn = <a class="button" href="/fsets">flashcards</a>
 
   
  return (
  
   <div className={styles.flash_content}>    
       <Dialog ref={(el) => { Dialog.dialog = el }} />
  
       <div style={{height: "25px"}}> </div>

        <div className={styles.question_title}>
        
            Question {idx + 1} of {length_questions} [Winnings: {score}$, Difficulty: {weight}, Timer: {Math.ceil(10 / weight)} Seconds]
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
            
                   <div style={{height: "10px"}}> </div>

            <Progress now={timer}/>


       <div style={{height: "10px"}}> </div>
            
                <ToolBarComp 
            left = 
                {[left_reset_button]} 
            right = 
                {[left_easy, left_hard, right_more_btn]}
            />
            
       <div style={{height: "25px"}}> </div>

            
    </div>
    )
}


const Match = (props) => {

    const flatten=(obj)=>Object.values(obj).flat()

    const shuffle = (arr) => {
        for (var i = arr.length - 1; i > 0; i--) {
            var j = Math.floor(Math.random() * (i + 1));
            var temp = arr[i];
            arr[i] = arr[j];
            arr[j] = temp;
        }
        return arr;
    }    
    

    const [score, setScore] = useState(0);
    const [question, setQuestion] = useState(["", '', 'false']);
    const [init, setInit] = useState(true);


    const {set} = props;

    var all_cards = JSON.parse(localStorage.getItem(`flashcards-${set}`));    
    const length_questions = Object.keys(all_cards).length;

    var [all_buttons, setAllButtons] = useState(flatten(all_cards));
    all_buttons = all_buttons.slice(0, 28);
    all_buttons = shuffle(all_buttons);

    const reinit = (e) => {
        setScore(0);
        setAllButtons(flatten(all_cards));
    }
    
    const findCardByQuestionOrAnswer = (q_name) => {
        for (const card in all_cards){
            let card_arr = all_cards[card];

            if (card_arr[0] == q_name) {
                return card_arr[1];
            }
            
            if (card_arr[1] == q_name) {
                return card_arr[0];
            }

        }
        return -1;
    }
    
    const process = (str) => {
        
        var res = str.replace(/\s+/g, "");
        return res.toLowerCase();
    }

    const handleSubmission = (e) => {        
        if (question[2] == 'true') {
            // the douchebag clicked an answer

            let answer = e.currentTarget.textContent;
            let correctAnswer = findCardByQuestionOrAnswer(question[0]);
            
            if (answer == correctAnswer) {
                setScore(score + 100);
                flash(`${question[0]} is ${answer}! +100`, 1450, "success");
                let arr = [];
                all_buttons.filter( (word) => {
                
                    let processed_val = process(word);
                    
                    if (processed_val == process(answer) || processed_val == process(question[0])) {
                        console.log("YES");
                    } else {
                        arr.push(word);
                    }                    
                })
               setAllButtons(arr);

            } else {
                setScore(score - 100);
                flash(`${question[0]} is not ${answer}! -100`, 1450, "dark");
            }
            
            setQuestion(["" , '', 'false']);
        } else {
            setQuestion([e.currentTarget.textContent, '',"true"]);        
        }
    };

        // Utility for Tool-Bar at the bottom, reusable user-component.    
   let left_reset_button = <a style={{marginLeft: "30px"}} onClick={reinit} class="button">Try Again</a>;
   let right_more_btn = <a class="button" href="/fsets">flashcards</a>
   
  return (
   <div className={styles.matching_content}>
  {console.log(all_buttons)}
           <div className={styles.matching_question}>
            <p style={{marginLeft: "25px"}}> {question[0] != "" && question[2] == 'true' && 'Question Picked: ' + question[0]} </p>
            <p> Winnings: {score}$ </p> 
          </div>

       {all_buttons.map((item, idx) => {
            return <a class="button" onClick={handleSubmission}
                style={{height: "75px", width: "150px", marginLeft: "25px", fontSize:"19px", textTransform:"lowercase", overflow:"hidden"}}>
                   {item}
                </a>;
        })}
 

                        
        <ToolBarComp 
    left = 
        {[left_reset_button]} 
    right = 
        {[right_more_btn]}
    />
          
              <div style={{height: "15px"}}> </div>
  
    </div>
    )
}


const FlashWrapper = styled.div`
    height: calc(100% - 15% - 50px);
    display:flex;
    width: 100%;
    justify-content: center;
`

const ContainerBelow = styled.div`
    width: 100%;
    height: auto;
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