import React,{useMemo, useState} from 'react'
import {useDropzone} from 'react-dropzone'
import Cropper from 'react-cropper';
import 'cropperjs/dist/cropper.css';
import ImageCropper from 'react-image-file-cropper';
import 'react-image-file-cropper/cropper.css'; 
import "./AddImg.css"
function AddImg() {
const [file,setFile] = useState("")
    
const baseStyle = {
    flex: 1,
    maxWidth:"80vw",
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    padding: '20px',
    borderWidth: 2,
    borderRadius: 2,
    borderColor: '#eeeeee',
    borderStyle: 'dashed',
    backgroundColor: '#fafafa',
    color: 'gray',
    outline: 'none',
    transition: 'border .24s ease-in-out'
  };
  
  const activeStyle = {
    borderColor: '#2196f3'
  };
  
  const acceptStyle = {
    borderColor: '#00e676'
  };
  
  const rejectStyle = {
    borderColor: '#ff1744'
  };

  
    const {
        isDragActive,
        isDragAccept,
        isDragReject,
        acceptedFiles,
        fileRejections,
        getRootProps,
        getInputProps
      } = useDropzone({
          multiple:false,
        accept:  'image/*',
        onDrop:file=>{
            const setter = file[0]
            console.log(setter);
            setFile(setter)
        }
     });
      const style = useMemo(() => ({
        ...baseStyle,
        ...(isDragActive ? activeStyle : {}),
        ...(isDragAccept ? acceptStyle : {}),
        ...(isDragReject ? rejectStyle : {})
      }), [
        isDragActive,
        isDragReject,
        isDragAccept
      ]);
    //   console.log(acceptedFiles);
    //   const acceptedFileItems = (file)=>console.log(file);
    //    acceptedFiles.map(file => {

    //    return <li key={file.path}>
    //       {file.path} - {file.size} bytes
    //     </li>
    //   });
    
      const fileRejectionItems = fileRejections.map(({ file, errors }) => (
        <li key={file.path}>
          {file.path} - {file.size} bytes
          <ul>
            {errors.map(e => (
              <li key={e.code}>{e.message}</li>
            ))}
          </ul>
        </li>
      ));
      const onCrop = (blob)=> {
        console.log("onCrop ", blob);
      }
     
     const onChange= (file)=> {
        console.log("onChange ", file);
      }
    return (
        <div>
                <section className="container">
      <div {...getRootProps({ style})}>
        <input {...getInputProps()} />
        <p>Drag 'n' drop some files here, or click to select files</p>
        <em>(Only *.jpeg and *.png images will be accepted)</em>
      </div>
      <Cropper preview=".img-preview"  src={file} />
      <ImageCropper 
            cropper={true} 
            preview={true} 
            onCrop={onCrop} 
            onChange={onChange}
            aspectRatio={1/ 1}
        />
      <aside>
        <h4>Accepted files</h4>
        <ul>{}</ul>
        <h4>Rejected files</h4>
        <ul>{fileRejectionItems}</ul>
      </aside>
    </section>
        </div>
    )
}

export default AddImg
