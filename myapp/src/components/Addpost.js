import {useContext, useRef, useState,useEffect} from 'react';
import {AuthContext} from '../App';
import { useHistory} from 'react-router-dom'
import {useGoogleLogin} from 'react-google-login'
import Accordion from '@material-ui/core/Accordion';
import AccordionSummary from '@material-ui/core/AccordionSummary';
import AccordionDetails from '@material-ui/core/AccordionDetails';
import Typography from '@material-ui/core/Typography';
import AddCircle from '@material-ui/icons/AddCircle';
import { Grid } from '@material-ui/core';
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
        fetch('http://localhost:8000/posts/',{
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
            <Grid item xs={5}>
            <Accordion>
                <AccordionSummary expandIcon={<AddCircle />}>
                    Add post
                </AccordionSummary>
                <AccordionDetails>
                <div className='container d-flex mt-3 justify-content-center'>
                {/* <div className='card p-5'> */}
                <div>
                 <form onSubmit={handleSubmit}>
                    <div className='form-group'>
                    <TextField
                     style={{width:'100%',padding:'1rem'}}
                     ref={cap}
                     label="Caption"
                     multiline
                    rows={4}
                    placeholder='caption'
                    />
                    {/* <div className='row d-flex justify-content-center'>
                       <div className='col-12'> <textarea ref={cap} className='form-control m-2' placeholder='Caption' type='area'></textarea></div>
                    </div> */}
                    {/* <div className='row d-flex justify-content-center'>
                       <div className='col-12'> <textarea ref={bio} defaultValue={context.details.bio} className='form-control m-2' placeholder='bio' type='area'></textarea></div>
                    </div> */}
                    <div className='row m-2'>
                     <div className='col-6'><label>Upload image :</label></div>
                     <input 
              className = 'btn btn-secondary m-2 col-6'
          type="file"
         
         //  value={selectedFile}            
          onChange={uploadImage}
               />                 
                 </div>
                 <div>
                 {loading?<div className="spinner-border" style={{width:"5rem", height: "5rem"}} role="status">
  <span className="sr-only">Loading...</span>
</div>:img?<div><img className='card-img-top vh-100' style={{objectFit:'contain',maxHeight:'30rem'}} src={img}></img></div>:<></>}
                </div>
                 <div style={{width:'100%',justifyContent:'center',display:'flex'}}>
                    <Grid ><Button variant='contained'color='primary' type='submit' onClick={handleSubmit}>Post</Button></Grid>
                    </div>
                    </div>
                </form>
                </div>
            </div>
                </AccordionDetails>
            </Accordion>
            </Grid>
            </div>
           
    )
} 