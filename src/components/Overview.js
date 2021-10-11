import React from 'react'
import { Nav } from 'react-bootstrap'

import styled from 'styled-components'
import styles from './styles/overview.module.css'; 

const OverviewContainer = (props) => {

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
    console.log(basePageItems);

  return (
    <ul className={styles.listcontentwrapper}>
        {basePageItems.map((item, idx) => {
            return <li className={styles.list_items}>
                        <div className={styles.text_content}> 
                            <h1> {item[0]} </h1> 
                            <p> {item[1]} </p> 
                            <div className={styles.links}>
                            <a className={styles.link_inside} href={item[3]}> Look Inside </a> 

                            {item[4]}
                            </div>
                        </div>
                        <div className={styles.picture_content}> 
                            <img className={styles.img_content} src={"/images/" + item[2]} /> 
                        </div>
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

export default OverviewContainer