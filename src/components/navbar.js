import React from 'react'
import { Nav } from 'react-bootstrap'
import {GoSignOut} from 'react-icons/go'
import styled from 'styled-components'

import { getAuth } from "firebase/auth";

const NavBar = () => {

    const auth = getAuth();
    const logout = () => {
        auth.signOut();
    };
  return (
      <NavBarContainer>
          <NavBarWrapper style={{marginLeft:"15px"}}>
            <Nav defaultActiveKey="/home" as="ul">
              <Nav.Item as="li">
                <Nav.Link href="/home">Home</Nav.Link>
              </Nav.Item>
              <Border> </Border>
              <Nav.Item as="li">
                <Nav.Link href="/about" eventKey="link-1">About</Nav.Link>
              </Nav.Item>
             <Border> </Border>
              <Nav.Item as="li">
                <Nav.Link href="/faq" eventKey="link-2">FAQ</Nav.Link>
              </Nav.Item>
            </Nav>

            <a href="" title="Log-out" 
                    style={{marginLeft: "25px", marginBottom: "8px"}} 
                    onClick={logout}>
                <GoSignOut/>
            </a>
                
        </NavBarWrapper>
    </NavBarContainer>
  )
}

const Border = styled.div`    
  content: '';
  height: 12px; //You can change this if you want smaller/bigger borders
  width: 1px;
  margin-top: 13px;
  background-color: rgba(0,0,0,0.2);
`

const NavBarContainer = styled.div`
    width: 100%;
    
    display: flex;
    justify-content: center;
`

const NavBarWrapper = styled.div`
    font-family: "Denso Var", sans-serif;
    display: flex;
    align-items: center;
    
    height: 15%;
    width: 69%; /* he he*/
    
    padding-top: 2.5rem;
    padding-bottom: 1.3rem;
    color: palevioletred;
    justify-content: center;
    
    border-bottom: 0.093rem solid rgba(0,0,0,0.2);
`

export default NavBar