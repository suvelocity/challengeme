import React,{useMemo, useState} from 'react'
import "./AddImg.css"
import DropNCrop from '@synapsestudios/react-drop-n-crop';

import '@synapsestudios/react-drop-n-crop/lib/react-drop-n-crop.min.css';
import { Button } from '@material-ui/core';
function AddImg() {
const [file,setFile] = useState("")
const onChange = value => {
    setFile(value);
  };



  

    return (
        <div className="upload-img-container">
            <div className="upload-img-secondary-container">
            <DropNCrop cropperOptions={{aspectRatio:400/150,height:200}} onChange={onChange} value={file} />
        <Button variant="contained" color="secondary" contained onClick={()=>setFile("")} >
            Remove img
        </Button>
            </div>

        </div>
    )
}

export default AddImg
