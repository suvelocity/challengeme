import React,{ useState} from 'react'
import "./AddImg.css"
import DropNCrop from '@synapsestudios/react-drop-n-crop';

import '@synapsestudios/react-drop-n-crop/lib/react-drop-n-crop.min.css';
import { Button } from '@material-ui/core';
function AddImg() {
const [file,setFile] = useState({})
const [blobedImg,setBlobedImg] = useState(null)
const onChange = value => {
    // const reader = new FileReader();
    // let pizza = reader.readAsDataURL(value.src); 
    // console.log(pizza);
    console.log(value.src);
    
    fetch(value.src)
    .then(res => res.blob())
    .then(res=>setBlobedImg(res))

    setFile(value);
  };



  

    return (
        <>
        <div className="upload-img-container">
            <div className="upload-img-secondary-container">
            <DropNCrop maxFileSize={5145728} cropperOptions={{multiple:false,minCropBoxHeight:300,minCropBoxWidth:800,aspectRatio:400/150}} onChange={onChange} value={file} />
        <Button variant="contained" color="secondary" onClick={()=>setFile({})} >
            Remove img
        </Button>
            </div>

        </div>
        {
            blobedImg
            &&
            <img src={URL.createObjectURL(blobedImg)} />
            
        }
        </>
    )

}

export default AddImg
