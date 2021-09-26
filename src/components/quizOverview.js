import React, { useState, useEffect, useRef } from "react";

import { Nav } from 'react-bootstrap'
import { FaLongArrowAltRight, FaLongArrowAltLeft } from 'react-icons/fa';
import {GiCardExchange} from 'react-icons/gi'
import styled from 'styled-components'

import './styles/quizOverview.css';

const ContentContainer = (props) => {
    
  return (
      <ContainerBelow>
          <OptionsWrapper>
                <a class="button">Normal</a>
                <a class="button">Multiple-Choice</a>
                <a href="#" class="button">Match</a>
          </OptionsWrapper>
          
          <Overview>
          </Overview>
          
      </ContainerBelow>
  )
}

const Overview = (props) => {

  return (
  
  <div className="flash-wrapper">
      <div className="flash-content">
          <div className="question-title">
            Question 1 of 20
          </div>
          
          <div className="card">
              Shit
          </div>
          
          <div className="card-toolbar">
                <a class="button">
                    <FaLongArrowAltLeft/>
                </a>
                
                <a class="button">
                    <GiCardExchange/>
                </a>
                
                <a class="button">
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