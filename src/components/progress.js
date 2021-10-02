import { React }from 'react'
import { ProgressBar } from 'react-bootstrap'
import "./styles/progress.css"

const Progress = (props) => {

    var {now} = props;
                
    return (
        <ProgressBar now={now} label={`${now}%`} visuallyHidden />
    )
}


export default Progress