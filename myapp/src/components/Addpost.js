// import {useContext, useRef, useState,useEffect,useCallback} from 'react';
// import {AuthContext} from '../App';
// import { useHistory} from 'react-router-dom'
// import {useGoogleLogin} from 'react-google-login'
// import Accordion from '@material-ui/core/Accordion';
// import AccordionSummary from '@material-ui/core/AccordionSummary';
// import AccordionDetails from '@material-ui/core/AccordionDetails';
// import Typography from '@material-ui/core/Typography';
// import AddCircle from '@material-ui/icons/AddCircle';
// import { Grid } from '@material-ui/core';
// import Button from '@material-ui/core/Button';
// import TextField from '@material-ui/core/TextField';
// import ReactCrop from 'react-image-crop';
// import 'react-image-crop/dist/ReactCrop.css';


// export default function Addpost()
// {
//     const clientId='504774353232-i4ctofb91259kii33088t50e8cl2c2si.apps.googleusercontent.com'
//     const {signIn} = useGoogleLogin({client_id:clientId})
//     const [loading,setloading] = useState(false)
//     const context = useContext(AuthContext)
//     const [upImg, setUpImg] = useState();
//     const imgRef = useRef(null);
//     const previewCanvasRef = useRef(null);
//     const [crop, setCrop] = useState({ unit: '%', width: 30, aspect: 16 / 9,maxWidth:5 });
//     const [completedCrop, setCompletedCrop] = useState(null);
//     useEffect(()=>{
//         console.log(context.details)
//         if(!context.details)
//            signIn()
//      },[window.gapi])
//     const [autherr,setautherr] = useState(false)
//     let history = useHistory();
//     const cap = useRef('')
//     const [img,setImage]= useState(null)
//     const uploadImage = async e=> {
//         setloading(true)
//         const files = e.target.files
//         const data = new FormData()
//         data.append('file',files[0])
//         data.append('upload_preset','pigeon')
//         let filname=files[0].name.toLowerCase();
//         if(!(filname.endsWith('.jpg')||filname.endsWith('.png')||filname.endsWith('.jpeg')))
//           {
//             alert("Only '.png' , '.jpg' and '.jpeg' formats supported!");
//             return;
//           }          
//         const res = await fetch("https://api.cloudinary.com/v1_1/shandroid/image/upload",
//         {
//             method: 'POST',
//             body:data
//         })
//         const file = await res.json()
//         setImage(file.secure_url);
//         setloading(false)
//     }

//     const onLoad = useCallback((img) => {
//         imgRef.current = img;
//       }, []);
    
//       useEffect(() => {
//         if (!completedCrop || !previewCanvasRef.current || !imgRef.current) {
//           return;
//         }
    
//         const image = imgRef.current;
//         const canvas = previewCanvasRef.current;
//         const crop = completedCrop;
    
//         const scaleX = image.naturalWidth / image.width;
//         const scaleY = image.naturalHeight / image.height;
//         const ctx = canvas.getContext('2d');
//         const pixelRatio = window.devicePixelRatio;
    
//         canvas.width = crop.width * pixelRatio;
//         canvas.height = crop.height * pixelRatio;
    
//         ctx.setTransform(pixelRatio, 0, 0, pixelRatio, 0, 0);
//         ctx.imageSmoothingQuality = 'high';
    
//         ctx.drawImage(
//           image,
//           crop.x * scaleX,
//           crop.y * scaleY,
//           crop.width * scaleX,
//           crop.height * scaleY,
//           0,
//           0,
//           crop.width,
//           crop.height
//         );
//       }, [completedCrop]);

//       function generateDownload(canvas, crop) {
//         if (!crop || !canvas) {
//           return;
//         }
      
//         canvas.toBlob(
//           (blob) => {
//             const previewUrl = window.URL.createObjectURL(blob);
      
//             const anchor = document.createElement('a');
//             anchor.download = 'cropPreview.png';
//             anchor.href = URL.createObjectURL(blob);
//             anchor.click();
      
//             window.URL.revokeObjectURL(previewUrl);
//           },
//           'image/png',
//           1
//         );
//       }

//     function CropDemo({ src }) {
//         const [crop, setCrop] = useState({ aspect: 16 / 9 });
//         return <ReactCrop src={src} crop={crop} onChange={newCrop => setCrop(newCrop)} />;
//       }


//       const onSelectFile = (e) => {
//         if (e.target.files && e.target.files.length > 0) {
//           const reader = new FileReader();
//           reader.addEventListener('load', () => setUpImg(reader.result));
//           reader.readAsDataURL(e.target.files[0]);
//         }
//       };

//     function handleSubmit(e)
//     {   
//         e.preventDefault();  
               
//         fetch('https://interact-9535.herokuapp.com/posts/',{
//             method:'PUT',
//             headers:{'Content-Type':'application/json','Authorization':context.tok},
//             body: JSON.stringify({caption:cap.current.value, image:img}),
//         }).then((resp)=>{console.log(resp);history.push('/feed')})
        
        

//         // if (resp.status ===500 ){
//         //     setautherr(true)
//         // }
//         // else{
//         // const out = await resp.json()
//         // // context.user=out.user
//         // localStorage.setItem('user', JSON.stringify(out.user))
//         // context.setuser(out.user)
//         // setautherr(false)
//         // history.push('/')
//         // }
//         } 
//     // const [user,setuser] = useState(context.user)

//     return (<div style={{width:'100%',justifyContent:'center',display:'flex',paddingTop:'1rem'}}>
//             <Grid item xs={5}>
//             <Accordion>
//                 <AccordionSummary expandIcon={<AddCircle />}>
//                     Add post
//                 </AccordionSummary>
//                 <AccordionDetails>
//                 <div className='container d-flex mt-3 justify-content-center'>
//                 {/* <div className='card p-5'> */}
//                 <div>
//                  <form onSubmit={handleSubmit}>
//                     <div className='form-group'>
//                     <TextField
//                      style={{width:'100%',padding:'1rem'}}
//                      inputRef={cap}
//                      label="Caption"
//                      multiline
//                     rows={4}
//                     placeholder='caption'
//                     />
//                           <ReactCrop
//                  src={upImg}
//                  onImageLoaded={onLoad}
//                  crop={crop}
//                  onChange={(c) => setCrop(c)}
//                  onComplete={(c) => setCompletedCrop(c)}
//                         />
//                     {/* <div className='row d-flex justify-content-center'>
//                        <div className='col-12'> <textarea ref={cap} className='form-control m-2' placeholder='Caption' type='area'></textarea></div>
//                     </div> */}
//                     {/* <div className='row d-flex justify-content-center'>
//                        <div className='col-12'> <textarea ref={bio} defaultValue={context.details.bio} className='form-control m-2' placeholder='bio' type='area'></textarea></div>
//                     </div> */}
//                     <div className='row m-2'>
//                      <div className='col-6'><label>Upload image :</label></div>
//                      <div>
//         <input type="file" accept="image/*" onChange={onSelectFile} />
//       </div>
//                      {/* <input 
//               className = 'btn btn-secondary m-2 col-6'
//           type="file"
         
//           value={selectedFile}            
//           onChange={uploadImage}
//                />                  */}
        
//                  </div>
//                  <div>
//                  {loading?<div className="spinner-border" style={{width:"5rem", height: "5rem"}} role="status">
//   <span className="sr-only">Loading...</span>
// </div>:img?<div><img className='card-img-top vh-100' style={{objectFit:'contain',maxHeight:'30rem'}} src={img}></img></div>:<></>}
//                 </div>
//                  <div style={{width:'100%',justifyContent:'center',display:'flex'}}>
//                     <Grid ><Button variant='contained'color='primary' type='submit' onClick={handleSubmit}>Post</Button></Grid>
//                     </div>
//                     </div>
//                 </form>
//                 </div>
//             </div>
//                 </AccordionDetails>
//             </Accordion>
//             </Grid>
//             </div>
           
//     )
// } 
import {useContext, useRef, useState,useEffect} from 'react';
import {AuthContext} from '../App';
import { useHistory} from 'react-router-dom'
import {useGoogleLogin} from 'react-google-login'
import Accordion from '@material-ui/core/Accordion';
import AccordionSummary from '@material-ui/core/AccordionSummary';
import AccordionDetails from '@material-ui/core/AccordionDetails';
// import Typography from '@material-ui/core/Typography';
import AddCircle from '@material-ui/icons/AddCircle';
import { CircularProgress, Grid } from '@material-ui/core';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';

export default function Addpost()
{ 
    const clientId='504774353232-i4ctofb91259kii33088t50e8cl2c2si.apps.googleusercontent.com'
    const {signIn} = useGoogleLogin({client_id:clientId})
    const [loading,setloading] = useState(false)
    const context = useContext(AuthContext)
    useEffect(()=>{
        console.log(context.details)
        if(!context.details)
           signIn()
     },[window.gapi])
    const [autherr,setautherr] = useState(false)
    let history = useHistory();
    const cap = useRef('')
    const [img,setImage]= useState(null)
    const uploadImage = async e=> {
        setloading(true)
        const files = e.target.files
        const data = new FormData()
        data.append('file',files[0])
        data.append('upload_preset','pigeon')
        let filname=files[0].name.toLowerCase();
        if(!(filname.endsWith('.jpg')||filname.endsWith('.png')||filname.endsWith('.jpeg')))
          {
            alert("Only '.png' , '.jpg' and '.jpeg' formats supported!");
            return;
          }          
        const res = await fetch("https://api.cloudinary.com/v1_1/shandroid/image/upload",
        {
            method: 'POST',
            body:data
        })
        const file = await res.json()
        setImage(file.secure_url);
        setloading(false)
    }
    function handleSubmit(e)
    {   
        e.preventDefault();            
        fetch('https://interact-9535.herokuapp.com/posts/',{
            method:'PUT',
            headers:{'Content-Type':'application/json','Authorization':context.tok},
            body: JSON.stringify({caption:cap.current.value, image:img}),
        }).then((resp)=>{console.log(resp);history.push('/feed')})
        // if (resp.status ===500 ){
        //     setautherr(true)
        // }
        // else{
        // const out = await resp.json()
        // // context.user=out.user
        // localStorage.setItem('user', JSON.stringify(out.user))
        // context.setuser(out.user)
        // setautherr(false)
        // history.push('/')
        // }
        } 
    // const [user,setuser] = useState(context.user)

    return (<div style={{width:'100%',justifyContent:'center',display:'flex',paddingTop:'1rem'}}>
            <Grid direction='column'  item xs={11} lg={5} md={6} sm={8}> 
            <Accordion>
                <AccordionSummary expandIcon={<AddCircle />}>
                    Add post
                </AccordionSummary>
                <AccordionDetails>

                <div style={{width:'100%'}}>
                 <form onSubmit={handleSubmit}>
                    <Grid>
                    <Grid item xs ={12}> 
                    <TextField
                    fullwidth
                    style={{width:'100%',padding:'1rem'}}
                    inputRef={cap}
                    label="Caption"
                    multiline
                    rows={4}
                    />
                    </Grid>
                    <Grid item >
                     {/* <Button onClick={(e)=>{
                          e.preventDefault();
                          document.getElementById('file').trigger('click');
                     }} variant='outlined' color='secondary' for='file'>Upload image 
                     </Button>               
                     <input id='file'
                    type="file"
                    hidden
                    //  value={selectedFile}            
                     onChange={uploadImage}
                      />   */}
                      <input type="file" hidden onChange={uploadImage} id="file" /> 
                        <label for="file">click here to upload image</label>
                      </Grid>
                 <div>
                 {loading?<div style={{justifyContent:'center',display:'flex'}}><CircularProgress/></div>:
                 img?    <div style={{width:'100%',display:'flex', justifyContent:'center'}}>
                 <img style={{objectFit:'contain',maxHeight:'30rem',width:'100%'}} src={img}/>
                </div>:<></>}
                    {/* <img style={{objectFit:'contain',maxHeight:'30rem'}} src={post.img}/> */}

                </div>
                 <div style={{width:'100%',justifyContent:'center',display:'flex'}}>
                    <Grid ><Button variant='contained'color='primary' type='submit'>Post</Button></Grid>
                    </div>
                    </Grid>
                </form>
                </div>
                </AccordionDetails>
            </Accordion>
            </Grid>
            </div>
           
    )
} 