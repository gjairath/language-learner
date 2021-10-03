import { React }from 'react'
import { ProgressBar } from 'react-bootstrap'

const Progress = (props) => {

    var {now} = props;
                
    return (
        <ProgressBar now={now} label={`${now}%`} visuallyHidden />
    )
}


export default Progress