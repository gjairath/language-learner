import React from 'react';
import {TiTick} from 'react-icons/ti'
import {FiX} from 'react-icons/fi'

const EditableForm = (props) => {
    
    const {save, cancel} = props;
    
    // 284-45
    
      return (
        <div class="input-group">
            {props.children}
          <div class="input-group-append" >
            <button class="btn btn-outline-secondary" style={{marginLeft:"190px", marginTop:"15px"}} type="button" onClick={save}>
                <TiTick/>
            </button>
            <button class="btn btn-outline-secondary" style={{marginLeft:"5px", marginTop:"15px"}} type="button" onClick={cancel}>
                <FiX/>
            </button>
          </div>
        </div>
          );
}

export default EditableForm
