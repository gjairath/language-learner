import React, { useEffect, useState } from "react";

import styled from 'styled-components'

import Faq from "react-faq-component";
import "./styles/faq.css"

const data = {
    title: "General Questions",
    rows: [
        {
            title: "How do I use this application?",
            content: `Read the About Page.`,
        },
        {
            title: "I am a Discord Moderator/Admin, I think this application is dumb, I want to complain.",
            content:
                "You can contact me at get-a-life@virgin.you",
        },
        {
            title: "I am a Polylinguist with a passion for learning languages, I have genuine useful feedback.",
            content: `Great! Contact me at: lang-learner-us@gmail.com`,
        },
        {
            title: "I enjoy high-quality memes, any suggestions?",
            content: `Always. Reddit has some pretty good stuff but honestly, finding exceptional memes is more science than
                      it is art. It takes alot of skill to do this right. r/dankmemes is great if you're into some PG-rated memes.
                      r/terriblefacebookmemes is my personal favorite. I intend on writing several blog posts about this so I
                      will definitely post it here as soon as I can.`,
        },
        {
            title: "How I cash in my winnings?",
            content: `Congratulations! Follow the instructions <a style="text-decoration: none;" href="https://youtu.be/JMcYVYbDGBU?t=43" target="_blank" rel="noreferrer noopener"> here. </a>`,
        },
        {
            title: "Can't I just use X/Y/Z instead? I mean if I wanted to I could use X/Y/Z instead.",
            content: `Ok.`,
        },
    ],
};


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


const OverviewFaq = () => {

    return (
        <div>
            <Faq
                data={data}
            />
            
                <div style={{height: "50px"}}> </div>

        </div>
    );
}


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
