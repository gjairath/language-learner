import { React }from 'react'
import { ProgressBar } from 'react-bootstrap'
import styled from 'styled-components'

const ToolBarComp = (props) => {

    const {left, right} = props;
    console.log(right)

    return (
    <ToolBar>
        <ToolBarWrapper style={{justifyContent: "flex-start"}}>
            {left}
        </ToolBarWrapper>
        <ToolBarWrapper>
            {right[0]}
            {right[1]}
            {right[2]}
        </ToolBarWrapper>
    </ToolBar>
    )
}

const ToolBar = styled.div`
    background-color: rgba(254,245,218, 0.4);
    max-width: 960px;
    margin: 10px auto;
    border-radius: 8px;
    display: flex;
    height: 40px;
`

const ToolBarWrapper = styled.div`
    display: flex;
    justify-content: flex-end;
    gap: 25px;
    
    height: 40px;
    width 50%;
`

export default ToolBarComp