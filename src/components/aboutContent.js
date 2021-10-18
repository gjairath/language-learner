import React from 'react'

import styled from 'styled-components'
import styles from './styles/about.module.css'; 


const AboutContent = (props) => {


  return (
      <ContainerBelow>
          <WrapperBelow>
          
              < Overview>
              </Overview>
          
          </WrapperBelow>
      </ContainerBelow>
  )
}


const Overview = (props) => {
    // change this item to add to this about page without having to copy paste 600 things
    let basePageItems = [ ['Flashcards', 'Place and Print all your learned words in one place.'], 
                          ['Quiz', ''], 
                          ['Mnemonics', 'Fun examples go here'], 
                          ['Resources', 'I dont own any of this or have sponsors.'] ];
     return (
    <ul className={styles.listcontentwrapper} >

       <li className={styles.list_items}>
                <div className={styles.text_content}> 
                   
                    <h1> Flashcards </h1>
                    <p> Place and Print all your learned words in one place. </p>

                    <p> </p>
                    <p> Create various sets for any language you may want to learn. </p>                     
                    <img className={styles.img_content} src="/images/about_example1.png"/>

                    <p> </p>
                    <p> Change the name of the decks by clicking on it twice. </p>                     
                    <img className={styles.img_content} src="/images/about_example2.png"/>
    
                </div>
            </li>;         

        <li className={styles.list_items}>
                <div className={styles.text_content}> 
                   
                    <h1> Quiz </h1>
                    <p> Learn those words in the same place with various forms of quizzes </p> 
    
                </div>
            </li>;         
    <div style={{height: "60px"}}> </div>

    </ul>
  );
};


const ContainerBelow = styled.div`
    width: 100%;
    height: 85%;
    
    justify-content: center;    
    display: flex;
`

const WrapperBelow = styled.div`
    font-family: "Denso Var", sans-serif;
    display: flex;
    align-items: center;
    
    height: 100%;
    width: 60%; /* he he*/
    
    color: rgba(0,0,0,0.7);
    flex-direction: column;    
`

export default AboutContent