import React from 'react'
import { Nav } from 'react-bootstrap'
import  EditableHeader  from "./EditableHeader.js"

import styled from 'styled-components'
import styles from './styles/overview.module.css'; 


const OverviewContainer = (props) => {

    const {basePageItems, style, styleWrapper, isDotted, disabled} = props;


  return (
      <ContainerBelow style={style}>
          <WrapperBelow style={styleWrapper}>
          
              < Overview basePageItems={basePageItems} isDotted={isDotted} disabled={disabled}>
              </Overview>
          
          </WrapperBelow>
      </ContainerBelow>
  )
}


const Overview = (props) => {
    // item 0 has the name, item 1 has the icon

    // this component is being used by other things, so its sloppy the item[4] -> item[8]
        // but thats fine because i intend on only showing 4 elements max.
        
    const { basePageItems, isDotted, disabled} = props;
    
    let more_div = <div className = {styles.link_inside}> More...TBD </div>

  return (
    <ul className={styles.listcontentwrapper} >
        {basePageItems.map((item, idx) => {
            return <li className={styles.list_items}>
                        <div className={styles.text_content}> 

                            <EditableHeader initVal={item[0]} id={idx} dotted={isDotted} disabled={disabled}/>
                            
                            <p> {item[1]} </p> 
                            <div className={styles.links}>
                            <a className={styles.link_inside} href={item[3]}>Look Inside</a> 

                            <a className={styles.link_inside}>{item[4]}</a> 
                            <a className={styles.link_inside} href={`/eams/${item[5]}`}>{item[5]}</a> 
                            <a className={styles.link_inside} href={`/eams/${item[6]}`}>{item[6]}</a> 
                            <a className={styles.link_inside} href={`/eams/${item[7]}`}>{item[7]}</a> 
                            {item[4] == "" && more_div}
                            </div>
                        </div>
                        <div className={styles.picture_content}> 
                            <img className={styles.img_content} src={"/images/" + item[2]} /> 
                        </div>
                    </li>;
                          })}

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
    width: 69%; /* he he*/
    
    color: rgba(0,0,0,0.7);
    flex-direction: column;    
`

export default OverviewContainer