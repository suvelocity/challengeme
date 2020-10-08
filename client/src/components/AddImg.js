import React,{ useState, useEffect} from 'react'
import "./AddImg.css"
import DropNCrop from '@synapsestudios/react-drop-n-crop';
import network from "../services/network"
import '@synapsestudios/react-drop-n-crop/lib/react-drop-n-crop.min.css';
import { Button } from '@material-ui/core';
import Swal from "sweetalert2"

function AddImg() {
const [file,setFile] = useState({})
const [blobedImg,setBlobedImg] = useState(null)
const [loading,setLoading] = useState(true)

const onChange = async value => {
    //  await  network.post("/api/v1/image",{
    //     challengeId:3,img:value.src
    // })
    // setLoading(false)
    let i = new Image()
    i.src = value.src

    i.onload = () => { 
         const  width = i.width
         const  height = i.height
        console.log(width," ",height);
          if(width<800 ){
              Swal.fire("invalid image width","","error")
              setFile({})
          }
          else if( height< 300){
            Swal.fire("invalid image height","","error")
            setFile({})
          }
          else{
      
              console.log(value.src.offsetHeight,);
              setFile(value);
          }
    }

  };

  useEffect(() => {
    (async ()=>{
        if(!loading){
            const {data : image } = await network.get("/api/v1/image?id=4")
            setBlobedImg(image.img)
        }
    })()
},[loading]);

    return (
        <>
        <div className="upload-img-container">
            <div className="upload-img-secondary-container">
            <DropNCrop maxFileSize={5145728} cropperOptions={{multiple:false,minCropBoxHeight:300,minCropBoxWidth:800,viewMode:1,aspectRatio:400/150,zoomable:false}} onChange={onChange} value={file} />
        <Button variant="contained" color="secondary" onClick={()=>setFile({})} >
            Remove img
        </Button>
            </div>

        </div>
        {/* {
            file 
            && */}
            <img src={file.src} />
            
        {/* } */}
        </>
    )

}

export default AddImg
