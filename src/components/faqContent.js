import React from 'react'

import styled from 'styled-components'
import styles from './styles/faq.module.css'; 

import {MdExpandMore} from 'react-icons/md'

const FaqContent = (props) => {


  return (
      <ContainerBelow>
          <WrapperBelow>
          
              < OverviewFaq>
              </OverviewFaq>
          
          </WrapperBelow>
      </ContainerBelow>
  )
}


const OverviewFaq = (props) => {
    // this is not very scalable, but im not gonna redo it so idc
    
     return (
        <section className={styles.general_questions}>
            
            <div className={styles.section_header}>
                <h1 className={styles.h}> General Questions </h1>
            </div>
            
            <div className={styles.divider}>
            </div>
            
            <div className={styles.section_desc}>
                <div className={styles.question}>
                    <div className={styles.question_title}>
                    How do I use this application?
                    </div>
                    
                    <div className={styles.question_icon}>
                        <MdExpandMore/>
                    </div>
                </div>
                
                <div className={styles.question}>
                    <div className={styles.question_title}>
                    I am a Discord Moderator/Admin, I think this application is dumb, I want to complain.
                    </div>
                    
                    <div className={styles.question_icon}>
                        <MdExpandMore/>
                    </div>
                </div>
            
                <div className={styles.question}>
                    <div className={styles.question_title}>
                    I am a Polylinguist with a passion for learning languages, I have genuine useful feedback.
                    </div>
                    
                    <div className={styles.question_icon}>
                        <MdExpandMore/>
                    </div>
                </div>
                
                <div className={styles.question}>
                    <div className={styles.question_title}>
                    I enjoy high-quality memes, any suggestions?
                    </div>
                    
                    <div className={styles.question_icon}>
                        <MdExpandMore/>
                    </div>
                </div>
                
                <div className={styles.question}>
                    <div className={styles.question_title}>
                    How I cash in my winnings?
                    </div>
                    
                    <div className={styles.question_icon}>
                        <MdExpandMore/>
                    </div>
                </div>
                
                <div className={styles.question}>
                    <div className={styles.question_title}>
                    Can't I just use X/Y/Z instead? [ok.]
                    </div>
                    
                    <div className={styles.question_icon}>
                        <MdExpandMore/>
                    </div>
                </div>
            </div>
                    
            
        </section>

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
    width: 69%; /* he he*/
    
    color: rgba(0,0,0,0.7);
    flex-direction: column;    
`

export default FaqContent