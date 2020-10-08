import React,{ useState, useEffect} from 'react'
import "./AddImg.css"
import DropNCrop from '@synapsestudios/react-drop-n-crop';
import network from "../services/network"
import '@synapsestudios/react-drop-n-crop/lib/react-drop-n-crop.min.css';
import { Button } from '@material-ui/core';
const makeBlobed = async (img) =>{
    const  preBlobedImg  = await fetch(img)
    const blobedImg = await preBlobedImg.blob()
    return blobedImg
}

function AddImg() {
const [file,setFile] = useState({})
const [blobedImg,setBlobedImg] = useState(null)
const [loading,setLoading] = useState(true)

const onChange = async value => {
     await  network.post("/api/v1/image",{
        challengeId:4,img:value.src
    })
    setLoading(false)
    setFile(value);
  };

  useEffect(() => {
    (async ()=>{
        if(!loading){
            const {data : image } = await network.get("/api/v1/image?id=4")
            const hi = await makeBlobed(image.img)
            const hey = URL.createObjectURL(hi);
            setBlobedImg(hey)
        }
    })()
},[loading]);

    return (
        <>
        <div className="upload-img-container">
            <div className="upload-img-secondary-container">
            <DropNCrop maxFileSize={5145728} cropperOptions={{multiple:false,minCropBoxHeight:300,minCropBoxWidth:800,aspectRatio:400/150,zoomable:false}} onChange={onChange} value={file} />
        <Button variant="contained" color="secondary" onClick={()=>setFile({})} >
            Remove img
        </Button>
            </div>

        </div>
        {
            blobedImg 
            &&
            <img src={blobedImg} />
            
        }
        </>
    )

}

export default AddImg
