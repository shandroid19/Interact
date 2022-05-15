
import React from 'react';
import SearchComponent from './components/Search'
import Notifications from './components/Notifications'
import SinglePost from './components/SinglePost';
import './App.css'

import {Badge,Grid,CssBaseline,AppBar,Avatar,Toolbar,IconButton,Typography,Container,Button} from '@material-ui/core'
import Feed from './components/Feed'
import User from './components/User'
import GLogin from "./components/GLogin"
import Chat from './components/Chat' 
import ChatIcon from '@material-ui/icons/Chat'
import NotificationsIcon from '@material-ui/icons/Notifications';
import { GoogleLogout,useGoogleLogin} from 'react-google-login';
import {
  useHistory,
  BrowserRouter as Router,
  Switch,
  Route,
  Link,
  Redirect
} from "react-router-dom";
import { useState,createContext,useEffect } from "react";
import { ThemeProvider, createMuiTheme} from "@material-ui/core/styles";




export const AuthContext = createContext()


const clientId ='504774353232-i4ctofb91259kii33088t50e8cl2c2si.apps.googleusercontent.com'
function App() {



  const [tok,setok] = useState(null)
  const [signin,setsignin] = useState(false);
  const [details,setdetails] = useState(null);
  const [update,setupdate] = useState(false);
  const [user,setuser] = useState(null)
  // const [anchorEl, setAnchorEl] =useState(null);
  const notopen = Boolean(null);
  const [unread,setunread] = useState(0)
  // const notid = notopen ? 'not-popper' : undefined;
  const {signIn} = useGoogleLogin({clientId:clientId,onSuccess:onSuccess,isSignedIn:true})
  function onSuccess(ob){
  fetch('https://interact-9535.herokuapp.com/auth/login',{
    method:'POST',
    body: JSON.stringify({userId:ob.profileObj.googleId}),
    headers:{'Content-Type':'application/json','Authorization':ob.tokenObj.id_token}
 }
 )

  }

  useEffect(()=>{
    if(window.gapi)
       signIn()
 },[window.gapi])

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
  },[tok,details,update])



  const logout = ()=>{console.log('logged out');window.location.reload();}
  async function getresp(){
        const resp = await fetch('https://interact-9535.herokuapp.com/auth/login',{
        method:'POST',
        body: JSON.stringify({userId:user.googleId}),
        headers:{'Content-Type':'application/json','Authorization':tok}
    })
       const out =await resp.json()

    if(resp.status===200 || resp.status===204){
        if(!details)
        setdetails(out.user)
        setsignin(false)
        setunread(out.user.unreadchats)
    }
    else{
        setsignin(true)
        console.log('user not found')
      }
  }
  const history = useHistory();

  // const onSuccess = res=>{
  // window.gapi?.load('auth2',()=>{
  //       window.gapi.auth2.init({
  //         client_id:clientId
  //       }).then(()=>{
  //         const obj = window.gapi.auth2.getAuthInstance()
  //         if(obj.isSignedIn.get()){
  //           let profile = obj.currentUser.get().getBasicProfile()
  //           setuser({googleId:profile.getId(),
  //             imageUrl:profile.getImageUrl(),
  //             email:profile.getEmail(),
  //             givenName:profile.getGivenName(),
  //             name:profile.getName()
  //           })
  //          const tokk = obj.currentUser.get().getAuthResponse().id_token
  //           setok(tokk)
  //         }
  //       }).then(()=>history.push('/'))
  //     })
    // setTimeout(()=>{if(user===null) window.location.reload()},3000)
// }

  // !user && onSuccess()

  const lightheme = createMuiTheme({
    overrides: {
      MuiCssBaseline: {
  '@global': {
    '*::-webkit-scrollbar':{
      width: '10px'
    },
    
    /* Track */
    '*::-webkit-scrollbar-track':{
      background: '#f1f1f1'
    },
     
    /* Handle */
    '*::-webkit-scrollbar-thumb':{
      background: '#888'
    },
    
    /* Handle on hover */
    '*::-webkit-scrollbar-thumb:hover':{
      background: '#555'
    },
  },
      }
    },

    typography:{
      fontFamily:["Armata",'sans-serif',"Encode Sans","sans-serif","Questrial",'sans-serif'],
      h5:{
      fontFamily: ["Audiowide", 'sans-serif'].join(',')
      },
      h6:{
        fontFamily: ["Encode Sans","sans-serif","Questrial",'sans-serif'].join(',')
         
      },
    },
    palette: {
      type:'dark',
      primary: 
      {
        // main:'#8f00ff', //violet
        // main:'#05Ce91', //green 
        // main:'#1EA5Fc', //blue
        main:"#ff385d",
        mainGradient: "linear-gradient(to right,#ff385d, #3541b5)",
        ultamainGradient: "linear-gradient(to left,#ff385d, #3541b5)",
        contrastText: '#fff',
        text: 'white'
      },
      secondary: {
        light: '#0066ff',
        main: '#3541b5',
        contrastText: '#ffff',
      },
      info:{
        main:'#4103fc',
        light: '#0066ff',
        contrastText: '#ffff',
      },
      background:{
        default:'#142057',
        // default:'#d6e9ff', //blue
        // default:'#d4bdff', //violet
        // default:'#f7f0c8', //green
        // paper:'#d4ffdc',
        // paper:'#70cefa'//prev
        paper:'#ff385d',
        contrastText: '#ffff',
        

      },
      contrastThreshold: 4,
      

      tonalOffset: 0.2,
    },
  });

  const darktheme = createMuiTheme({
    overrides: {
      MuiCssBaseline: {
  '@global': {
    '*::-webkit-scrollbar':{
      width: '0.6rem',
    },
    
    /* Track */
    '*::-webkit-scrollbar-track':{
      background: '#f1f1f1'
    },
     
    /* Handle */
    '*::-webkit-scrollbar-thumb':{
      background: '#888'
    },
    
    /* Handle on hover */
    '*::-webkit-scrollbar-thumb:hover':{
      background: '#555'
    },
  },
      }
    },
    typography:{
      fontFamily:["Armata",'sans-serif',"Encode Sans","sans-serif","Questrial",'sans-serif'],
      h5:{
      fontFamily: ["Audiowide", 'sans-serif'].join(',')
      },
      h6:{
        fontFamily: ["Encode Sans","sans-serif","Questrial",'sans-serif'].join(',')
         
      },
    },
    palette: {
      type:'dark'
      ,
      primary: 
      {
        // main:'#8f00ff', //violet
        main:'#383838', //green
        // main:'#1EA5Fc', //blue
        text: 'white',
        contrastText: '#fff',
      },
      secondary: {
        main: '#8a8a8a',
        contrastText: '#ffffff',
      },
      info:{
        main:'#4103fc',
        light: '#0066ff',
        contrastText: '#ffff',
      },
      background:{
        // default:'#d6e9ff', //blue
        // default:'#d4bdff', //violet
        default:'black', //green
        paper:'#474747',
        contrastText: '#ffff',
      },
      contrastThreshold: 4,

      tonalOffset: 0.2,
    },
  });

  return (
    < ThemeProvider theme={details?.darkmode?darktheme:lightheme}>
    <AuthContext.Provider value={{user,setuser,setok,setdetails,tok,details}}>
    <CssBaseline/>
    <Router >
    <Switch> 
      <>
          {!details?<></>:<AppBar position='static'>
        <Toolbar>
            <Container>
          <Grid container justify='flex-end' alignItems='center'>
            <Grid item lg={8} md={7} xs={12}>
              <Grid container justify='center'>
                <Grid item xs={5}>
                  <Grid container>
                    <Grid item>
          <Link style={{textDecoration:'none'}} to='/'>
          <Typography color='textPrimary' variant="h5">
          Interact
          </Typography>
          </Link>
          </Grid>
          </Grid>
          </Grid>
          <Grid item xs={7}>
            <Grid container justify='flex-start'>
              <Grid id='grr' item xs={12}>
            <div><SearchComponent/></div>
            </Grid>
            </Grid>
            </Grid>

          </Grid>
            </Grid>


          
         <Grid item lg={4} md={5} xs={12} >
           <Grid container justify='center' alignItems='center' >

          <Grid item xs={2}>  
          {details && !signin?<Link style={{textDecoration:'None'}} to='/'><Typography color='textPrimary'> Feed </Typography></Link>:<></>}
          </Grid>   
          <Grid item xs={2}>   
        <Link style={{textDecoration:'None'}} to='/chat'  >
          <IconButton>
          {!details?.unreadchats?
          <ChatIcon/>:
          <Badge color='secondary' badgeContent={unread}>
          <ChatIcon />
          </Badge>}
          </IconButton>
          </Link>
          </Grid>
          <Grid item xs={2}>    
          <Link  style={{textDecoration:'None'}} to='/notification'>
            <IconButton>
          {!details?.notifications?
          <NotificationsIcon/>:
          <Badge color='secondary' badgeContent={details.notifications}>
          <NotificationsIcon />
          </Badge>}
          </IconButton>
          </Link>
          </Grid>
          <Grid item xs={2} >    
          {details?<IconButton ><div><Link to={`/users/${details.userId}`} style={{textDecoration:'None',textAlign:'center'}} color='textPrimary'>
          {/* to={`/users/${details.userId}`} */}
            {/* <img width='30rem' height='30rem' style={{borderRadius:'50%',marginRight:'0.5rem'}} src={details.profilePicture}></img> */}
            <Avatar src={details.profilePicture}></Avatar>
            </Link></div></IconButton>:<Link style={{textDecoration:'None',color:'white',textAlign:'center'}} to='/signup'>SignUp</Link>}
          
          </Grid>
          <Grid item > 
          <IconButton>
        {user?
         <div>
          <GoogleLogout
          clientId="504774353232-i4ctofb91259kii33088t50e8cl2c2si.apps.googleusercontent.com"
          buttonText="Logout"
          render={renderProps => (
            <Button  variant='contained' color='secondary' onClick={renderProps.onClick}>
             Logout
            </Button>
           )} 
          onLogoutSuccess={logout}>
          </GoogleLogout>
          </div>
         :<div>
         {/* <GoogleLogin
        clientId={clientId}
        redirectUri={'/'}
        buttonText="Login"
        onSuccess={onSuccess}
        cookiePolicy={'single_host_origin'}
        isSignedIn={true}></GoogleLogin> */}
        <></>
        </div>
        }
        </IconButton>
        {/* </MenuItem> */}
        </Grid>
        </Grid>
        </Grid> 
 
          
          </Grid>
          </Container>
          </Toolbar>
        </AppBar>
        }
        <Route path="/signup">
          <GLogin/>
        </Route>
         {/* {signin?<Redirect to='/signup'/>:<></>} */}
        {!signin? <Redirect to='/signup'/>:<></>}
        {/* <Route path="/">
          <Redirect to='/signup'/></Route> */}
          <Route path='/user'>{!details?<></>:<div><User/><Feed /></div>}</Route>
          <Route exact path='/'>{!details?<></>:<Feed />}</Route>
          {/* <Route path='/chat'>{!details?<></>:<Chat/>}</Route> */}
          <Route path='/chat'>{!details?<></>:<Chat setupdate={setupdate}update={update}/>}</Route>
          <Route path='/users/:id' >{!details?<></>:<><User/><Feed/></>}</Route>
          <Route path='/notification' >{!details?<></>:<Notifications/>}</Route>
          <Route path='/search'><SearchComponent/></Route>
          <Route path='/post/:postid'><SinglePost/></Route>
          </>
      </Switch>
      
    </Router>
    </AuthContext.Provider>
    </ ThemeProvider>
  );
}



export default App;
 

