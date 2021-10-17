import React, { useState, ChangeEvent } from 'react';

import  EditableForm  from "./EditableForm.js"

// My Attempt to make a super sexy editable header.

const EditableHeader = (props) => {

    const {initVal, id, dotted, disabled} = props;
    
    // Simple way to ensure reusability, set each field. 
        // Local storage is anyway not safe and only temporary until I migrate to a DB.

    const [isEditing, setIsEditing] = useState(false);
    const [value, setValue] = useState(localStorage.getItem(`EditedHeader-${id}`) || initVal);
    
    let style = {maxWidth: "15ch", overflow: "hidden", textOverflow:"clip"};
    
    if (dotted == true) {
        style = {
            maxWidth: "15ch", 
            overflow: "hidden",
            textOverflow:"clip",
            textDecoration: "underline #2fb2f0 dotted", 
            cursor:"pointer" 
        };
    }    

    const Edit = () => {
        setIsEditing(!isEditing);
    }
    
    const onSave = () => {
  
        setIsEditing(!isEditing);

        localStorage.setItem(`EditedHeader-${id}`, value);           
    }
    
    const onCancel = () => {
        setIsEditing(!isEditing);
    }
    
    const onEnterKey = (e) => {
        if (e.key === 'Enter' || e.keyCode === 13) {
            setIsEditing(!isEditing);
        }
    }
    
    const onChange = (e) => {
  
        e.preventDefault();
        
        let id = e.currentTarget.dataset.id;
        setValue(e.currentTarget.value);
     }


    if (isEditing && disabled == false) {
        return (
    <div>
      <EditableForm save={onSave} cancel={onCancel}>
        <input value={value} data-id={id} onChange={onChange} 
        style={{borderRadius: "5px", paddingLeft: "10px", fontSize:"2rem", width:"80%"}} 
        onKeyUp={onEnterKey}/>
      </EditableForm>
      </div>
        );
    }

  return (
    <h1 onClick={Edit} style={style} > {disabled == true && initVal} {disabled == false && value} </h1>
  );
};

export default EditableHeader