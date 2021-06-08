// import Home from "./pages/home/Home";
// import Profile from "./pages/profile/Profile";
import React from 'react';
import Register from "./components/Register";
import Body from "./components/Body";
import 'bootstrap/dist/css/bootstrap.min.css'
import './App.css'
import Grid from '@material-ui/core/Grid'
import AccountCircle from '@material-ui/icons/AccountCircle'
import AppBar from '@material-ui/core/AppBar'
import Toolbar from '@material-ui/core/Toolbar'
import IconButton from '@material-ui/core/IconButton'
import Typography from '@material-ui/core/Typography'
import Button from '@material-ui/core/Button'
import InputBase from '@material-ui/core/InputBase'
import Search from '@material-ui/icons/Search'
import Feed from './components/Feed'
import User from './components/User'
import GLogin from "./components/GLogin"
import UserSettings from './components/UserSettings'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faUserEdit } from '@fortawesome/free-solid-svg-icons'
import { GoogleLogin,GoogleLogout} from 'react-google-login';
import {
  useRouteMatch,
  useHistory,
  BrowserRouter as Router,
  Switch,
  Route,
  Link,
  Redirect
} from "react-router-dom";
import { useContext,useState,createContext,useEffect } from "react";
export const AuthContext = createContext()
const clientId ='504774353232-i4ctofb91259kii33088t50e8cl2c2si.apps.googleusercontent.com'
function App() {
  const history = useHistory() 

  // const us = JSON.parse(localStorage.getItem('user'))
  // const tok = JSON.parse(localStorage.getItem('token'))
  const [tok,setok] = useState(null)
  const [signin,setsignin] = useState(false);
  const [details,setdetails] = useState(null);
  const [loading,setloading] = useState(false);
  const [user,setuser] = useState(null)
  const [current,setCurrent] = useState(null)
  // const logout = async ()=>{await fetch('http://localhost:8000/auth/logout',{
  //   method:'GET',headers:{'Content-Type':'application/json','Authorization':"bearer "+tok}})
  // localStorage.clear();
  //  setuser({})
  // }
  useEffect(()=>{
    let obj;
    if(window.gapi){
    window.gapi.load('auth2',()=>{
      window.gapi.auth2.init({
        client_id:clientId
      }).then(()=>{
        obj = window.gapi.auth2.getAuthInstance()
        if(obj.isSignedIn.get()){

          let profile = obj.currentUser.get().getBasicProfile()
          setuser({googleId:profile.getId(),
            imageUrl:profile.getImageUrl(),
            email:profile.getEmail(),
            givenName:profile.getGivenName(),
            name:profile.getName()
          })
         const tokk = obj.currentUser.get().getAuthResponse().id_token
          setok(tokk)
        }
      }).catch((err)=>{console.log(err)})
    })
  }
  },[])


  useEffect(()=>{

    if(user){
      getresp()
    }
  },[tok,details])
//   function oSuccess(obj){  
//   console.log(obj)
//   setuser(obj.profileObj);setok(obj.tokenObj.id_token);
//   if (history!==undefined){
//     history.push('/signup')
//   }
// }
  // const {signIn,loaded} = useGoogleLogin({clientId:clientId,onSuccess:oSuccess,isSignedIn:true})
  const logout = ()=>{console.log('logged out');window.location.reload();}
  // signIn()
  async function getresp(){
        const resp = await fetch('http://localhost:8000/auth/login',{
        method:'POST',
        body: JSON.stringify({userId:user.googleId}),
        headers:{'Content-Type':'application/json','Authorization':tok}
    })
       const out =await resp.json()
      //  if(!localStorage.getItem('user'))
      //       localStorage.setItem('user',JSON.stringify(out.user[0]))
        
    if(resp.status===200 || resp.status===204){
        if(!details)
        setdetails(out.user)
        setsignin(false)
        // console.log('yo')
    }
    else{
        setsignin(true)
        console.log('user not found')
        // window.location = "http://localhost:3000/signup";

      // return <Redirect to='/signup'>
      }
  }


  const onSuccess = res=>{
    // setuser(res.profileObj);
    // setok(res.tokenObj.id_token);
    window.location.reload()
  }
  const onFailure = (res) => {
    setuser({})
    console.log('Login failed: res:', res);
    alert(
        "Wrong username or password"
      );
  };
  

  return (

    <AuthContext.Provider value={{user,setuser,tok,details}}>
    
    <Router>
      <Switch> 
        <div>
          <AppBar position='static'>
        <Toolbar>
          <Grid container>
          <Typography variant="h6">
          Pigeon
          </Typography>
  
         <Search/>

         <div style={{marginLeft:'auto'}}>  
         <Grid container>
           <Grid item xs={4}>  
         <Link style={{textDecoration:'None',color:'white',marginLeft:'2rem'}} to='/user'>User</Link>
          </Grid>    
          <Grid item xs={4}>    
        <Link style={{textDecoration:'None',color:'white',marginLeft:'2rem'}} to='/settings'>Edit</Link>
          </Grid>
        <Grid item xs={4}> 
        {user?
         <div>
          <GoogleLogout
          clientId="504774353232-i4ctofb91259kii33088t50e8cl2c2si.apps.googleusercontent.com"
          buttonText="Logout"
          onLogoutSuccess={logout}>
          </GoogleLogout>
          </div>
         :<div>
         <GoogleLogin
        clientId={clientId}
        redirectUri={'/'}
        buttonText="Login"
        onSuccess={onSuccess}
        cookiePolicy={'single_host_origin'}
        isSignedIn={true}></GoogleLogin></div>
        }
        </Grid>
        </Grid>
 
          </div>
          </Grid>
          </Toolbar>
        </AppBar>
         <nav className="navbar navbar-expand-lg navbar-dark bg-dark">
            <h1 className=' m-5 navbar-brand'>Pigeon</h1>
          <ul className="navbar-nav mr-auto">
          {user && !signin?<> <li><Link to='/feed' className="nav-link m-2"> Feed </Link></li>
            <li><Link to='/about' className="nav-link m-2">About </Link></li>
            <li><Link to='/settings' className='nav-link m-2'>Edit <FontAwesomeIcon icon={faUserEdit} /></Link></li></>:<></>}
           {signin?<li><Link to='/signup' className='nav-link m-2'>Signup</Link></li>:<></>}
          </ul>
          
          {details && !signin?<Link to={`/users/${user.googleId}`}className='btn btn-secondary ms-auto'><h4>{details.username}</h4></Link>:<></>}
          
            <div className='row align-items-center mr-5 ms-auto'> 

      <div className='col-4'><input className="form-control mr-sm-2 " type="search" placeholder="Search" aria-label="Search"/></div>
      <div className='col-2'><button className="btn btn-outline-success " type="submit">Search</button></div>
             
      {/* {user?<div className='col-6'><div className='row'><div className='col-6 m-3'><Link className='btn btn-secondary' to='/user'><h4 className = 'col-6'style={{color:'floralwhite'}}>{user.username}</h4></Link></div><div className ='col-5 m-3'><Link to = '/login'className="btn btn-danger" onClick={logout}>logout</Link></div></div></div>
          : <div className='col-6'><Link to='/login' className="btn btn-success m-4">login</Link></div>}
        //  </div> */}   
          {/* {user?<div className='col-6'><div className='row'><div className='col-6 m-3'><Link className='btn btn-secondary' to='/user'><h4 className = 'col-6'style={{color:'floralwhite'}}>{user.username}</h4></Link></div><div className ='col-5 m-3'><Link to = '/login'className="btn btn-danger" onClick={logout}>logout</Link></div></div></div>
          : <div className='col-6'><Link to='/login' className="btn btn-success m-4">login</Link></div>}
         </div> */}
         
         {/* {signin?<Redirect to='/signup'/>:<></>} */}
         {user?
         <div className='col-6'>
          <GoogleLogout
          clientId="504774353232-i4ctofb91259kii33088t50e8cl2c2si.apps.googleusercontent.com"
          buttonText="Logout"
          onLogoutSuccess={logout}>
          </GoogleLogout>
          </div>
         :<div className='col-6'>
         <GoogleLogin
        clientId={clientId}
        redirectUri={'/'}
        buttonText="Login"
        onSuccess={onSuccess}
        // onFailure={onFailure}
        cookiePolicy={'single_host_origin'}
        isSignedIn={true}></GoogleLogin></div>
        }
                  {/* <GoogleLogout
          clientId="504774353232-i4ctofb91259kii33088t50e8cl2c2si.apps.googleusercontent.com"
          buttonText="Logout"
          onLogoutSuccess={logout}>
          </GoogleLogout> */}
        </div>
          </nav>
        <Route exact path="/">

         {/* <Body /> */}
        </Route>
        <Route path="/signup">
          <GLogin/>
        </Route>
        <Route path="/register">
          <Register /></Route>
          <Route path='/user'>{!details?<></>:<div><User/><Feed /></div>}</Route>
          <Route path='/feed'>{!details?<></>:<Feed />}</Route>
          <Route path='/settings'>{!details?<></>:<UserSettings/>}</Route>
          <Route path='/users/:id' >{!details?<></>:<><User/><Feed/></>}</Route>
          </div>
      </Switch>
    </Router>
    </AuthContext.Provider>
  );
}



export default App;
 

