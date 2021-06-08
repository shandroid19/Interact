// import {useContext, useRef, useState} from 'react';
// import {AuthContext} from '../App';
// import { useHistory} from 'react-router-dom'
// import { GoogleLogin } from 'react-google-login';
// import { refreshTokenSetup } from './refreshToken';
// import { GoogleLogout } from 'react-google-login';
// import {useGoogleApi} from 'react-gapi'
// import { useGoogleLogin } from 'react-google-login'



// const Memer = require("random-jokes-api");
// const clientId ='504774353232-i4ctofb91259kii33088t50e8cl2c2si.apps.googleusercontent.com'
// function Login() {
//     const context = useContext(AuthContext)
// const [autherr,setautherr] = useState(false)
// let history = useHistory();
//   const [signin,setsignin] = useState(false);
//   const [details,setdetails] = useState({});
//   const [loading,setloading] = useState(false);
//   const username = useRef(null)
// const bio = useRef(null)
// const dp = useRef(null)
// const cover = useRef(null)
// const city = useRef(null)

//   const onSuccess = async (res) => {
//     // setloading(true)
//     var id_token = res.getAuthResponse().id_token;
//     setdetails(res.profileObj)
//     console.log('Login Success: currentUser:', res.profileObj);
//     try {
//         const resp = await fetch('http://localhost:8000/auth/login',{
//         method:'POST',
//         body: JSON.stringify({userId:res.profileObj.googleId,id_token:id_token}),
//         headers:{'Content-Type':'application/json'}
//     })
//     const out = await resp.json()
//     console.log(out)
//     if(resp.status===200 || resp.status===204){
//         history.push('/')
//         console.log(out)
//         setsignin(false)
//     }
//     else{
//         setsignin(true)
//         console.log('user not found')
//     }
//     setloading(false)

//     }
//     catch(err){
//         console.log(err)
//     }
//     refreshTokenSetup(res);
//   };

//   const onFailure = (res) => {
//     console.log('Login failed: res:', res);
//     alert(
//         "Wrong username or password"
//       );
//   };
//   // const logout = (res)=>{}


//   async function handleSubmit(e)
//   {   
//       e.preventDefault();
//       const resp= await fetch('http://localhost:8000/auth/signup',{
//           method:'POST',
//           body: JSON.stringify({userId:details.googleId,email:details.email,username:username.current.value,name:details.name,profilePicture:details.imageUrl,coverPicture:cover.current.value,city:city.current.value,bio:bio.current.value}),
//           headers:{'Content-Type':'application/json'}
//       })
//       if (resp.status ===500 ){
//           setautherr(true)
//       }
//       else{
        
//       const out = await resp.json()
//       console.log(out)
//       localStorage.setItem('user', JSON.stringify(out.user))
//       context.setuser(out.user)
//       setautherr(false)
//       history.push('/')
//       }
//       } 

//   const logout = ()=>{console.log('logged out');window.location.reload();}

//   const joke = Math.floor(Math.random() * 2)?<h5>{Memer.pun()}</h5>:<h5>{Memer.antijoke()}</h5>

//   return (
//       <div className='row d-flex justify-content-center'>
//           <div className='card col-5 p-5'>
//     <div className='row d-flex justify-content-center'>
//     <div className='row'>
//                     {joke}
//                   <h5>You can login now if you're happy .....</h5>
//                   <p>Not happy? click <button className='btn btn-secondary' onClick={()=>window.location.reload()}>here</button> for another joke</p>
//                   </div>

//       {      loading?<div className="spinner-border" role="status">
//       <span className="sr-only">Loading...</span>
//       </div>
//         :!signin?
//         <div className='col-6 justify-content-center d-flex p-2 pb-5'>
//       <GoogleLogin
//         clientId={clientId}
//         redirectUri={'/'}
//         buttonText="Login"
//         onSuccess={onSuccess}
//         onFailure={onFailure}
//         cookiePolicy={'single_host_origin'}
//         isSignedIn={true}
        
//       /> 

//            </div>
//       :
//       <div>
//         <h2>Sign in</h2>
//               <div >
//                 <form onSubmit={handleSubmit}>
//                     <div className='form-group'>
//                         <div className='row'>
//                     <div className='col-2 m-2'>
//                       {console.log(details)}
//                     <img src={details.imageUrl}></img></div>
//                     <div className='col-9 m-2'>
//                     <div className='row d-flex justify-content-center'>
//                     <div className='col-12'><input ref={username} className=' form-control m-2' placeholder='username' type='text' ></input></div>
//                      </div>
//                     <div className='row d-flex justify-content-center'>
//                        <div className='col-12'> <input ref={city}  className='form-control m-2' placeholder='city' type='text'></input></div>
//                     </div>
//                     </div>
//                     </div>
//                     <div className='row d-flex justify-content-center'>
//                        <div className='col-12'> <textarea ref={bio} className='form-control m-2' placeholder='bio' type='area'></textarea></div>
//                     </div>
//                     <div className='row d-flex justify-content-center'>
//                        <div className='col-12'> <input ref={cover} className='form-control m-2' placeholder='cover' type='text'></input></div>
//                     </div>
//                     <div className='row d-flex justify-content-center'>
//                     <button className='btn btn-primary col-sm-4 m-2 ' type='submit'>Signup</button>

//                     </div>
//                     </div>
//                 </form>
//                 {autherr?<div className='card' style={{backgroundColor:'#facfeb',border:'red'}}>user already exists</div>:<></>}
//                 <p>already have an account? log in </p><a onClick={()=>setsignin(false)}>here</a>
//                 <GoogleLogout
//                  clientId="504774353232-i4ctofb91259kii33088t50e8cl2c2si.apps.googleusercontent.com"
//                   buttonText="Logout"
//                   onLogoutSuccess={logout}
//                   >
//                 </GoogleLogout>
//             </div>

//       </div>  }
//     </div>
//     </div>
//     </div>
//   );
// }

// export default Login;


// // import { useGoogleLogin } from 'react-google-login'
// // import { GoogleLogin,GoogleLogout } from 'react-google-login';

// // export default function Login(){
// //   const responseGoogle = (response) => {
// //     console.log(response);
// //   }
// //   const logout = ()=>{console.log('logged out')}
// //   return ( <div> <GoogleLogin
// //     clientId="504774353232-i4ctofb91259kii33088t50e8cl2c2si.apps.googleusercontent.com"
// //     buttonText="Login"
// //     onSuccess={responseGoogle}
// //     onFailure={responseGoogle}
// //     isSignedIn={true}
// //     cookiePolicy={'single_host_origin'}
// //   />    <GoogleLogout
// //   clientId="504774353232-i4ctofb91259kii33088t50e8cl2c2si.apps.googleusercontent.com"
// //   buttonText="Logout"
// //   onLogoutSuccess={logout}
// // >
// // </GoogleLogout></div>)
// // }

import {useState,useRef, useContext,useEffect} from 'react'
import {useHistory,Redirect} from 'react-router-dom'
import {AuthContext} from '../App'
import { useGoogleLogin} from 'react-google-login';



export default function Signup(){
   const bio = useRef(null)
const dp = useRef(null)
const cover = useRef(null)
const username = useRef(null)

const clientId='504774353232-i4ctofb91259kii33088t50e8cl2c2si.apps.googleusercontent.com'
const {signIn} = useGoogleLogin({client_id:clientId})
const city = useRef(null)
// const [details,setdetails] = useState({imageUrl:'',userId:'',name:'',imageUrl:'',email:'',profilePicture:'',coverPicture:''})
const [autherr,setautherr] = useState(null)
const [filedata,setData] = useState(null)
const [loading,setLoading] = useState(false)
   const history = useHistory();
   const context = useContext(AuthContext);

   useEffect(()=>{
      if(!window.gapi)
         signIn()
   },[window.gapi])
   // console.log(context)
   // setdetails(context.user)
   // console.log(context)
//    function onf(ob){
//       setdetails(ob.profileObj);
//       setok(ob.profileObj.tokenObj.id_token)
//    }
//    const {signIn} = useGoogleLogin({clientId:clientId,onSuccess:onf,isSignedIn:true})

//    // signIn()

   async function handleSubmit(e)
  {   
      e.preventDefault();
      const resp= await fetch('http://localhost:8000/auth/signup',{
          method:'POST',
          body: JSON.stringify({userId:context.user.googleId,email:context.user.email,username:username.current.value,name:context.user.name,profilePicture:context.user.imageUrl,coverPicture:filedata,city:city.current.value,bio:bio.current.value}),
          headers:{'Content-Type':'application/json','Authorization':context.tok}
      })
      if (resp.status ===500 ){
          setautherr(true)
      }
      else{
      const out = await resp.json()
      console.log(out)
      // localStorage.setItem('user', JSON.stringify(out.user))
      // context.setuser(out.user)
      setautherr(false)
      console.log('done')
      history.push('/')
      window.location.reload()
      }
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
           setLoading(true)
           
         const res = await fetch("https://api.cloudinary.com/v1_1/shandroid/image/upload",
         {
             method: 'POST',
             body:data
         })
         const file = await res.json()
         setData(file.secure_url);
         setLoading(false)
     }

return (<div>
   {/* {console.log(filedata)} */}
   {context.user?
   <div className='row justify-content-center d-flex'>
   <div className='card col-5 p-sm-5 m-sm-5 m-2 p-2'>
         <h2>Sign in</h2>
               <div>
                 <form onSubmit={handleSubmit}>
                     <div className='form-group'>
                         <div className='row m-2'>
                     <div className='col-4'>
                       {/* {console.log(details)} */}
                     <img className = 'mt-3 mr-2'style={{borderRadius:'50%',border: '3px solid white'}} src={context.user.imageUrl}></img>
                     </div>
                     <div className='col-8 pt-3'>
                     <div className='row d-flex justify-content-center'>
                        <div className='col-12'> <h5>{context.user.name}</h5></div>
                     </div>
                     <div className='row d-flex justify-content-center'>
                        <div className='col-12'> <p>{context.user.email}</p></div>
                     </div>
                     </div>

                     </div>
                     <div className='row d-flex justify-content-center'>
                     <div className='col-6'><input ref={username} className=' form-control m-2' placeholder='username' type='text' ></input></div>
                        <div className='col-6'> <input ref={city}  className='form-control m-2' placeholder='city' type='text'></input></div>
                     </div>
                     <div className='row d-flex justify-content-center'>
                        <div className='col-12'> <textarea ref={bio} className='form-control m-2' placeholder='bio' type='area'></textarea></div>
                     </div>
                     
                     <div className='row m-2'>
                     <div className='col-6'><label>Cover picture :</label></div>
                     <input id='file'
              className = 'btn btn-secondary m-2 col-6'
          type="file"
         
         //  value={selectedFile}            
          onChange={uploadImage}
               />                 
                 </div>
                     <div className='row d-flex justify-content-center'>
                     <button className='btn btn-primary col-sm-4 m-2 ' type='submit'>Signup</button>

                     </div>
                     </div>
                     </form>
                     </div>
                     </div>
                     </div>
                     :<></>}

                     </div>)
   }