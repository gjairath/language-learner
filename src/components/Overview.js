import React, { useState } from "react";
import { Nav, Dropdown, DropdownButton } from 'react-bootstrap'
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
    
    const [dropDownVal, setDropDownVal] = useState("Deck A");
    
    console.log(basePageItems);
    console.log(dropDownVal)
    // the 7th item is a wildcard entry its a scrolly 

  return (
    <ul className={styles.listcontentwrapper} >
        {basePageItems.map((item, idx) => {
            return <li className={styles.list_items}>
                        <div className={styles.text_content}> 

                            <EditableHeader initVal={item[0]} id={idx} dotted={isDotted} disabled={disabled}/>

                            <p> {item[1]} </p> 
                            <div className={styles.links}>
                            <a className={styles.link_inside} href={item[3] + "/" + dropDownVal[5]}>Look Inside</a> 

                            <a className={styles.link_inside}>{item[4]}</a> 
                            <a className={styles.link_inside}>{item[5]}</a> 

                            {item[7] != undefined && 
                            <DropdownButton className={styles.dropdown_link} 
                            variant="outline-secondary" size='sm' 
                            id="dropdown-basic-button" title={dropDownVal}>
                                {item[7].map((item, idx) => {
                                 return <Dropdown.Item onClick={(e) => setDropDownVal(e.target.textContent)}>Deck {item}</Dropdown.Item>

                                    })}
                            </DropdownButton>

                            
                            }                                                        

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