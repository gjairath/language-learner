import React from 'react'
import { Nav } from 'react-bootstrap'

import styled from 'styled-components'

const ContentContainer = (props) => {

    const {basePageItems} = props;

  return (
      <ContainerBelow>
          <WrapperBelow>
          
              < Overview basePageItems={basePageItems} >
              </Overview>
          
          </WrapperBelow>
      </ContainerBelow>
  )
}


const Overview = (props) => {
    // item 0 has the name, item 1 has the icon

  const { basePageItems } = props;


  return (
    <ul className="list-content-wrapper">
        {basePageItems.map((item) => {
            return <li className="list-items">
                        <div className="text-content"> <h1> {item[0]} </h1> <p> {item[1]} </p> <a className="link-inside"> Look Inside </a> </div>
                        <div className="picture-content"> <img className="img-content" src={"/images/" + item[2]} /> </div>
                    </li>;
                          })}
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
    width: 69%; /* he he*/
    
    color: rgba(0,0,0,0.7);
    flex-direction: column;    
`

export default ContentContainer