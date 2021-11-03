import { React }from 'react'
import styled from 'styled-components'

const ToolBarComp = (props) => {

    const {left, right} = props;
    

    return (
    <ToolBar>
        <ToolBarWrapper style={{justifyContent: "flex-start"}}>
        {left.map((item, idx) => {
            return item;       
        })}
        
        </ToolBarWrapper>
        <ToolBarWrapper>
        
        {right.map((item, idx) => {
            return item;       
        })}
        
        </ToolBarWrapper>
    </ToolBar>
    )
}

const ToolBar = styled.div`
    background-color: rgba(254,245,218, 0.20);
    max-width: 960px;
    border-radius: 8px;
    display: flex;
    height: 40px;
    margin-top: 15px;
    margin-bottom: 5px;
`

const ToolBarWrapper = styled.div`
    display: flex;
    justify-content: flex-end;
    gap: 25px;
    
    height: 40px;
    width 50%;
`

export default ToolBarComp