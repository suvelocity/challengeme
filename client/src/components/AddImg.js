import React from 'react'
import "./AddImg.css"
import DropNCrop from '@synapsestudios/react-drop-n-crop';
import '@synapsestudios/react-drop-n-crop/lib/react-drop-n-crop.min.css';
import { Button } from '@material-ui/core';

function AddImg( { file, handleChange} ) {
  return (
    <>
      <div className="upload-img-container">
        <div className="upload-img-secondary-container">
        <DropNCrop maxFileSize={3145728} cropperOptions={{multiple:false,viewMode:1,minCropBoxHeight:300,minCropBoxWidth:800,aspectRatio:400/150,zoomable:false}} onChange={event => handleChange(event)} value={file} />
        <Button variant="contained" color="secondary" onClick={()=>handleChange({})} >
          remove image
        </Button>
          </div>
      </div>
    </>
  )
}

export default AddImg
