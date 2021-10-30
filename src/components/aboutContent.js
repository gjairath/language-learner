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
    // this is not very scalable, but im not gonna redo it so idc
    
     return (
    <ul className={styles.listcontentwrapper} >
                    <h1> Flashcards </h1>

       <li className={styles.list_items}>
                <div className={styles.text_wrapper}>
                
                    <div className={styles.text_content_left}>
                        <img className={styles.img_content} src="/images/about_example1.png"/>
                    </div>
    
                    <div className={styles.text_content_right}>
                        <p> Create decks for any language you may want to learn. </p>                     
                    </div>
                    
                </div>
                
                
                <div className={styles.text_wrapper}>
                
                    <div className={styles.text_content_left}>
                        <img className={styles.img_content} src="/images/about_example2.png"/>
                    </div>
    
                    <div className={styles.text_content_right}>
                        <p> Change the name of the decks by clicking on it. </p>                     
                    </div>
                    
                </div>
                
                <div className={styles.text_wrapper}>
                    <div className={styles.text_content_left}>
                        <img className={styles.img_content} src="/images/about_example3.png"/>
                    </div>
    
                    <div className={styles.text_content_right}>
                        <p> Place and Print all your learned words in one place. </p>
                    </div>                    
                </div>                

        </li>;         
        
        <li id="learn" className={styles.list_items}>
                <h1> Learn </h1>
                
                <div className={styles.text_wrapper}>
                
                    <div className={styles.text_content_left}>
                        <img className={styles.img_content} src="/images/about_example7.png"/>
                    </div>
    
                    <div className={styles.text_content_right}>
                    <p> WIP. [Work In Progress]. </p> 
                    </div>
                    
                </div>                
                
 
         </li>

        <li className={styles.list_items}>
                <h1> Mnemonics </h1>
                
                <div className={styles.text_wrapper}>
                
                    <div className={styles.text_content_left}>
                        <img className={styles.img_content} src="/images/about_example7.png"/>
                    </div>
    
                    <div className={styles.text_content_right}>
                    <p> TO BE DONE. </p> 
                    <p> Note to self: This requires a database and other stuff beyond my technical expertise as of now. </p>
                    </div>
                    
                </div>                
                
 
         </li>
         
        <li className={styles.list_items}>
                <h1> Quiz </h1>

                
                <div className={styles.text_wrapper}>
                
                    <div className={styles.text_content_left}>
                        <img className={styles.img_content} src="/images/about_example6.png"/>
                    </div>
    
                    <div className={styles.text_content_right}>
                    <p> Review concepts with mouse or arrow keys. </p> <p> (left, space, right) </p> 
                    </div>
                    
                </div>             
                <div className={styles.text_wrapper}>
                
                    <div className={styles.text_content_left}>
                        <img className={styles.img_content} src="/images/about_example4.png"/>
                    </div>
    
                    <div className={styles.text_content_right}>
                    <p> Learn those words in the same place with quizzes. </p> 
                    <p> The difficulty can be increased or decreased. </p>
                    <p> The score increases with difficulty and incurs a massive penalty if the timer runs out. </p>
                    <p> </p>
                    
                    <p> The timer can be stopped by making it easier. </p>
                    </div>
                    
                </div>
                
                
                <div className={styles.text_wrapper}>
                
                    <div className={styles.text_content_left}>
                        <img className={styles.img_content} src="/images/about_example5.png"/>
                    </div>
    
                    <div className={styles.text_content_right}>
                    <p> Matching is another variant of quizzes. </p> 
                    <p> The questions shuffle each time after picking one to ensure mastery. </p>
                    </div>
                    
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
    width: 80%; /* he he*/
    
    color: rgba(0,0,0,0.7);
    flex-direction: column;    
`

export default AboutContent