import {Button,Grid} from '@material-ui/core'
import Cropper from "react-cropper";
import "cropperjs/dist/cropper.css";
import {useState,useRef} from 'react'


function dataURItoBlob(dataURI) {
  var byteString = atob(dataURI.split(',')[1]);

  var mimeString = dataURI.split(',')[0].split(':')[1].split(';')[0];

  var ab = new ArrayBuffer(byteString.length);
  var ia = new Uint8Array(ab);
  for (var i = 0; i < byteString.length; i++) {
      ia[i] = byteString.charCodeAt(i);
  }
  return new Blob([ab], {type: mimeString});
}

export default function Gropper({openCropper}){

    const [img,setImage] = useState('https://res.cloudinary.com/shandroid/image/upload/v1623151998/pigeon/ii0miky7uuffvbbqihpc.jpg')
    const [ar,setar] = useState(16/9)
    const cropperRef = useRef(null);
    const onCrop = () => {
      const imageElement = cropperRef?.current;
      const cropper= imageElement?.cropper;
      // cropper.setAspectRatio(ar)
      console.log(dataURItoBlob(cropper.getCroppedCanvas().toDataURL()));
      // console.log(cropper)
    }

    const uploadImg = async e=> {
      setloading(true)
      const imageElement = cropperRef?.current;
      const cropper= imageElement?.cropper;
      const blob = dataURItoBlob(cropper.getCroppedCanvas().toDataURL());
      const files = e.target.files
      const data = new FormData()
      data.append('file',blob)
      data.append('upload_preset','pigeon')
      
      const res = await fetch("https://api.cloudinary.com/v1_1/shandroid/image/upload",
      {
          method: 'POST',
          body:data
      })
      const file = await res.json()
      setImage(file.secure_url);
      setloading(false)
  } 

    return <div>
    {img?
    <div>
    <div><Grid container justify='center'><Grid item xs={12}><Button onClick={openCropper(false)} color='secondary' variant='outlined'>Done</Button></Grid><Grid item><Button onClick={()=>setar(16/9)}>16:9</Button></Grid><Grid item><Button onClick={()=>setar(9/16)}>9:16</Button></Grid>
</Grid></div>
     <Cropper
    src={img}
    style={{ height: 500, width: "100%" }}
    viewMode={1}
    aspectRatio={ar}
    guides={false}
    background={false}
    min
    // crop={onCrop}
   ref={cropperRef}
   />

   </div>:<div>
        <label style={{marginBottom:'1rem'}}htmlFor="contained-button-file">
        <input
        accept="image/*"
        id="contained-button-file"
        type="file"
        className='hidden'
      />
      </label>
     </div>} 
  </div>
}