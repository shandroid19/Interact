import {useContext, useRef, useState,useEffect} from 'react';
import {AuthContext} from '../App';
import { Redirect,Link,useHistory} from 'react-router-dom'
import {useGoogleLogin} from 'react-google-login'
export default function UserSettings()
{
    const clientId='504774353232-i4ctofb91259kii33088t50e8cl2c2si.apps.googleusercontent.com'
    // const {signIn} = useGoogleLogin({client_id:clientId})

    const context = useContext(AuthContext)
    // useEffect(()=>{
    //     if(!context.details)
    //        signIn()
    //  },[window.gapi])
    const [autherr,setautherr] = useState(false)
    let history = useHistory();
    const [cover,setcover]= useState(context.details.cover)
    const [dp,setdp]= useState(context.details.display)

    const uploadCoverImage = async e=> {
          
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
        setcover(file.secure_url);
    }

    const uploadImage = async e=> {
          
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
        setdp(file.secure_url);
    }

    async function handleSubmit(e)
    {   
        e.preventDefault();
        console.log(context.tok)
        fetch('http://localhost:8000/user',{
            method:'PUT',
            headers:{'Content-Type':'application/json','Authorization':context.tok},
            body: JSON.stringify({username:username.current.value,profilePicture:dp,coverPicture:cover,city:city.current.value,bio:bio.current.value}),
        }).then(()=>{history.push('/')})
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
    const username = useRef(context.details.username)
    const bio = useRef(context.details.bio)
    const city = useRef(context.details.city)
    return (
            
            <div className='container d-flex m-5 justify-content-center'>
                <div className='card p-5 col-sm-6'>
                    <h1>Edit profile</h1>
                 <form onSubmit={handleSubmit}>
                    <div className='form-group'>
                    <div className='row d-flex justify-content-center'>
                    <div className='col-sm-6'><input ref ={username} defaultValue={context.details.username} className=' form-control m-2' placeholder='username' type='text' ></input></div>

                    <div className='col-sm-6'><input ref={city} defaultValue={context.details.city} className=' form-control m-2' placeholder='city' type='text'></input></div>
                     </div>


                    <div className='row d-flex justify-content-center'>
                       <div className='col-12'> <textarea ref={bio} defaultValue={context.details.bio} className='form-control m-2' placeholder='bio' type='area'></textarea></div>
                    </div>


                    <div className='row m-2'>
                     <div className='col-6'><label>Display picture :</label></div>
                     <input 
              className = 'btn btn-secondary m-2 col-6'
          type="file"
         
         //  value={selectedFile}            
          onChange={uploadImage}
               />                 
                 </div>
                 <div className='row m-2'>
                     <div className='col-6'><label>Cover picture :</label></div>
                     <input 
              className = 'btn btn-secondary m-2 col-6'
          type="file"
         
         //  value={selectedFile}            
          onChange={uploadCoverImage}
               />                 
                 </div>
                 <div className='row d-flex justify-content-center'>
                    <button className='btn btn-success col-sm-4 m-2 ' type='submit'>Save</button>

                    </div>
                    </div>
                </form>
                </div>
            </div>
    )
} 